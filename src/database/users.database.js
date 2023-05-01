const DynamoDb = require("./DynamoDb")
const dynamoDb = DynamoDb.getInstance()
const USERS_TABLE = process.env.USERS_TABLE

const getUserByUsername = async (email) => {
    const params = {
        TableName: USERS_TABLE,
        KeyConditionExpression: 'username = :email',
        FilterExpression: '#user_status = :user_status',
        ExpressionAttributeValues: {
            ':email': email,
            ':user_status': 'active'
        },
        ExpressionAttributeNames: {
            "#user_status": "status"
        }
    };

    return await dynamoDb.query(params).promise();
}


module.exports = { getUserByUsername }