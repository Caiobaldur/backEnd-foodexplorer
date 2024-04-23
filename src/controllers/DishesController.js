const knex = require("knex");
const connection = require("../database/knex");
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

    return res.status(201).json({message: 'Prato cadastrado com sucesso!'})
  }
}