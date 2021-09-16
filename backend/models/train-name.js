const mongoose = require("mongoose");

const userRateSchema = new mongoose.Schema({
  uid: {type: String, required: true},
  value: {type: Number, required: true},
});

const trainNameSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  labels: [userRateSchema],
});

module.exports = mongoose.model("TrainName", trainNameSchema);
