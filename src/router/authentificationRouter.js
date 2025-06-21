const Router = require("express").Router()
const validate = require('../middleware/validate');
const { validateLogin, validateSignUp } = require('../validators/authValidator');

const { signUp, login } = require("../controllers/authentificationController");

Router.post("/api/auth/signup", validateSignUp, validate, signUp);


Router.post("/api/auth/login", validateLogin, validate, login);



module.exports = Router;