const { Router } = require("express");
const multer = require("multer");

const DishesController = require("../controllers/DishesController")
const DishImageController = require("../controllers/DishImageController");
const  verifyAdminAuth  = require("../middlewares/adminAutentication")
const  verifyUserAuth  = require("../middlewares/authAutentication");
const uploadConfig = require("../configs/upload");
const dishesRoutes = Router();

dishesRoutes.use(verifyAdminAuth)
const upload = multer(uploadConfig.MULTER);
const dishesController = new DishesController();
const dishImageController = new DishImageController()

dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", verifyUserAuth, verifyAdminAuth, dishesController.show);
dishesRoutes.post("/", verifyAdminAuth, dishesController.create);
dishesRoutes.put("/:id", verifyAdminAuth, dishesController.update); 
dishesRoutes.delete("/:id", verifyAdminAuth, dishesController.delete);
dishesRoutes.patch("/:id/image", verifyAdminAuth, upload.single("image"),dishImageController.update)

module.exports = dishesRoutes;