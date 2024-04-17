const { hash, compare } = require("bcrypt");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");


class UsersController {
  async create(req, res) {
    const { name, email, password, isAdmin } = req.body;

    if(!name){
      throw new AppError("Nome obrigatório!")
    }

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    
    if(checkUserExists){
      throw new AppError("este e-mail já está em uso.")
    }
    
    const hashedPassword = await hash(password,8);
    
    await database.run("INSERT INTO users (name,email,password) VALUES (?,?,?)", [name,email,hashedPassword])
    
    return res.status(201).json({ name, email, password });
  }

  async update(req, res){
    const {name, email, password, old_password} = req.body
    const {id} = req.params

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    if(!user){
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Usuário já cadastrado!")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password){
      throw new AppError("Informe a senha antiga!")
    }
    
    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha não confere.");
      }

      user.password = await hash(password, 8)
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email,user.password, id]
    )

    return res.status(200).json();

    

  }
  
}

module.exports = UsersController;