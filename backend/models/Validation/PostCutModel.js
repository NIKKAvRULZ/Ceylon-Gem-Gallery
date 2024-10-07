const mongoose = require("mongoose");

const PostCutSchema = new mongoose.Schema({
  validationid: { type: String, required: true },
  gemType: { type: String, required: true },
  cutType: { type: String, required: true },
  weight: { type: Number, required: true },
  polish: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const PostCut = mongoose.model("PostCut", PostCutSchema);
module.exports = PostCut;
