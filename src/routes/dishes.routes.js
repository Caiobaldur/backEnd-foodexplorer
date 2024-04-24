const { Router } = require("express");
const DishesController = require("../controllers/DishesController")
const  verifyAdminAuth  = require("../middlewares/adminAutentication")

const dishesRoutes = Router();
const dishesController = new DishesController();




dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.post("/", verifyAdminAuth, dishesController.create);
dishesRoutes.put("/:id", verifyAdminAuth, dishesController.update); 
dishesRoutes.delete("/:id", verifyAdminAuth, dishesController.delete);


module.exports = dishesRoutes;
