const { getCurrentBalance } = require("../database/records.database")
const { getUserByUsername } = require("../database/users.database")
const { generateAccessToken } = require("../utils/auth")

const bcrypt = require("bcrypt")

const login = async (req, res) => {

    try {
        const data = await getUserByUsername(req.body.email)
        if (!data.Items.length) {
            return res.status(403).send('Invalid User Credentials')
        }

        if (!await bcrypt.compare(req.body.password, data.Items[0].password)) {
            return res.status(403).send('Invalid User Credentials')
        }

        const token = generateAccessToken(data.Items[0])

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

const getUserBalance = async (req, res) => {
    try {
        const currentBalance = await getCurrentBalance(req.user.id)
        res.status(200).json({ currentBalance })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

module.exports = { login, getUserBalance }