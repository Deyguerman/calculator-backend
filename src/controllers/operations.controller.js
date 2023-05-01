const { getOperations } = require('../database/operations.database');


const getOperationsList = async (req, res) => {
    try {
        const operations = await getOperations();

        res.status(200).json(operations)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { getOperationsList }