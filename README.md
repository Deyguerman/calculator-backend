# Calculator API
Serverless Framework Node Express API on AWS

## Usage

Install dependencies with:

```
npm install
```

### Local development

It is also possible to emulate DynamoDB, API Gateway and Lambda locally using the `serverless-dynamodb-local` and `serverless-offline` plugins. In order to do that, run:

```bash
npx serverless dynamodb install
npx serverless serverless-offline install
```

Make sure `serverless-dynamodb-local` and `serverless-offline` are listed as last plugin in `plugins` section in your `serverless.yml`

```
...
plugins:
  - serverless-dynamodb-local
  - serverless-offline
...
```

After that, running the following command with start both local API Gateway emulator as well as local instance of emulated DynamoDB:

```bash
npm run start
```

or

```bash
npx serverless offline start
```

Note: If you have issues installing Local DynamoDb, follow these steps:

```
  - Go to node_modules/dynamodb-localhost/dynamodb/config.json
  - Modify "download_url" and set "https://s3.us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz"
  - Go to node_modules/dynamodb-localhost/dynamodb/installer.js
  - Modify "http" import to "https"
  - Run "npx serverless dynamodb install" command in your terminal
```

### Testing
```bash
npm run test
```
