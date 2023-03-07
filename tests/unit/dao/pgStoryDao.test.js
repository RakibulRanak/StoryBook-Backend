const { PgStoryDao } = require('./../../../data/dao/storyDao/pgStoryDao');
const storyDao = new PgStoryDao();
const Story = require('./../../../models/storyModel');


let stories = [];

let newStory = {
    username: 'tester',
    story: 'this story is created for testing purpose',
    title: 'teststory',
    id: 1,
    createdAt: '2135A3434'
}

describe('StoryDao', () => {
    test('Should create a story and response back story', async () => {
        jest.spyOn(Story, 'create').mockImplementation(() => {
            stories.push(newStory);
            return newStory;
        });
        const res = await storyDao.createStory(newStory);
        expect(Story.create).toHaveBeenCalledTimes(1);
        expect(res.username).toBe(undefined)
        expect(res.author).toBe("tester")
    })

    test('Should get a story ', async () => {
        jest.spyOn(Story, 'findOne').mockResolvedValue(stories[0]);
        const storyId = 0;
        const story = await storyDao.getStory(storyId);
        expect(Story.findOne).toHaveBeenCalledTimes(1)
        expect(story.title).toEqual("teststory")
        expect(story.username).toBe(undefined)
        expect(story.author).toBe("tester")
    })

    test('Should get stories', async () => {
        jest.spyOn(Story, 'findAll').mockResolvedValue(stories);
        const req = { query: {} };
        const res = await storyDao.getStories(req);
        expect(Story.findAll).toHaveBeenCalledTimes(1)
        expect(res[0].author).toEqual(stories[0].username)
    })
})





