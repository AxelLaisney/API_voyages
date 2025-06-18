const Router = require("express").Router()

const { addPayment, customerPayments, tripPayments } = require("../controllers/paymentController");

Router.post(["/api/payments/:regId"], addPayment);

Router.get(["/api/payments/me"], customerPayments);
Router.get(["/api/payment/trip/:id"], tripPayments);


module.exports = Router;