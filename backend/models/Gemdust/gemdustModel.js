const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gemdustSchema = new Schema({
  gemtypes: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  purity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String, // URL of the uploaded image
    required: true,
  },
});

module.exports = mongoose.model("Gemdust", gemdustSchema);
