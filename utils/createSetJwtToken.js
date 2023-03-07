const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createSetJwtToken = (res, user) => {
    const payload = {
        user: user.username
    };
    // var oneWeek = 7 * 24 * 3600 * 1000; //1 weeks       
    const accessToken = jwt.sign(payload, process.env.jwtSecret, { expiresIn: process.env.jwtSessionTokenExpire });
    const refreshToken = 'sadfs'
    // res.cookie('jwt', jwtToken, {
    //     expires: new Date(
    //         Date.now() + 3600 * 1000
    //     ),
    //     httpOnly: true

    // });
    // if (process.env.NODE_ENV === 'prooooductin')
    //     cookieOptions.secure = true;
    return {accessToken,refreshToken};
};