const express = require('express');
const router = express.Router();
const Cut = require('../../models/Cut/Cut');


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images/Cuts')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

// Add Cuts
router.post("/", upload.single('imageUrl'), (req, res) => {
  Cut.create({ ...req.body, imageUrl: req.file.filename })
    .then(() => res.json({ msg: "Cut Added Successfully" }))
    .catch((err) => res.status(400).json({ msg: err })); // Changed req to res
});

// GET All Cuts
router.get('/', async (req, res) => {
  try {
    const cuts = await Cut.find();
    res.json(cuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET Cut by ID
router.get('/:id', async (req, res) => {
  try {
    const cut = await Cut.findById(req.params.id);
    if (!cut) throw new Error('Cut not found');
    res.json(cut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update cut by ID
router.put("/:id", upload.single('imageUrl'), (req, res) => {
  Cut.findByIdAndUpdate(req.params.id, { ...req.body, imageUrl: req.file.filename }, { new: true }) // Optional: Return the updated document
    .then(() => res.json({ msg: "Updated Successfully" }))
    .catch(() => res.status(400).json({ msg: "Update Failed" }));
});

// Delete cut by ID
router.delete("/:id", (req, res) => {
  Cut.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Deleted Successfully" }))
    .catch(() => res.status(400).json({ msg: "Cannot be deleted" }));
});

module.exports = router;
