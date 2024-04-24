const { Router } = require("express");

const routes = Router();

const usersRouter = require("./users.routes.js");
const dishesRoutes = require("./dishes.routes.js");

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRoutes);

module.exports = routes;
