const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  createReply,
  openPost,
  closePost,
} = require("../controllers/postController");
const { authorize } = require("../middleware/authorize");

router.route("/").post(createPost).get(authorize, getPosts);
router.route("/:id/reply").post(createReply);
router.route("/openPost/:id").post(openPost);
router.route("/closePost/:id").post(closePost);

module.exports = router;
