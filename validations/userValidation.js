const { body, param, check } = require("express-validator");
const AppError = require("../errors/appError");

exports.createUser = () => {
  return [
    body("email").isEmail().withMessage("Not a valid Email"),
    body("name")
      .trim()
      .isLength({ max: 20, min: 1 })
      .withMessage("Name must contain 1-20 letters"),
    body("password")
      .trim()
      .isLength({ max: 15, min: 6 })
      .withMessage("Password must contain 6-10 letters"),
    body("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username can't be null"),
    body("confirmPassword").custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new AppError("Password are not same");
      }
      return true;
    }),
  ];
};

exports.getUser = () => {
  return [
    param("username").exists().withMessage("Param username must be included!"),
  ];
};

exports.updateUser = () => {
  return [
    body("name")
      .if(body("name").exists())
      .trim()
      .isLength({ max: 20, min: 1 })
      .withMessage("Name must contain 1-20 letters"),
    body("email")
      .if(body("email").exists())
      .isEmail()
      .withMessage("Invalid email!"),
  ];
};

exports.deleteUser = () => {
  return [
    body("password")
      .trim()
      .isLength({ max: 15, min: 8 })
      .withMessage("Password must contain 6-10 letters"),
  ];
};

exports.changeUserPassword = () => {
  return [
    body("oldPassword")
      .trim()
      .isLength({ max: 15, min: 8 })
      .withMessage("Password must contain 6-10 letters"),
    body("newPassword")
      .trim()
      .isLength({ max: 15, min: 8 })
      .withMessage("Password must contain 6-10 letters"),
    body("confirmPassword").custom((val, { req }) => {
      if (val !== req.body.newPassword) {
        throw new AppError("Password are not samw");
      }
      return true;
    }),
  ];
};
