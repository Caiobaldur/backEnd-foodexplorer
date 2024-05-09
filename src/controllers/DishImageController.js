const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishImageController {
  async update(req, res) {
    const { id } = req.params;
    const imageFileName = req.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id }).first();
    if (!dish) {
      throw new AppError("Prato não encontrado", 404);
    }
    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    const filename = await diskStorage.saveFile(imageFileName);
    dish.image = filename;

    await knex("dishes").where({ id }).update(dish);

    return res.json({ image: filename });
  }
}

module.exports = DishImageController;
