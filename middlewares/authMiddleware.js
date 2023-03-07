const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const userService  = require('../services/userService');


exports.protect = catchAsync(async (req, res, next) => {
    let token = "";
    token = req.cookies.jwt;
    if (!token)
        return next(new AppError('You are not logged in! Please log in to get access.', 401));

    console.log(token)
    const decoded = await promisify(jwt.verify)(token, process.env.jwtSecret);
    const currentUser = decoded.user;
    // const user = await User.findOne({
    //     where: {
    //         username: currentUser
    //     }
    // })
    const user = await userService.getUser(currentUser);
    if (user == null)
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    const changedTimestamp = parseInt(user.updatedAt / 1000, 10);
    if (changedTimestamp > decoded.iat)
        return next(new AppError('Your credential changed recently.Please log in again', 401));
    //console.log(changedTimestamp, decoded.iat);
    req.user = {
        username: currentUser
    };
    next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
    let token = "";
    token = req.cookies.jwt;
    if (!token)
        return next();
    const decoded = await promisify(jwt.verify)(token, process.env.jwtSecret);
    if (decoded)
        throw new AppError('Please Log out first', '403');
    next();
});
