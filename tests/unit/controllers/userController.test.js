
//jest.mock("../../../controllers/userController");
const userController = require('../../../controllers/userController')
const userService = userController.userService;
const mocks = require('node-mocks-http');
const js2xmlparser = require("js2xmlparser");

let users = [];

let newUser = {
    username: 'testing3',
    name: 'Rakibul3',
    email: 'testing3@gmail.com',
    password: 'testing',
}

let userCreateResponse = {
    username: 'testing3',
    name: 'Rakibul3',
    email: 'testing3@gmail.com'
}
let userLoginCredentials = {
    email: 'abc@gmail.com',
    password: 'abcder'

}

describe('Login User', () => {
    test('Should login an user and response 200 with json', async () => {
        jest.clearAllMocks();
        jest.spyOn(userService, 'loginUser').mockResolvedValue({ jwt: 'jljdsljkj' });
        const res = mocks.createResponse();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            body: userLoginCredentials
        });
        const mNext = "";
        await userController.loginUser(req, res, mNext);
        expect(userService.loginUser).toHaveBeenCalledTimes(1);
        var data = res._getJSONData();
        var content_type = res._getHeaders()['content-type'];
        expect(data.status).toBe('success')
        expect(res.statusCode).toBe(200)
        expect(content_type).toBe("application/json")
    })

})
describe('Create User', () => {
    test('Should create an user and response 201 with json', async () => {
        jest.spyOn(userService, 'createUser').mockResolvedValue(userCreateResponse);
        const res = mocks.createResponse();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            body: newUser
        });
        const mNext = "";
        await userController.createUser(req, res, mNext);
        expect(userService.createUser).toHaveBeenCalledTimes(1);
        var data = res._getJSONData()
        var content_type = res._getHeaders()['content-type'];
        expect(data.data).toEqual(userCreateResponse);
        expect(data.status).toBe('success')
        expect(res.statusCode).toBe(201)
        expect(content_type).toBe("application/json")
    })

    test('Should create an user and response 201 xml', async () => {
        jest.spyOn(userService, 'createUser').mockResolvedValue(userCreateResponse);
        const res = mocks.createResponse();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/xml'
            },
            body: newUser
        });
        const mNext = "";
        await userController.createUser(req, res, mNext);
        expect(userService.createUser).toHaveBeenCalledTimes(1);
        var data = res._getData()
        var content_type = res._getHeaders()['content-type'];
        expect(res.statusCode).toBe(201)
        expect(content_type).toBe("application/xml")
    })
})

