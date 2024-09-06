const express = require('express');
const router = express.Router();
const Cut = require('../models/cut');


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
router.post("/",(req,res)=>{
  Cut.create(req.body).then(()=>res.json({msg:"Cut Addedd Successfully"}))
  .catch(()=>req.status(400).json({msg:"Cut Adding Faild"}));
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

module.exports = router;
