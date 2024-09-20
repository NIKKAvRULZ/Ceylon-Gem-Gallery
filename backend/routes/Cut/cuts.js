const express = require('express');
const router = express.Router();
const Cut = require('../../models/Cut/Cut');

// GET All Cuts
router.get('/', async (req, res) => {
  try { 
    const cuts = await Cut.find();
    res.json(cuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Cuts
router.post("/", (req, res) => {
  Cut.create(req.body)
    .then(() => res.json({ msg: "Cut Added Successfully" }))
    .catch((err) => res.status(400).json({ msg: err })); // Changed req to res
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
router.put("/:id", (req, res) => {
  Cut.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Optional: Return the updated document
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
