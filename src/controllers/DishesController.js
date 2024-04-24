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

  async show(req, res) {
    const {id} = req.params
    try {
      const dish = await knex.select('*').from('dishes').where('id', id).first()
      const ingredients = await knex('ingredients').where('dish_id', id)
      const dishesWithIngredients = {dish, ingredients}
      return res.status(200).json(dishesWithIngredients)
    } catch(error) {
      AppError("Não foi possível buscar prato", error)
      return res.status(500).json({message:"Não foi possível buscar prato"})
    }
  }

  async index(req, res) {
    const { search } = req.query

    try {
      let dishesQuery = knex('dishes')
      .select([
        'dishes.id',
        'dishes.name',
        'dishes.price',
        'dishes.description',
        'dishes.image',
        'dishes.category',
        'dishes.created_at',
      ])
      .distinct()
      .orderBy('dishes.name')

      if(search) {
        dishesQuery = dishesQuery
        .where('dishes.name', 'like', `%${search}%`)
        .orWhere('ingredients.name', 'like', `%${search}%`)
        .join('ingredients', 'dishes.id', '=', 'ingredients.dish_id')
      }

      const dishes = await dishesQuery
      return res.status(200).json(dishes)
    } catch(error){
      AppError("Não foi possível buscar pratos", error)
      return res.status(500).json({message: "Não foi possível buscar pratos"})
    }
  }

  async delete(req,res) {
    try {
      const {id} = req.params
      await knex('dishes').where({id}).delete()
      return res.status(202).json({message: "O prato foi excluído!"})
    }catch(error) {
      AppError("Não foi possível excluir prato:", error)
      return res.status(500).json({message: "Não foi possível excluir prato"})
    }
  }
}

module.exports = DishesController;