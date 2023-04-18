const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsync = require("../errors/catchAsync");
const { createSetJwtToken } = require("./createSetJwtToken");
const User = require("../models/userModel");
const AppError = require("../errors/appError");

exports.getNewAccessToken = (req, res, next) => {
  const { refresh_token } = req.body;
  console.log("new token", refresh_token);
  if (!refresh_token)
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );

  jwt.verify(
    refresh_token,
    process.env.jwtRefreshTokenSecret,
    async (err, decoded) => {
      if (err) {
        console.log(err.message);
        return res.sendStatus(401);
      } //invalid token
      const user = await User.findOne({
        where: {
          username: decoded.user,
        },
      });
      const refreshTokens = user.refreshToken;
      if (refreshTokens.includes(refresh_token))
        return res.json({
          access_token: createSetJwtToken(decoded.user, "access"),
        });
      else return res.sendStatus(401);
    }
  );
};
