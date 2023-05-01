module.exports = {
    operationId: {
        isNumeric: {
            errorMessage: 'operationId must be a number'
        },
        isInt: {
            options: {
                min: 1,
                max: 5,
            }
        },
        notEmpty: true,
    },
    number1: {
        isNumeric: {
            errorMessage: 'number1 must be a number'
        },
        notEmpty: true,
    },
    number2: {
        notEmpty: {
            if: (value, { req }) => req.body.operationId !== 5,
        },
        isNumeric: {
            if: (value, { req }) => req.body.operationId !== 5,
            errorMessage: 'number2 must be a number'
        }
    },
}