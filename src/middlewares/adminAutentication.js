const AppError = require("../utils/AppError");

async function verifyAdminAuth(roleToVerify) {
  return (req,res,next) => {
    const {role} = req.body
    
    if (!req.user) {
      throw new AppError("Usuário não autenticado", 401);
    }
    
    if (req.user.role !== "admin") {
      throw new AppError("Acesso negado. Apenas administradores têm permissão para esta operação", 403);
    }
    
    return next();
  }
}

module.exports = verifyAdminAuth;
