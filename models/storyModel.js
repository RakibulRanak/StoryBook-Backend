const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Story = sequelize.define('stories', {
    username: {
        type: DataTypes.STRING,
        foreignKey: true,
        noUpdate: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    story: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

module.exports = Story;
