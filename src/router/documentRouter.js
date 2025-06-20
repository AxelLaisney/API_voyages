const Router = require("express").Router()
const { auth, isAdmin } = require("../middleware/auth")
const validate = require('../middleware/validate');
const { validateId, validateRegId } = require("../validators/documentValidator")

const { addDocumentsReg, customerAddDocuments, requireCustomer, getDocuments, getDocumentsTrip } = require("../controllers/documentController");

Router.post("/api/documents/trip/:regId", auth, isAdmin, validateRegId, validate, addDocumentsReg);
Router.post("/api/documents/:regId", auth, validateRegId, validate, customerAddDocuments);

Router.get("/api/documents/me", auth, requireCustomer);
Router.get("/api/documents/:regId", validateRegId, validate, getDocuments);
Router.get("/api/documents/trip/:id", auth, isAdmin, validateId, getDocumentsTrip);


module.exports = Router;