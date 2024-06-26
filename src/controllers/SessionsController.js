const AppError = require("../utils/AppError");
const  knex  = require("../database/knex");
const { compare } = require("bcrypt");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");



class SessionsController {
  async create(req, res){
    const { email, password } = req.body

    const user = await knex("users").where({email}).first()

    if(!user) {
      throw new AppError("E-mail e/ou senha incorreto!", 401)
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError("Email e/ou senha incorreta!", 401);
    }

    const {secret, expiresIn} = authConfig.jwt;
    const token = sign({isAdmin: String(user.isAdmin)}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return res.json({user, token})
  }

}

module.exports = SessionsController;