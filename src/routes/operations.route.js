const express = require("express")
const { checkSchema } = require('express-validator');

// Validators
const { getOperationsList } = require("../controllers/operations.controller");

const router = express.Router({
    mergeParams: true
})

router.get("/", getOperationsList);

module.exports = router 
