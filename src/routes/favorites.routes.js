const { Router } = require("express");
const FavoriteController = require("../controllers/FavoriteController")
const  verifyUserAuth  = require("../middlewares/authAutentication")

const favoritesRoutes = Router();
const favoritesController = new FavoriteController();

favoritesRoutes.use(verifyUserAuth)

favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.post("/:dish_id", favoritesController.create);
favoritesRoutes.delete("/:dish_id", favoritesController.delete);



module.exports = favoritesRoutes;