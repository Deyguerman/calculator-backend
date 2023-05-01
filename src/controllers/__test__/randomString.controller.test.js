const axios = require('axios')
const { getRandomString } = require('../randomString.controllers');

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

jest.mock("axios");
jest.mock("../../database/records.database");
jest.mock("../../utils/helpers");
jest.mock("../records.controller");

describe("Random String Controllers Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Get Random Numbers Test ", async () => {

    mockRequest.body = {
      quantity: 1,
      length: 5,
      allowDigits: 'on',
      allowUpperalpha: 'off',
      allowLoweralpha: 'off',
      uniqueStrings: 'off',
    };

    const query = {
      "digits": "on",
      "format": "plain",
      "len": 5,
      "loweralpha": "off",
      "num": 1,
      "rnd": "new",
      "unique": "off",
      "upperalpha": "off"
    }

    const res = mockResponse();

    const mockRandomStrings = [
      "12345"
    ];

    axios.get.mockImplementation(() => Promise.resolve({ data: mockRandomStrings.join('\n') }))

    await getRandomString(mockRequest, res);

    expect(axios.get).toHaveBeenCalledWith("https://www.random.org/strings/", { "params": query });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      balance: 195,
      result: mockRandomStrings,
    });
  });

  test("Get Random Uppercase String Test ", async () => {

    mockRequest.body = {
      quantity: 1,
      length: 5,
      allowDigits: 'off',
      allowUpperalpha: 'on',
      allowLoweralpha: 'off',
      uniqueStrings: 'off',
    };

    const query = {
      "digits": "off",
      "format": "plain",
      "len": 5,
      "loweralpha": "off",
      "num": 1,
      "rnd": "new",
      "unique": "off",
      "upperalpha": "on"
    }

    const res = mockResponse();

    const mockRandomStrings = [
      "HELLOWORLD"
    ];

    axios.get.mockImplementation(() => Promise.resolve({ data: mockRandomStrings.join('\n') }))

    await getRandomString(mockRequest, res);

    expect(axios.get).toHaveBeenCalledWith("https://www.random.org/strings/", { "params": query });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      balance: 195,
      result: mockRandomStrings,
    });
  });
  
  test("Get Random LowerCase String Test ", async () => {

    mockRequest.body = {
      quantity: 1,
      length: 5,
      allowDigits: 'off',
      allowUpperalpha: 'off',
      allowLoweralpha: 'on',
      uniqueStrings: 'off',
    };

    const query = {
      "digits": "off",
      "format": "plain",
      "len": 5,
      "loweralpha": "on",
      "num": 1,
      "rnd": "new",
      "unique": "off",
      "upperalpha": "off"
    }

    const res = mockResponse();

    const mockRandomStrings = [
      "helloworld"
    ];

    axios.get.mockImplementation(() => Promise.resolve({ data: mockRandomStrings.join('\n') }))

    await getRandomString(mockRequest, res);

    expect(axios.get).toHaveBeenCalledWith("https://www.random.org/strings/", { "params": query });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      balance: 195,
      result: mockRandomStrings,
    });
  });

});
