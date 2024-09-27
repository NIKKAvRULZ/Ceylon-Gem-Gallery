const express = require('express');
const router = express.Router();
const Gem = require('../../models/shop/gem'); // Updated the model import


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images/Cuts') // Assuming this is the folder for images, rename if necessary
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

// Add Gems
router.post("/", upload.single('imageUrl'), (req, res) => {
  Gem.create({ ...req.body, imageUrl: req.file.filename }) // Updated to Gem
    .then(() => res.json({ msg: "Gem Added Successfully" })) // Updated success message
    .catch((err) => res.status(400).json({ msg: err }));
});

// GET All Gems
router.get('/', async (req, res) => {
  try {
    const gems = await Gem.find(); // Updated to Gem
    res.json(gems); // Updated to gems
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Gem by ID
router.get('/:id', async (req, res) => {
  try {
    const gem = await Gem.findById(req.params.id); // Updated to Gem
    if (!gem) throw new Error('Gem not found'); // Updated error message
    res.json(gem); // Updated to gem
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Gem by ID
router.put("/:id", upload.single('imageUrl'), (req, res) => {
  Gem.findByIdAndUpdate(req.params.id, { ...req.body, imageUrl: req.file.filename }, { new: true }) // Updated to Gem
    .then(() => res.json({ msg: "Updated Successfully" }))
    .catch(() => res.status(400).json({ msg: "Update Failed" }));
});

// Delete Gem by ID
router.delete("/:id", (req, res) => {
  Gem.findByIdAndDelete(req.params.id) // Updated to Gem
    .then(() => res.json({ msg: "Deleted Successfully" }))
    .catch(() => res.status(400).json({ msg: "Cannot be deleted" }));
});

module.exports = router;
