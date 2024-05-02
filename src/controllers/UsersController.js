const { hash, compare } = require("bcrypt");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      throw new AppError("Nome, email e senha são obrigatórios!");
    }
  
    const database = await sqliteConnection();
  
  const existingUserByName = await database.get("SELECT * FROM users WHERE name = ?", [name]);
  if (existingUserByName) {
    throw new AppError("Nome de usuário já está em uso!");
  }

  const existingUserByEmail = await database.get("SELECT * FROM users WHERE email = ?", [email]);
  if (existingUserByEmail) {
    throw new AppError("Email já está em uso!");
  }

  const [existingUserCount] = await database.all("SELECT COUNT(*) AS count FROM users");
  
    let isAdmin = false;
  
    if (existingUserCount.count === 0) {
      isAdmin = true;
    }
  
    const hashedPassword = await hash(password, 8);
  
    await database.run("INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)", [
      name,
      email,
      hashedPassword,
      isAdmin ? 1 : 0,
    ]);
  
    // Verifica se o usuário recém-criado é administrador
    const user = await database.get("SELECT * FROM users WHERE email = ?", [email]);
    const roleId = isAdmin ? 1 : 2; // 1 para admin, 2 para customer
  
    // Associa o usuário à role correspondente na tabela 'roles'
    await database.run("INSERT INTO roles (user_id, role) VALUES (?, ?)", [user.id, roleId]);
  
    return res.status(201).json({ name, email, isAdmin });
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?) AND id != ?", [email, user_id]);

    if (userWithUpdatedEmail) {
      throw new AppError("E-mail já cadastrado!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Informe a senha antiga!");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return res.status(200).json();
  }
  
  async delete(req, res) {
    const { id } = req.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    await database.run("DELETE FROM users WHERE id = (?)", [id]);

    return res.status(204).json();
  }
}

module.exports = UsersController;
