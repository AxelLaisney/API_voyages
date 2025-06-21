const Router = require("express").Router()
const { auth, isAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { validateId, validateTripId } = require("../validators/registrationValidator");

const { getAll, getRegTrip, create, destroy } = require("../controllers/registrationController");

Router.get("/api/registrations/me", auth, getAll);
Router.get("/api/registrations/trip/:id", auth, isAdmin, validateId, validate, getRegTrip);

Router.post("/api/registrations/:tripId", auth, validateTripId, validate, create);

Router.delete("/api/registrations/:id", auth, validateId, validate, destroy);

module.exports = Router;