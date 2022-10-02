const mongoose = require("mongoose");

// Creating Schema for collections
const comprehension1Schema = new mongoose.Schema({
  id: Number,
  question: String,
  answer: String,
  distractor: Array,
  img: String,
});

// Exporting the model
module.exports = mongoose.model("comprehension1", comprehension1Schema);
