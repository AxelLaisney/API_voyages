const Router = require("express").Router()

const { signUp, login } = require("../controllers/authentificationController");

Router.post("api/auth/signup", signUp);

Router.put("api/auth/login", login);


module.exports = Router;