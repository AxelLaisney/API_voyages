const Router = require("express").Router()
const { auth } = require('../middleware/auth');

const { getProfile, updateProfile } = require("../controllers/customerController");

Router.get("api/user/profile", auth, getProfile);

Router.put("api/user/profile", auth, updateProfile);


module.exports = Router;