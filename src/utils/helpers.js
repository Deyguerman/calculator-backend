const { validationResult } = require("express-validator");
const { getOperationsCost } = require("../database/operations.database");

const getOperation = async (operation) => {
    return (await getOperationsCost(operation))?.Item ?? undefined
}

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(400).json({
            errors: error.array(),
        });
    }
}

module.exports = {
    getOperation,
    validateResult
}