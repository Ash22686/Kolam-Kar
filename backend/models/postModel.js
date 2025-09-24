// backend/models/postModel.js

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Post must have an image"],
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    // We will assume you have a User model for this reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;