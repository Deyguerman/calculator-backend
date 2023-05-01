const DynamoDb = require("./DynamoDb")
const dynamoDb = DynamoDb.getInstance()
const RECORDS_TABLE = process.env.RECORDS_TABLE

const newRecord = async (body) => {
    const params = {
        TableName: RECORDS_TABLE,
        Item: body,
    };

    return await dynamoDb.put(params).promise();
}

const getRecords = async (userId, { pageSize, orderBy, sortBy, lastItem, operation_id }) => {
    const params = {
        TableName: RECORDS_TABLE,
        KeyConditionExpression: 'user_id = :user_id',
        FilterExpression: 'isDeleted = :isDeleted',
        ExpressionAttributeValues: {
            ':user_id': userId,
            ':isDeleted': false,
        },
        ScanIndexForward: orderBy === 'true' ? true : false,
        PageSize: pageSize ? Number(pageSize) : 5
    };

    if (!!sortBy && sortBy !== 'date') {
        switch (sortBy) {
            case 'amount':
                params.IndexName = 'UserIdCostIndex'
                break;
            case 'operation_id':
                params.IndexName = 'UserIdOperationIndex'
                break;

            default:
                break;
        }
    }

    if (operation_id) {
        if(sortBy === 'operation_id') {
            params.KeyConditionExpression += ' AND operation_id = :operation_id'
        } else {
            params.FilterExpression += ' AND operation_id = :operation_id'
        }
        params.ExpressionAttributeValues = {
            ...params.ExpressionAttributeValues,
            ':operation_id': Number(operation_id)
        }
    }

    if (lastItem) {
        params.ExclusiveStartKey = JSON.parse(lastItem)
    }

    return await dynamoDb.query(params).promise();
}

const deleteRecord = async ({ user_id, date, id }) => {
    const params = {
        TableName: RECORDS_TABLE,
        Key: {
            user_id,
            date,
        },
        UpdateExpression: "set isDeleted = :isDeleted",
        ConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":isDeleted": true,
            ":id": id,
        }
    };

    return await dynamoDb.update(params).promise();
}

const getCurrentBalance = async (userId) => {
    const params = {
        TableName: RECORDS_TABLE,
        KeyConditionExpression: 'user_id = :user_id',
        ExpressionAttributeValues: {
            ':user_id': userId
        },
        ScanIndexForward: false,
        Limit: 1
    };

    const balance = await dynamoDb.query(params).promise()
    return balance?.Items[0]?.user_balance ?? 200;
}


module.exports = { newRecord, getRecords, deleteRecord, getCurrentBalance }