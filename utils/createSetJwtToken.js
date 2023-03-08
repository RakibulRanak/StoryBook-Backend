const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createSetJwtToken = (username, type) => {
    const payload = {
        user: username
    };
    // var oneWeek = 7 * 24 * 3600 * 1000; //1 weeks
    if(type == 'access') return jwt.sign(payload, process.env.jwtAccessTokenSecret, { expiresIn: process.env.jwtAccessTokenExpire });
    else if(type =='refresh') return jwt.sign(payload, process.env.jwtRefreshTokenSecret, { expiresIn: process.env.jwtRefreshTokenExpire });
};
