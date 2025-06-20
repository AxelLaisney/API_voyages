const Router = require("express").Router()
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const validateBody = require('../validators/customerValidator')

const { getProfile, updateProfile } = require("../controllers/customerController");

Router.get("api/user/profile", auth, getProfile);

Router.put("api/user/profile", auth, validateBody, validate, updateProfile);


module.exports = Router;