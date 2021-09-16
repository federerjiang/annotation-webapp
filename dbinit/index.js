const fs = require("fs");
const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/mnc";
// const url = "mongodb://mongodb:27017/mnc";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const userRateSchema = new mongoose.Schema({
  uid: { type: Number, required: true },
  value: { type: Number, required: true },
});

const userSelectSchema = new mongoose.Schema({
  uid: { type: Number, required: true },
  value: { type: String, required: true },
});

const evalNameSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  labels: [userSelectSchema],
});

const trainNameSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  labels: [userRateSchema],
});

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  task: {
    nEval: {type: Number, required: true},
    nTrain: {type: Number, required: true},
  }
});

User = mongoose.model("User", userSchema);
EvalName = mongoose.model("EvalName", evalNameSchema);
TrainName = mongoose.model("TrainName", trainNameSchema);

const array1 = fs
  .readFileSync("data/eval_sample_2000.txt")
  .toString()
  .split("\n");
const array2 = fs
  .readFileSync("data/train_sample_6162.txt")
  .toString()
  .split("\n");

const insertEvalNames = async (names, model) => {
  const arr = [];
  for (i in names) {
    parsed = names[i].split(";");
    id = parsed[0];
    mname = parsed[1];
    if (parsed.length === 2) {
      arr.push({
        id: Number(id),
        name: mname,
      });
    } else {
      console.log(parsed[0], parsed[1], parsed[2], parsed[3], parsed.length);
    }
  }
  console.log(arr.length);
  await model.insertMany(arr, function (err, docs) {
    console.log(err);
    // console.log(docs);
  });
};

const insertTrainNames = async (names, model) => {
  const arr = [];
  for (i in names) {
    parsed = names[i].split(";");
    id = parsed[0];
    mname = parsed[1];
    cat = parsed[2];
    if (parsed.length === 3) {
      arr.push({
        id: Number(id),
        name: mname,
        category: cat,
      });
    } else {
      console.log(parsed);
    }
  }
  console.log(arr.length);
  await model.insertMany(arr, function (err, docs) {
    console.log(err);
    // console.log(docs);
  });
};

const users = [
  {
    uid: "u1",
    email: "xiaolan.a.jiang@rakuten.com",
    password: "mnclabel",
    task: {
      nEval: 0,
      nTrain: 0,
    }
  },
  {
    uid: "u2",
    email: "wataru.miura@rakuten.com",
    password: "mnclabel",
    task: {
      nEval: 0,
      nTrain: 0,
    }
  },
  {
    uid: "u3",
    email: "yijie.mou@rakuten.com",
    password: "mnclabel",
    task: {
      nEval: 0,
      nTrain: 0,
    }
  },
  {
    uid: "u4",
    email: "eri.kabayama@rakuten.com",
    password: "mnclabel",
    task: {
      nEval: 0,
      nTrain: 0,
    }
  },
];

const addUsers = async (users) => {
  await User.insertMany(users, function (err, docs) {
    console.log(err);
    console.log(docs);
  });
};

addUsers(users);
insertEvalNames(array1, EvalName);
insertTrainNames(array2, TrainName);
