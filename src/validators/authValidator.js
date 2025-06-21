const { body } = require("express-validator");

const validateLogin = [
    body('email')
    .isString()
    .notEmpty()
    .withMessage('Email must be submitted'),
    body('password')
    .isString()
    .notEmpty()
    .withMessage('Password must submitted'),
];

const validateSignUp = [
    body('customer.lName')
    .isString()
    .notEmpty()
    .withMessage('last name must be submitted'),
    body('customer.fName')
    .isString()
    .notEmpty()
    .withMessage('first name must be submitted'),
    body('customer.email')
    .isString()
    .notEmpty()
    .withMessage('email must be submitted'),
    body('customer.password')
    .isString()
    .notEmpty()
    .withMessage('password must be submitted'),
    body('customer.role')
    .isString()
    .notEmpty()
    .withMessage('role must be submitted'),
];

module.exports = { validateLogin, validateSignUp };