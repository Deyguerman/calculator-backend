const crypto = require('crypto');
const { setRecord, getUserRecords, deleteUserRecord } = require('../records.controller');

const mockRequest = {
  user: {
    id: 2,
  },
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res)
  return res;
};

jest.mock("../../database/records.database");

describe("Records Controller Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Save New User Record", async () => {

    const payload = { operationResult: "5.00", balance: 195, cost: 5, operationId: 1 }

    const spyRandomUUID = jest.spyOn(crypto, 'randomUUID');

    const result = await setRecord(mockRequest, payload);

    expect(spyRandomUUID).toHaveBeenCalled();
    expect(result.id).toBe(spyRandomUUID.mock.results[0].value)
  });

  test("Get User Record", async () => {

    const res = mockResponse();

    await getUserRecords(mockRequest, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ Items: [] });
  });

  test("Delete User Record ", async () => {

    const res = mockResponse();

    await deleteUserRecord(mockRequest, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith('Record Deleted');
  });

});
