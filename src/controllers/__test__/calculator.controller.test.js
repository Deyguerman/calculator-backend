const { calculateOperation } = require("../calculator.controller");
const operationList = require("../../assets/operations.json");

const mockRequest = {
  user: {
    id: 1,
  },
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../../database/records.database");
jest.mock("../../utils/helpers");
jest.mock("../records.controller");

describe("Calculator Controllers test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Calculate Adittion Operation ", async () => {
    const operationId = operationList.find((item) => item.sign === "+").id;

    mockRequest.body = {
      operationId,
      number1: 1,
      number2: 2,
    };

    const res = mockResponse();

    await calculateOperation(mockRequest, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      balance: 195,
      result: "3.00",
    });
  });

  test("Calculate Subtraction Operation ", async () => {
    const operationId = operationList.find((item) => item.sign === "-").id;

    mockRequest.body = {
      operationId,
      number1: 3,
      number2: 2,
    };

    const res = mockResponse();

    await calculateOperation(mockRequest, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      balance: 195,
      result: "1.00",
    });
  });

  test("Calculate Multiplication Operation ", async () => {
    const operationId = operationList.find((item) => item.sign === "*").id;

    mockRequest.body = {
      operationId,
      number1: 3,
      number2: 2,
    };

    const res = mockResponse();

    await calculateOperation(mockRequest, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      balance: 190,
      result: "6.00",
    });
  });

  test("Calculate Division Operation ", async () => {
    const operationId = operationList.find((item) => item.sign === "/").id;

    mockRequest.body = {
      operationId,
      number1: 9,
      number2: 3,
    };

    const res = mockResponse();

    await calculateOperation(mockRequest, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      balance: 190,
      result: "3.00",
    });
  });

  test("Calculate Division by zero Operation ", async () => {
    const operationId = operationList.find((item) => item.sign === "/").id;

    mockRequest.body = {
      operationId,
      number1: 9,
      number2: 0,
    };

    const res = mockResponse();

    await calculateOperation(mockRequest, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      balance: 190,
      result: "Infinity",
    });
  });
});
