const {
    getOperation,
} = require('../utils/helpers')

const { getCurrentBalance } = require('../database/records.database');
const { setRecord } = require('./records.controller');


const calculateOperation = async (req, res) => {
    try {
        const { operationId, number1, number2 } = req.body;
        const currentBalance = await getCurrentBalance(req.user.id)
        const operation = await getOperation(operationId)
        const cost = operation.cost
        const newBalance = currentBalance - cost

        if (newBalance < 0) {
            return res.status(400).json({ error: "User credit isn't enough to cover the request cost" })
        }

        let result

        if (operation.sign === '^') {
            result = Math.sqrt(number1).toFixed(2)
        } else {
            result = eval(`${number1} ${operation.sign} ${number2}`).toFixed(2)
        }

        await setRecord(req, {
            operationResult: result,
            balance: newBalance,
            cost,
            operationId
        })

        res.status(200).json({ result, balance: newBalance });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    calculateOperation
}
