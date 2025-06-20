const { param } = require("express-validator");

const validateId = [
    param('id').isInt().notEmpty().withMessage("Id must be a int and not null"),
];

const validateTripId = [
    param('tripId').isInt().notEmpty().withMessage("Id must be a int and not null"),
];

module.exports = { validateId, validateTripId };