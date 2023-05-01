module.exports = {
    quantity: {
        isInt: {
            options: {
                min: 1,
                max: 10,
            },
            errorMessage: "Min: 1 - Max: 10"
        },
        notEmpty: true,
    },
    length: {
        isInt: {
            options: {
                min: 1,
                max: 20
            },
            errorMessage: "Min: 1 - Max: 20"
        },
        notEmpty: true,
    },
    allowDigits: {
        isString: true,
        notEmpty: true,
        isIn: {
            options: [['on', 'off']]
        },
        errorMessage: "Invalid value, must be in [on, off]"
    },
    allowUpperalpha: {
        isString: true,
        notEmpty: true,
        isIn: {
            options: [['on', 'off']]
        },
        errorMessage: "Invalid value, must be in [on, off]"
    },
    allowLoweralpha: {
        isString: true,
        notEmpty: true,
        isIn: {
            options: [['on', 'off']]
        },
        errorMessage: "Invalid value, must be in [on, off]"
    },
    uniqueStrings: {
        isString: true,
        notEmpty: true,
        isIn: {
            options: [['on', 'off']]
        },
        errorMessage: "Invalid value, must be in [on, off]"
    },
}