const { body, param } = require("express-validator");

const validateBody = [
    body('destination')
    .isString()
    .notEmpty()
    .withMessage('Destination must be submitted'),
    body('places')
    .isInt()
    .notEmpty()
    .withMessage('Places must be submitted and be an int'),
    body('price')
    .isFloat()
    .notEmpty()
    .withMessage("Price must be submitted and be a float"),
]

const validateId = [
        param('id').isInt().notEmpty().withMessage("Id must be a int and not null"),
]

module.exports = { validateBody, validateId };