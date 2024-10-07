const PostCut = require("../models/Validation/PostCutModel");

// Get all post-cut gems
const getAllPostCutGems = async (req, res) => {
  try {
    const postCutGems = await PostCut.find();
    if (!postCutGems.length) {
      return res.status(404).json({ message: "No post-cut gems found" });
    }
    return res.status(200).json({ postCutGems });
  } catch (err) {
    console.error("Error retrieving post-cut gems:", err);
    return res.status(500).json({ message: "Server error while retrieving post-cut gems" });
  }
};

// Add a new post-cut gem
const addPostCutGem = async (req, res) => {
  const { validationid, gemType, cutType, weight, polish, price, description } = req.body;
  const image = req.file ? req.file.path : null;  // Assuming image is uploaded via multer

  console.log("Request Body:", req.body);
  console.log("Uploaded Image:", req.file);

  try {
    const newPostCutGem = new PostCut({
      validationid,
      gemType,
      cutType,
      weight,
      polish,
      price,
      description,
      image,
    });

    const savedPostCutGem = await newPostCutGem.save();
    return res.status(201).json({ postCutGem: savedPostCutGem });
  } catch (err) {
    console.error("Error adding post-cut gem:", err);
    return res.status(500).json({
      message: "Unable to add post-cut gem due to server error",
      error: err.message,
    });
  }
};

// Get a post-cut gem by ID
const getPostCutGemById = async (req, res) => {
  const id = req.params.id;

  try {
    const postCutGem = await PostCut.findById(id);
    if (!postCutGem) {
      return res.status(404).json({ message: "Post-cut gem not found" });
    }
    return res.status(200).json({ postCutGem });
  } catch (err) {
    console.error("Error retrieving post-cut gem by ID:", err);
    return res.status(500).json({ message: "Error retrieving post-cut gem by ID" });
  }
};

// Update post-cut gem
const updatePostCutGem = async (req, res) => {
  const id = req.params.id;
  const { validationid, gemType, cutType, weight, polish, price, description } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const updatedPostCutGem = await PostCut.findByIdAndUpdate(
      id,
      { validationid, gemType, cutType, weight, polish, price, description, image },
      { new: true }  // Return the updated document
    );

    if (!updatedPostCutGem) {
      return res.status(404).json({ message: "Post-cut gem not found" });
    }

    return res.status(200).json({ postCutGem: updatedPostCutGem });
  } catch (err) {
    console.error("Error updating post-cut gem:", err);
    return res.status(500).json({ message: "Error updating post-cut gem" });
  }
};

// Delete post-cut gem
const deletePostCutGem = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedPostCutGem = await PostCut.findByIdAndDelete(id);
    if (!deletedPostCutGem) {
      return res.status(404).json({ message: "Post-cut gem not found" });
    }
    return res.status(200).json({ message: "Post-cut gem deleted successfully" });
  } catch (err) {
    console.error("Error deleting post-cut gem:", err);
    return res.status(500).json({ message: "Error deleting post-cut gem" });
  }
};

// Get all post-cut gems for a specific user
const getUserPostCutGems = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userPostCutGems = await PostCut.find({ user: userId });
    if (!userPostCutGems.length) {
      return res.status(404).json({ message: "No post-cut gems found for this user" });
    }
    return res.status(200).json({ postCutGems: userPostCutGems });
  } catch (error) {
    console.error("Error retrieving user's post-cut gems:", error);
    return res.status(500).json({ message: "Failed to fetch user's post-cut gems" });
  }
};

module.exports = {
  getAllPostCutGems,
  addPostCutGem,
  getPostCutGemById,
  updatePostCutGem,
  deletePostCutGem,
  getUserPostCutGems,
};
