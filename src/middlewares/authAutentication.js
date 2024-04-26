const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const sqliteConnection = require("../database/sqlite");

async function verifyUserAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token JWT não encontrado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = ?", [user_id]);
    
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    
    req.user = {
      id: user.id
    };

    return next();
  } catch (error) {
    throw new AppError("Token JWT inválido", 401);
  }
}

module.exports = verifyUserAuth;
