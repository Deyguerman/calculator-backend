const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET

const generateAccessToken = (user) => {
    return jwt.sign(user, tokenSecret, { expiresIn: '12h' });
}

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1].trim()

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, tokenSecret, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
}