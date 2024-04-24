const { Router } = require("express");
const UsersController = require("../controllers/UsersController")
const  verifyUserAuth  = require("../middlewares/authAutentication")


const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", verifyUserAuth,usersController.update);
usersRoutes.delete("/:id", usersController.delete);

module.exports = usersRoutes;
