const { createSetJwtToken } = require('../utils/createSetJwtToken')
const User = require('../models/userModel');
const { UserDto } = require('../dto/userDto')
const bcrypt = require('bcryptjs');
const AppError = require('../errors/appError')
const Sequelize = require('sequelize');

exports.createUser = async (userBody) => {
    const Op = Sequelize.Op;
    const { email, username, name, password } = userBody;
    let user = await User.findOne({ where: { username } });
    if (user)
        throw new AppError('Username Already Exist!', 405);

    user = await User.findOne({ where: { email } });
    if (user)
        throw new AppError('Email Already Exist!', 405);

    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password, salt);
    user = await User.create({ username, name, email, password: hashedpassword });
    return new UserDto(user);
};

exports.getUser = async (userName) => {
    const user = await User.findOne({ where: { username: userName } });
    if (!user) throw new AppError(`User not found`, 404);
    return new UserDto(user);
};

exports.getUsers = async (req) => {
    let { page, size } = req.query;
    if (!page)
        page = 1;
    if (!size)
        size = 10;
    const limit = parseInt(size);
    const skip = limit * (parseInt(page) - 1);
    const users = await User.findAll({ limit, offset: skip, order: [['createdAt', 'DESC']] });
    if (users[0] == null) throw new AppError(`No user found`, 404);
    let userArray = [];
    for (let i = 0; i < users.length; i++) {
        userArray[i] = new UserDto(users[i]);
    }
    return userArray;
};
exports.updateUser = async (req) => {
    const { name, email } = req.body;
    const username = req.user.username;
    const userUpdated = await User.update({ name, email }, { returning: true, where: { username } });
    if (!userUpdated[0])
        throw new AppError(`User did not update`, 404);
    return new UserDto(userUpdated[1][0]);
};

exports.deleteUser = async (req) => {
    const { password } = req.body;
    const username = req.user.username;
    const user = await User.findOne({
        where: {
            username
        }
    });
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
        throw new AppError('Invalid Credential', 404);
    await User.destroy({ where: { username } });
    return;
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username
        }
    });
    if (user == null)
        throw new AppError('Invalid Credential', 404);
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
        throw new AppError('Invalid Credential', 404);

    const user_info = new UserDto(user);
    const token = createSetJwtToken(res, user_info);
    let refreshToken = user.refreshToken;
    refreshToken.push(token.refreshToken);
    const updatedUser = await User.update({ refreshToken }, { returning: true, where: { username } }); 
    return token;
}

exports.changeUserPassword = async (req) => {
    const username = req.user.username;
    const { newPassword, oldPassword } = req.body;
    const user = await User.findOne({
        where: {
            username
        }
    });
    const validPass = await bcrypt.compare(oldPassword, user.password);
    if (!validPass)
        throw new AppError('Invalid Credential', 404);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);
    const updatedUser = await User.update({ password }, { returning: true, where: { username } });
    const user_info = new UserDto(updatedUser[1][0]);
    createSetJwtToken(res, user_info);
    return user_info;
}



