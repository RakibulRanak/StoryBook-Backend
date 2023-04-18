const catchAsync = require("../errors/catchAsync");
const AppError = require("../errors/appError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

exports.protect = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized user" });
  const token = authHeader.split(" ")[1];
  let accessToken = "";
  //token = req.body.accessToken;
  if (!token)
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );

  jwt.verify(token, process.env.jwtAccessTokenSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: "error", message: err.message });
    } //invalid token

    const currentUser = decoded.user;
    const user = await userService.getUser(currentUser);
    if (user == null)
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    const changedTimestamp = parseInt(user.updatedAt / 1000, 10);
    if (changedTimestamp > decoded.iat)
      return next(
        new AppError(
          "Your credential changed recently.Please log in again",
          401
        )
      );
    //console.log(changedTimestamp, decoded.iat);
    req.user = {
      username: currentUser,
    };
    next();
  });
});

exports.isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  let token = "";
  if (authHeader && authHeader.startsWith("Bearer "))
    token = authHeader.split(" ")[1];
  if (!token) return next();
  try {
    await promisify(jwt.verify)(token, process.env.jwtAccessTokenSecret);
  } catch (err) {
    return next();
  }
  return res.status(403).json({ status: "error", message: "Log out first" });
  //throw new AppError('Please Log out first', '403');
};

// exports.getRefreshToken = catchAsync(async ( req,res, next) => {

// });
