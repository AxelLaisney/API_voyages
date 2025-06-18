const Router = require("express").Router()

const { getProfile, updateProfile } = require("../controllers/customerController");

Router.get(["api/user/profile"], getProfile);

Router.put(["api/user/profile"], updateProfile);


module.exports = Router;