const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors")

// Database
const DynamoDb = require('./src/database/DynamoDb')
DynamoDb.getInstance() // Init database

// Routes
const calulatorRouter = require('./src/routes/calculator.route')
const randomStringRouter = require('./src/routes/randomString.route')
const usersRouter = require('./src/routes/users.route')
const recordsRouter = require('./src/routes/records.route');
const operationsRouter = require('./src/routes/operations.route');
const { verifyAccessToken } = require("./src/utils/auth");

const app = express();
app.use(cors())
app.use(express.json());
app.options('*', cors());

app.use("/users", usersRouter)
app.use("/calculator", verifyAccessToken, calulatorRouter)
app.use("/randomString", verifyAccessToken, randomStringRouter)
app.use("/records", verifyAccessToken, recordsRouter)
app.use("/operations", verifyAccessToken, operationsRouter)


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
