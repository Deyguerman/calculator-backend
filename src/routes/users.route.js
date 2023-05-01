const express = require("express")
const { checkSchema } = require('express-validator');

const { login, getUserBalance } = require("../controllers/users.controller");

// Validators
const userValidator = require('../validators/user.validator');
const { validateResult } = require("../utils/helpers");
const { verifyAccessToken } = require("../utils/auth");

const router = express.Router({
    mergeParams: true
})

router.post("/login", checkSchema(userValidator), validateResult, login);
router.get("/balance", verifyAccessToken, getUserBalance);

module.exports = router 
