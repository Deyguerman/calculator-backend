const express = require("express")
const { checkSchema } = require('express-validator');
const { getRandomString } = require('../controllers/randomString.controllers')

// Validators
const randomStringValidator = require('../validators/randomString.validator');
const { validateResult } = require("../utils/helpers");

const router = express.Router({
    mergeParams: true
})

router.post("/", checkSchema(randomStringValidator), validateResult, getRandomString)

module.exports = router 