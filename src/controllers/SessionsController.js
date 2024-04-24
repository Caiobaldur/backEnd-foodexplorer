const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const { knex } = require("../database/knex");


class SessionsController {
  async create(req, res){
    const { email, password } = req.body

    const user = await knex("users").where({email}).first()

    if(!user) {
      throw new AppError("E-mail e/ou senha incorreto!", 401)
    }

    return response.json({email, password})
  }

}

module.exports = SessionsController;