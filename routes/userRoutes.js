"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidation = require("../validations/userValidation");
const { validate } = require("../validations/validate");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", authMiddleware.isLoggedIn, userController.loginUser);
// router.post("/logout", userController.logoutUser);
router.post("/logout", userController.logoutUser);
router.get("/me", authMiddleware.protect, userController.getLoggedInUser);
router.get(
  "/:username",
  userValidation.getUser(),
  validate,
  userController.getUser
);

router.put(
  "/changepassword",
  authMiddleware.protect,
  userValidation.changeUserPassword(),
  validate,
  userController.changeUserPassword
);
router.put(
  "/",
  authMiddleware.protect,
  userValidation.updateUser(),
  validate,
  userController.updateUser
);
router.delete(
  "/",
  authMiddleware.protect,
  userValidation.deleteUser(),
  validate,
  userController.deleteUser
);
router.get("/", userController.getUsers);
router.post(
  "/",
  authMiddleware.isLoggedIn,
  userValidation.createUser(),
  validate,
  userController.createUser
);

module.exports = router;
