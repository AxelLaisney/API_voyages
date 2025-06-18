const Router = require("express").Router()

const { getAll, getOne, create, destroy } = require("../controllers/registrationController");

Router.get(["/api/registrations/me"], getAll);
Router.get(["api/registrations/trip/:id"], getOne);

Router.post(["/api/registrations/:tripId"], create);

Router.delete(["/api/registrations/:id"], destroy);

module.exports = Router;