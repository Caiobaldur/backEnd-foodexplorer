const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const sqliteConnection = require("../database/sqlite");

async function verifyAdminAuth(req, res, next) {
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

    if (!user.isAdmin) {
      throw new AppError("Apenas administradores têm permissão para esta operação", 403);
    }

    return next();
  } catch (error) {
    throw new AppError("Token inválido para essa operação!", 401);
  }
}

module.exports = verifyAdminAuth;
