const operationList = require("../../assets/operations.json");

module.exports = {
    getOperation: (id) => operationList.find((item) => item.id === id),
}