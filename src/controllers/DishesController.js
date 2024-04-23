const knex = require("knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(req,res) {
    const {name, description, image, price, category, ingredients} = req.body
    const checkDish = await knex('dishes').where('name', name).select('*').first()

    if(checkDish) {
      throw new AppError('Prato já cadastrado!', 409)
    }

    const [dish_id] = await knex('dishes').insert({
      name,
      description,
      image,
      category,
    })

    const insertIngredients = ingredients.map((name) => {
      return {
        dish_id,
        name,
      }
    })
    await knex('ingredients').insert(insertIngredients)

    return res.status(201).json({message: 'O prato foi cadastrado com sucesso!'})
  }

  async update(req,res) {
    try {
      const {name, description, image, price, category, ingredients} = req.body
      const dish_id = req.params.id 

      await knex('dishes').where({id: dish_id}).update({
        name,
        description,
        image,
        price,
        category,
      }) 

      await knex('ingredients').where({dish_id}).del()

      const newIngredients = ingredients.map((ingredient) => {
        return {
          dish_id,
          name: ingredient,
        }
      })

      await knex("ingredients").insert(newIngredients)

      return res.status(201).json({message:'Prato atualizado!'})
    } catch(error) {
        AppError("Não foi possivel atualizar prato:", error)
        return res.status(500).json({message: 'Não foi possivel atualizar prato'})
    }
  }

  
}

module.exports = DishesController;