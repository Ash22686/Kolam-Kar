// backend/controllers/postController.js
const Post = require("../models/postModel");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private (requires authentication)
exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    // Assuming you have an auth middleware that sets req.user
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary from buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "kolamkar_posts" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        const newPost = new Post({
          user: userId,
          caption,
          imageUrl: result.secure_url,
          cloudinaryId: result.public_id,
        });

        const createdPost = await newPost.save();
        res.status(201).json(createdPost);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user", "name username avatarUrl") // Populate user details
      .sort({ createdAt: -1 }); // Show newest posts first

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};