const { StoryService } = require("../../../services/storyService")
const { PgStoryDao } = require('../../../data/dao/storyDao/pgStoryDao');
const storyDao = new PgStoryDao();
const storyService = new StoryService(storyDao);


let stories = [];

let newStory = {
    username: 'tester',
    story: 'this story is created for testing purpose',
    title: 'teststory'
}

describe('StoryService', () => {
    test('Should create a story and response 201', async () => {
        jest.spyOn(storyDao, 'createStory').mockImplementation(() => {
            stories.push(newStory);
            return newStory;
        });
        const req = {
            user: {
                username: 'tester'
            },
            body: newStory
        }
        const res = await storyService.createStory(req);
        expect(storyDao.createStory).toHaveBeenCalledTimes(1);
    })

    test('Should get a story and response 200', async () => {
        jest.spyOn(storyDao, 'getStory').mockResolvedValue(stories[0]);
        const storyId = 0;
        const story = await storyService.getStory(storyId);
        expect(storyDao.getStory).toHaveBeenCalledTimes(1)
        expect(story.title).toEqual("teststory")
    })

    test('Should get stories and response 200', async () => {
        jest.spyOn(storyDao, 'getStories').mockResolvedValue(stories);
        const res = await storyService.getStories();
        expect(storyDao.getStories).toHaveBeenCalledTimes(1)
        expect(res).toEqual(stories)
    })
})





