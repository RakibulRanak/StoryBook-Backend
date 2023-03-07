const catchAsync = require('../errors/catchAsync');
const { sendResponse } = require("../utils/sendResponse");
const userService  = require('../services/userService');



exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        sendResponse(req, res, 201, user, 'User Created Successfully');
    } catch (err) { next(err) };
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.params.username);
        sendResponse(req, res, 200, user, 'User fetched successfully')
    } catch (err) { next(err) };
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers(req);
        sendResponse(req, res, 200, users, 'Stories fetched successfully')
    } catch (err) { next(err) };
};

exports.updateUser = async (req, res, next) => {
    try {
        const userUpdated = await userService.updateUser(req);
        sendResponse(req, res, 200, userUpdated, 'User updated successfully')
    } catch (err) { next(err) };
};

exports.deleteUser = catchAsync(async (req, res, next) => {
    try {
        await userService.deleteUser(req);
        res.status(204).send();
    } catch (err) { next(err) };
});

exports.loginUser = async (req, res, next) => {
    try {
        const tokens = await userService.loginUser(req, res);
        sendResponse(req, res, 200, tokens, null)
    } catch (err) { next(err) }
};

exports.logoutUser = catchAsync(async (req, res, next) => {
    try {
        res.cookie('jwt', '', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        });

        sendResponse(req, res, 200, null, 'User looged Out successfully')
    } catch (err) { next(err) };

});
exports.changeUserPassword = catchAsync(async (req, res, next) => {
    try {
        const user = await userService.changeUserPassword(req, res);
        sendResponse(req, res, 200, user, 'Password changed successfully')
    } catch (err) { next(err) };

});
