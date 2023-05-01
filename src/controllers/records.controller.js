const crypto = require('crypto');
const { newRecord, getRecords, deleteRecord } = require("../database/records.database");

const setRecord = async (req, { operationResult, balance, cost, operationId }) => {
    try {
        const record = {
            id: crypto.randomUUID(),
            operation_id: operationId,
            user_id: req.user.id,
            amount: cost,
            user_balance: balance,
            operation_response: operationResult,
            date: new Date().getTime(),
            isDeleted: false
        }

        await newRecord(record)
        return { id: record.id, date: record.date };
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getUserRecords = async (req, res) => {
    try {
        const records = await getRecords(req.user.id, req.query);

        res.status(200).json({ Items: records.Items, LastEvaluatedKey: records.LastEvaluatedKey })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const deleteUserRecord = async (req, res) => {
    try {
        await deleteRecord({ ...req.body, user_id: req.user.id })

        res.status(204).send('Record Deleted')
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

module.exports = { setRecord, deleteUserRecord, getUserRecords }