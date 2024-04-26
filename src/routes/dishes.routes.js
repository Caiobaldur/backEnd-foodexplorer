const { Router } = require("express");
const DishesController = require("../controllers/DishesController")
const  verifyAdminAuth  = require("../middlewares/adminAutentication")
const  verifyUserAuth  = require("../middlewares/authAutentication")

const dishesRoutes = Router();
const dishesController = new DishesController();

dishesRoutes.use(verifyAdminAuth)

dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", verifyUserAuth, verifyAdminAuth, dishesController.show);
dishesRoutes.post("/", verifyAdminAuth, dishesController.create);
dishesRoutes.put("/:id", verifyAdminAuth, dishesController.update); 
dishesRoutes.delete("/:id", verifyAdminAuth, dishesController.delete);


module.exports = dishesRoutes;