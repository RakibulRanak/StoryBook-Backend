const User = require('../models/userModel');
const Story = require('../models/storyModel');


User.hasMany(Story, { foreignKey: { name: 'username', allowNull: false } })
Story.belongsTo(User, { foreignKey: { name: 'username', allowNull: false } })



