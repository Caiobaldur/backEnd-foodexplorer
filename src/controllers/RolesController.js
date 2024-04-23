const knex = require("knex");
const AppError = require("../utils/AppError");

class RolesController {
  async create(req, res) {
    try {
      const { user_id, role } = req.body;


      const existingRole = await knex('roles').where({ user_id }).first();
      if (existingRole) {
        throw new AppError('Usuário já possui uma role cadastrada', 400);
      }


      await knex('roles').insert({
        user_id,
        role
      });

      return res.status(201).json({ message: 'Role atribuída com sucesso!' });
    } catch (error) {
      AppError("Não foi possível atribuir a role:", error);
      return res.status(500).json({ message: 'Não foi possível atribuir a role' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;


      const existingRole = await knex('roles').where({ id }).first();
      if (!existingRole) {
        throw new AppError('Role não encontrada', 404);
      }

      await knex('roles').where({ id }).update({ role });

      return res.status(200).json({ message: 'Role atualizada com sucesso!' });
    } catch (error) {
      AppError("Não foi possível atualizar a role:", error);
      return res.status(500).json({ message: 'Não foi possível atualizar a role' });
    }
  }
}

module.exports = RolesController;
