const Router = require("express").Router();
const { auth, isAdmin } = require("../middleware/auth")
const validate = require('../middleware/validate');
const { validateBody, validateId } = require("../validators/tripsValidator");

const { getAll, getOne, update, destroy, create } = require("../controllers/tripsController");

Router.get("/api/trips", getAll);
Router.get("/api/trips/:id", validateId, validate, getOne);

Router.post("/api/trips", auth, isAdmin, validateBody, validate, create);

Router.put("/api/trips/:id", auth, isAdmin, validateId, validate, update);

Router.delete("/api/trips/:id", auth, isAdmin, validateId, validate, destroy);

module.exports = Router;