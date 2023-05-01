const axios = require('axios')
const {
    getOperation
} = require('../utils/helpers');
const { setRecord } = require('./records.controller');
const { getCurrentBalance } = require('../database/records.database');

const getRandomString = async (req, res, next) => {

    try {
        const currentBalance = await getCurrentBalance(req.user.id)
        const operation = await getOperation(6)
        const cost = operation.cost * req.body.quantity
        const newBalance = currentBalance - cost

        if (newBalance < 0) {
            return res.status(400).json({ error: "User credit isn't enough to cover the request cost" })
        }

        const body = {
            num: req.body.quantity,
            len: req.body.length,
            digits: req.body.allowDigits,
            upperalpha: req.body.allowUpperalpha,
            loweralpha: req.body.allowLoweralpha,
            unique: req.body.uniqueStrings,
            format: "plain",
            rnd: "new",
        };

        const result = (await axios.get("https://www.random.org/strings/", { params: body })).data.split("\n").filter((item) => item)
        await setRecord(req, {
            operationResult: result.join(', '),
            balance: newBalance,
            cost,
            operationId: 6
        })

        res.status(200).json({ result, balance: newBalance });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getRandomString
}
