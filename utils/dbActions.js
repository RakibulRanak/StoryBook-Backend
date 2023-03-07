const sequelize = require('../db/pgConfig');
const Story = require('../models/storyModel');
const User = require('../models/userModel');

exports.destroyDB = async () => {
    await sequelize.sync({ force: true });
    return;
};

exports.initDB = async () => {
    await sequelize.sync();
    return;
};

exports.clearDB = async () => {
    // await Story.destroy({ truncate: true, cascade: true });
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
    return;
};


