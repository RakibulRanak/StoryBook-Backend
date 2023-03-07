
//jest.mock("../../../controllers/storyController");
const storyController = require('../../../controllers/storyController')
const storyService = storyController.storyService;
const mocks = require('node-mocks-http');
const js2xmlparser = require("js2xmlparser");

let newStory = {
    title: 'about life',
    story: 'once upon a time, life was better!'
}
let storyResponse = [{
    title: 'about life',
    story: 'once upon a time, life was better!',
    author: 'testuser',
    id: 1,
    postedAt: '2021-11-01T12:33:14.906Z'
}, {
    title: 'about life',
    story: 'once upon a time, life was better!',
    author: 'testuser',
    id: 1,
    postedAt: '2021-11-01T12:33:14.906Z'
}]


describe('Get story', () => {
    test('Get a story by id in json format ', async () => {
        jest.spyOn(storyService, 'getStory').mockResolvedValue(storyResponse[0]);
        const res = mocks.createResponse();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            params: {
                id: 0
            }
        });
        const mNext = "";
        await storyController.getStory(req, res, mNext);
        expect(storyService.getStory).toHaveBeenCalledTimes(1);
        var data = res._getJSONData();
        var content_type = res._getHeaders()['content-type'];
        expect(data.status).toBe('success')
        expect(res.statusCode).toBe(200)
        expect(content_type).toBe("application/json")
        expect(data.data).toEqual(storyResponse[0]);
    })
    test('Get story by id request but throws error ', async () => {
        jest.spyOn(storyService, 'getStory').mockImplementation(() => {
            throw new Error('Story not found');
        });
        const res = mocks.createResponse();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            params: {
                id: 0
            }
        });
        const mNext = jest.fn();
        await storyController.getStory(req, res, mNext);
        expect(mNext).toHaveBeenCalledTimes(1);
    })

    test('Get a story by id in xml format ', async () => {
        jest.spyOn(storyService, 'getStory').mockResolvedValue(storyResponse[0]);
        const res = mocks.createResponse();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/xml'
            },
            params: {
                id: 0
            }
        });
        const mNext = "";
        await storyController.getStory(req, res, mNext);
        expect(storyService.getStory).toHaveBeenCalledTimes(1);
        var data = res._getData();
        var content_type = res._getHeaders()['content-type'];
        expect(res.statusCode).toBe(200)
        expect(content_type).toBe("application/xml")

    })

    test('Get a stories in json format ', async () => {
        jest.spyOn(storyService, 'getStory').mockResolvedValue(storyResponse);
        const res = mocks.createResponse();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            }
        });
        const mNext = "";
        await storyController.getStory(req, res, mNext);
        expect(storyService.getStory).toHaveBeenCalledTimes(1);
        var data = res._getJSONData();
        var content_type = res._getHeaders()['content-type'];
        expect(data.status).toBe('success')
        expect(res.statusCode).toBe(200)
        expect(content_type).toBe("application/json")
        expect(data.data).toEqual(storyResponse);
        expect(data.data.length).toEqual(2)
    })

})
describe('Create Story', () => {
    test('Should create a story and response 201 with json', async () => {
        jest.spyOn(storyService, 'createStory').mockResolvedValue(storyResponse[0]);
        const res = mocks.createResponse();
        const req = mocks.createRequest({
            headers: {
                accept: 'application/json'
            },
            body: newStory
        });
        const mNext = "";
        await storyController.createStory(req, res, mNext);
        expect(storyService.createStory).toHaveBeenCalledTimes(1);
        var data = res._getJSONData()
        var content_type = res._getHeaders()['content-type'];
        expect(data.data).toEqual(storyResponse[0]);
        expect(data.status).toBe('success')
        expect(res.statusCode).toBe(201)
        expect(content_type).toBe("application/json")
    })
})

