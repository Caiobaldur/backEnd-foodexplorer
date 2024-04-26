const { Router } = require("express");
const OrdersController = require("../controllers/DishesController")
const  verifyAdminAuth  = require("../middlewares/adminAutentication")
const  verifyUserAuth  = require("../middlewares/authAutentication")

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.use(verifyAdminAuth)

ordersRoutes.get("/:id", ordersController.index);
ordersRoutes.get("/history", verifyUserAuth, ordersController.show);
ordersRoutes.post("/", verifyAdminAuth, ordersController.create);
ordersRoutes.put("/:id", verifyAdminAuth, ordersController.update); 
ordersRoutes.delete("/:id", verifyAdminAuth, ordersController.delete);


module.exports = ordersRoutes;