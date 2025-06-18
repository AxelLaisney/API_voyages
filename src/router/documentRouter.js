const Router = require("express").Router()

const { addDocumentsReg, customerAddDocuments, requireCustomer, getDocuments, getDocumentsTrip } = require("../controllers/documentController");

Router.post(["/api/documents/trip/:regId"], addDocumentsReg);
Router.post(["/api/documents/:regId"], customerAddDocuments);

Router.get(["/api/documents/me/:regId"], requireCustomer);
Router.get(["/api/documents/:regId"], getDocuments);
Router.get(["/api/documents/trip/:id"], getDocumentsTrip);


module.exports = Router;