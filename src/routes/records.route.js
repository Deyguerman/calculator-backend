const express = require("express")
const { checkSchema } = require('express-validator');

// Validators
const { getUserRecords, deleteUserRecord } = require("../controllers/records.controller");

const router = express.Router({
    mergeParams: true
})

router.get("/", getUserRecords);
router.delete("/", deleteUserRecord);

module.exports = router 
