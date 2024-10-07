const express = require("express");
const router = express.Router();
const multer = require("multer");
const postCutController = require("../../controller/PostCutController");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/");  // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);  // Append timestamp to the original filename
  },
});
const upload = multer({ storage: storage });

// Existing CRUD routes for post-cut gem validation
router.get("/", postCutController.getAllPostCutGems);  // Get all post-cut gems
router.post("/", upload.single("image"), postCutController.addPostCutGem);  // Add a new post-cut gem with an image
router.get("/:id", postCutController.getPostCutGemById);  // Get post-cut gem by ID
router.put("/:id", upload.single("image"), postCutController.updatePostCutGem);  // Update a post-cut gem by ID
router.delete("/:id", postCutController.deletePostCutGem);  // Delete a post-cut gem by ID

module.exports = router;