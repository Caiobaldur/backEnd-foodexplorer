const { Router } = require("express");
const RolesController = require("../controllers/RolesController");

const rolesRoutes = Router();
const rolesController = new RolesController();

rolesRoutes.post("/", rolesController.create);
rolesRoutes.put("/:id", rolesController.update);

module.exports = rolesRoutes;
