const { hash } = require("bcrypt");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");


class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

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
  
}

module.exports = UsersController;