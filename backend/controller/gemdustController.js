const Gemdust = require("../models/Gemdust/gemdustModel");


// Get all gem dust entries
const getAllGemdust = async (req, res) => {
  try {
    const gemdusts = await Gemdust.find();
    if (!gemdusts.length) {
      return res.status(404).json({ message: "No gem dust found" });
    }
    return res.status(200).json({ gemdusts });
  } catch (err) {
    console.error("Error retrieving gem dust:", err);
    return res.status(500).json({ message: "Server error while retrieving gem dust" });
  }
};

// Add new gem dust entry
const addgemdust = async (req, res) => {
  const { gemtypes, weight, quality, price, purity, date } = req.body;
  const image = req.file ? req.file.filename : null;

  console.log("Request Body:", req.body); // Log the form data
  console.log("Uploaded Image:", req.file); // Log the image file

  try {
    const newGemdust = new Gemdust({
      gemtypes,
      weight,
      quality,
      price,
      purity,
      date,
      image,
    });

    const savedGemdust = await newGemdust.save();
    return res.status(201).json({ gemdust: savedGemdust });
  } catch (err) {
    console.error("Error adding gem dust:", err);
    return res.status(500).json({
      message: "Unable to add gem dust due to server error",
      error: err.message,
    });
  }
};

// Get gem dust entry by ID
const getByid = async (req, res) => {
  const id = req.params.id;

  try {
    const gemdust = await Gemdust.findById(id);
    if (!gemdust) {
      return res.status(404).json({ message: "Gem dust not found" });
    }
    return res.status(200).json({ gemdust });
  } catch (err) {
    console.error("Error retrieving gem dust by ID:", err);
    return res.status(500).json({ message: "Error retrieving gem dust by ID" });
  }
};

// Update gem dust entry
const updateGemdust = async (req, res) => {
  const id = req.params.id;
  const { gemtypes, weight, quality, price, purity, date } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const updatedGemdust = await Gemdust.findByIdAndUpdate(
      id,
      { gemtypes, weight, quality, price, purity, date, image }, // Corrected field list
      { new: true } // Return the updated document
    );

    if (!updatedGemdust) {
      return res.status(404).json({ message: "Gem dust not found" });
    }

    return res.status(200).json({ gemdust: updatedGemdust });
  } catch (err) {
    console.error("Error updating gem dust:", err);
    return res.status(500).json({ message: "Error updating gem dust" });
  }
};


// Delete gem dust entry
const deletegemdust = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedGemdust = await Gemdust.findByIdAndDelete(id);
    if (!deletedGemdust) {
      return res.status(404).json({ message: "Gem dust not found" });
    }
    return res.status(200).json({ message: "Gem dust deleted successfully" });
  } catch (err) {
    console.error("Error deleting gem dust:", err);
    return res.status(500).json({ message: "Error deleting gem dust" });
  }
};

// Get all gem dust entries for a specific user
const getUserGemdust = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userGemdusts = await Gemdust.find({ user: userId }); // Assuming `user` field exists in your model
    if (!userGemdusts.length) {
      return res.status(404).json({ message: "No gem dust found for this user" });
    }
    return res.status(200).json({ gemdusts: userGemdusts });
  } catch (error) {
    console.error("Error retrieving user's gem dust:", error);
    return res.status(500).json({ message: "Failed to fetch user's gem dust" });
  }
};

module.exports = {
  getAllGemdust,
  addgemdust,
  getByid,
  updateGemdust,
  deletegemdust,
  getUserGemdust,
};
