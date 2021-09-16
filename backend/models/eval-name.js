const { builtinModules } = require("module");
const mongoose = require("mongoose");

const userSelectSchema = new mongoose.Schema({
  uid: {type: String, required: true},
  value: {type: String, required: true},
});

const evalNameSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  labels: [userSelectSchema],
});

module.exports = mongoose.model("EvalName", evalNameSchema);