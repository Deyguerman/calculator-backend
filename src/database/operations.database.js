const DynamoDb = require("./DynamoDb")
const dynamoDb = DynamoDb.getInstance()
const OPERATIONS_TABLE = process.env.OPERATIONS_TABLE

const getOperations = async () => {
    const params = {
        TableName: OPERATIONS_TABLE
    };

    return await dynamoDb.scan(params).promise();
}

const getOperationsCost = async (id) => {
    const params = {
        TableName: OPERATIONS_TABLE,
        Key: {
            id: id
        }
    };

    return await dynamoDb.get(params).promise();

}


module.exports = { getOperations, getOperationsCost }