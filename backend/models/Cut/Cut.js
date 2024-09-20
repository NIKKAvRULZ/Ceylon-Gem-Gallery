const mongoose = require('mongoose');

const cutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  Shape: { type: String },
  Facets:{ type: String},
  Proportions:{ type: String},
  Appearance: { type: String}
});

const Cut = mongoose.model('Cut', cutSchema);

module.exports = Cut;

