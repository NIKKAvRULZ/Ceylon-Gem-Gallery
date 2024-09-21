const express = require('express');
const router = express.Router();
const Worker = require('../../models/Worker');

// CREATE a new worker
router.post('/', async (req, res) => {
  const { employeeID, name, experience, workload, address, nic } = req.body;

  try {
    const newWorker = new Worker({
      employeeID,
      name,
      experience,
      workload,
      address,
      nic
    });
    await newWorker.save();
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all workers
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ a single worker by ID
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json(worker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a worker
router.put('/:id', async (req, res) => {
  const { employeeID, name, experience, workload, address, nic } = req.body;

  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      { employeeID, name, experience, workload, address, nic },
      { new: true } // returns the updated document
    );

    if (!updatedWorker) return res.status(404).json({ message: 'Worker not found' });
    res.json(updatedWorker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a worker
router.delete('/:id', async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json({ message: 'Worker deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
