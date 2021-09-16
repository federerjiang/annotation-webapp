const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  task: {
    nEval: {type: Number, required: true},
    nTrain: {type: Number, required: true},
  }
});

module.exports = mongoose.model("User", userSchema);
