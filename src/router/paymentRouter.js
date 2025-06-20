const Router = require("express").Router()
const { auth, isAdmin } = require("../middleware/auth")
const validate = require('../middleware/validate');
const { validateId, validateRedId } = require("../validators/paymentValidator")

const { addPayment, customerPayments, tripPayments } = require("../controllers/paymentController");

Router.post("/api/payments/:regId", auth, validateRedId, validate, addPayment);

Router.get("/api/payments/me", auth, customerPayments);
Router.get("/api/payment/trip/:id", auth, isAdmin, validateId, validate, tripPayments);


module.exports = Router;