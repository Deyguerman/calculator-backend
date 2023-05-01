module.exports = {
    email: {
        isEmail: {
            errorMessage: 'Invalid email format',
        },
        notEmpty: {
            errorMessage: 'Email is required',
        },
    },
    password: {
        isString: true,
        notEmpty: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
    },
}