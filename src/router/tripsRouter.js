const Router = require("express").Router()

const { getAll, getOne, update, destroy, create} = require("../controllers/tripsController");

Router.get(["api/trips"], getAll);
Router.get(["api/trips/:id"], getOne);

Router.post(["api/trips"], create);

Router.put(["api/trips/:id"], update)

Router.delete(["api/trips/:id"], destroy)

module.exports = Router;