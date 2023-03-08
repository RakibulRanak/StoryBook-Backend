const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsync = require('../errors/catchAsync');
const { createSetJwtToken } = require('./createSetJwtToken');
const User = require('../models/userModel');

exports.getNewAccessToken = (req,res) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.sendStatus(401);
    const refresh_token = authHeader.split(' ')[1];
    if (!refresh_token)
        return next(new AppError('You are not logged in! Please log in to get access.', 401));

    jwt.verify(refresh_token, process.env.jwtRefreshTokenSecret,async (err, decoded) => {
        if (err){ 
            console.log(err.message); 
            return res.sendStatus(401);
        } //invalid token
        const user = await User.findOne({
            where: {
                username:decoded.user
            }
        });        
        const refreshTokens = user.refreshToken;
        if(refreshTokens.includes(refresh_token))
            return res.json({"access_token" : createSetJwtToken(decoded.user,'access')})
        else
            return res.sendStatus(401);

    });

};







// const authHeader = req.headers.authorization || req.headers.Authorization;
//     if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
//     const token = authHeader.split(' ')[1];
//     console.log(token)

//     if (req.cookies?.jwt) {

//         // Destructuring refreshToken from cookie
//         const refreshToken = req.cookies.jwt;

//         // Verifying refresh token
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
//         (err, decoded) => {
//             if (err) {

//                 // Wrong Refesh Token
//                 return res.status(406).json({ message: 'Unauthorized' });
//             }
//             else {
//                 // Correct token we send a new access token
//                 const accessToken = jwt.sign({
//                     username: userCredentials.username,
//                     email: userCredentials.email
//                 }, process.env.ACCESS_TOKEN_SECRET, {
//                     expiresIn: '10m'
//                 });
//                 return res.json({ accessToken });
//             }
//         })
//     } else {
//         return res.status(406).json({ message: 'Unauthorized' });
//     }
//     console.log(user.refreshToken);