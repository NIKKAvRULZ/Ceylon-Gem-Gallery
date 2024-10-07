const express = require("express");
const router = express.Router();
const multer = require("multer");
const gemdustController = require("../../controller/gemdustController");
const Gem = require('../../models/Gemdust/gemdustModel');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Existing CRUD routes
router.get("/", gemdustController.getAllGemdust);
router.post("/", upload.single("image"), gemdustController.addgemdust);
router.get("/:id", gemdustController.getByid);
router.put("/:id", upload.single("image"), gemdustController.updateGemdust);
router.delete("/:id", gemdustController.deletegemdust);

// Add new route to fetch gem dusts by userId
router.get("/user/:userId", gemdustController.getUserGemdust);

module.exports = router;
