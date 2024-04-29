const { Router } = require("express");
const routes = Router();

const usersRouter = require("./users.routes.js");
const dishesRouter = require("./dishes.routes.js");
const favoritesRouter = require("./favorites.routes.js");
const sessionsRouter = require("./sessions.routes.js");
const verifyUserAuth = require("../middlewares/authAutentication.js");

routes.use("/users", usersRouter);
routes.use("/dishes", verifyUserAuth, dishesRouter);
routes.use("/favorites", verifyUserAuth, favoritesRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;
