const express = require("express")
const { checkSchema } = require('express-validator');
const { calculateOperation } = require('../controllers/calculator.controller')

// Validators
const calculatorValidator = require('../validators/calculator.validator');
const { validateResult } = require("../utils/helpers");

const router = express.Router({
    mergeParams: true
})


router.post("/", checkSchema(calculatorValidator), validateResult, calculateOperation)

module.exports = router 