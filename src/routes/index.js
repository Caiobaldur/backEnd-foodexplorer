const { Router } = require("express");

const routes = Router();

const usersRouter = require("./users.routes.js");
const dishesRouter = require("./dishes.routes.js");
const sessionsRouter = require("./sessions.routes.js");

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;
