const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const storyValidation = require("../validations/storyValidation");
const { validate } = require("../validations/validate");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware.protect,
  storyValidation.createStory(),
  validate,
  storyController.createStory
);
router.get(
  "/:id",
  storyValidation.getStory(),
  validate,
  storyController.getStory
);
router.get("/", storyController.getStories);
router.put(
  "/:id",
  authMiddleware.protect,
  storyValidation.updateStory(),
  validate,
  storyController.updateStory
);
router.delete(
  "/:id",
  authMiddleware.protect,
  storyValidation.deleteStory(),
  validate,
  storyController.deleteStory
);

module.exports = router;
