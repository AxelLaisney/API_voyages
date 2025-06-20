const { body } = require("express-validator");

const validateBody = [
    body(lName)
    .isString()
    .notEmpty()
    .withMessage('last name must be submitted'),
    body(fName)
    .isString()
    .notEmpty()
    .withMessage('first name must be submitted'),
    body(email)
    .isString()
    .notEmpty()
    .withMessage('email must be submitted'),
    body(customer.password)
    .isString()
    .notEmpty()
    .withMessage('password must be submitted'),
];

module.exports = { validateBody };