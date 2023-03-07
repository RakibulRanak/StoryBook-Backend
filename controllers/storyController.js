const catchAsync = require('../errors/catchAsync');
const { sendResponse } = require("../utils/sendResponse");
const  storyService  = require('../services/storyService');

exports.createStory = async (req, res, next) => {
    try {
        const story = await storyService.createStory(req);
        sendResponse(req, res, 201, story, 'Story created successfully')
    } catch (err) { next(err) };
};

exports.getStory = async (req, res, next) => {
    try {
        const story = await storyService.getStory(req.params.id);
        sendResponse(req, res, 200, story, 'Story fetched successfully')
    } catch (err) { next(err) };

};

exports.getStories = async (req, res, next) => {
    try {
        const stories = await storyService.getStories(req);
        sendResponse(req, res, 200, stories, 'Stories fetched successfully')

    } catch (err) { next(err) };
};

exports.updateStory = async (req, res, next) => {
    try {
        const storyUpdated = await storyService.updateStory(req);
        sendResponse(req, res, 200, storyUpdated, 'Story updated successfully')
    } catch (err) { next(err) };
};

exports.deleteStory = async (req, res, next) => {
    try {
        await storyService.deleteStory(req);
        res.status(204).send();
    } catch (err) { next(err) };
};



