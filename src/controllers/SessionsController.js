const AppError = require("../utils/AppError");
const { knex } = require("../database/knex");
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

    const {secret, expireIn} = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expireIn
    })

    return response.json({user, token})
  }

}

module.exports = SessionsController;