const { param } = require("express-validator");

const validateId = [
    param('id').isInt().notEmpty().withMessage("Id must be a int and not null"),
];

const validateRegId = [
    param('regId').isInt().notEmpty().withMessage("Id must be a int and not null"),
];

module.exports = { validateId, validateRegId };