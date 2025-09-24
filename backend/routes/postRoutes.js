// backend/routes/postRoutes.js
const express = require("express");
const router = express.Router();
const { createPost, getAllPosts } = require("../controllers/postController");
const upload = require("../middlewares/uploadMiddleware");

// 1. Change the import to get the function directly and name it 'auth'
const auth = require("../middlewares/authMiddleware");

// GET all posts
router.get("/", getAllPosts);

// POST a new post
// 2. Use the imported 'auth' middleware here instead of 'protect'
router.post("/", auth, upload.single("image"), createPost);

module.exports = router;