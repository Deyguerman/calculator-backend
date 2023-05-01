const bcrypt = require("bcrypt")
const { login, getUserBalance } = require('../users.controller');
const fakeUsers = require('../../assets/fake-users.json')

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

jest.mock("../../utils/auth");
jest.mock("../../database/users.database");
jest.mock("../../database/records.database");

describe("Users Controllers Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Login Cases', () => {
    test("Login Successfully ", async () => {

      mockRequest.body = {
        email: 'user2@test.com',
        password: '12345678'
      };

      const res = mockResponse();
      const spyCompare = jest.spyOn(bcrypt, 'compare');

      await login(mockRequest, res);

      expect(spyCompare).toHaveBeenCalled();
      expect(spyCompare).toHaveBeenCalledWith(mockRequest.body.password, fakeUsers[0].password);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: 'ACCESSTOKEN'
      });
    });

    test("Login Fail - Inactive User ", async () => {

      mockRequest.body = {
        email: 'user1@test.com',
        password: '12345678'
      };

      const res = mockResponse();

      await login(mockRequest, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith('Invalid User Credentials');
    });
  })

  test("User Current Balance ", async () => {

    const res = mockResponse();

    await getUserBalance(mockRequest, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ currentBalance: 200 });
  });

});
