const AWS = require('aws-sdk');

const DynamoDb = (() => {
    let instance

    const createInstance = () => {
        let dynamoDbParams = {}

        if (process.env.IS_OFFLINE) {
            dynamoDbParams = {
                region: 'localhost',
                endpoint: 'http://localhost:8000',
                accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
                secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
            }
        }

        instance = new AWS.DynamoDB.DocumentClient(dynamoDbParams)

        return instance
    }

    const getInstance = () => {
        if (!instance) {
            instance = createInstance()
        }

        return instance
    }

    return { getInstance }
})()

module.exports = DynamoDb
