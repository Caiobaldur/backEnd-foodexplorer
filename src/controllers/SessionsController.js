class SessionsController {
  async create(req, res){
    const { email, password } = req.body
    return response.json({email, password})
  }

}

module.exports = SessionsController;