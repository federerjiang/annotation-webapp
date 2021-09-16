const HttpError = require("../models/http-error");
const TrainName = require("../models/train-name");
const User = require("../models/user");
// const { validationResult } = require("express-validator");

const getInitialName = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findOne({ uid: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }
  console.log(user);
  const nextNameId = user.task.nTrain + 1;
  console.log(nextNameId);

  let nameObj;
  try {
    nameObj = await TrainName.findOne({ id: nextNameId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }
  console.log(nameObj);
  res.status(200).json({
    nameTrain: {
      id: nameObj.id,
      categorry: nameObj.category,
      name: nameObj.name,
    },
  });
};

const updateNameByUserId = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Invalid inputs passed, please check your data.", 422)
  //   );
  // }

  const userId = req.params.uid;
  const { nameId, value } = req.body;

  console.log(nameId, value);

  let name;
  try {
    name = await TrainName.findOne({ id: nameId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  console.log(name);
  if (name) {
    name.labels.push({
      uid: userId,
      value: value,
    });
  }

  try {
    await name.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  const count = nameId;
  const nextNameId = nameId + 1;
  if (nextNameId <= 6162) {
    try {
      name = await TrainName.findOne({ id: nextNameId });
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update place.",
        500
      );
      return next(error);
    }
    res.status(200).json({ nameTrain: name.toObject({ getters: true }) });
  } else {
    res.status(200).json({ status: "task completed" });
    console.log("already labeled all names");
  }

  let user;
  try {
    user = await User.findOne({ uid: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }
  user.task.nTrain = count;
  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }
  console.log(user);
};

exports.updateNameByUserId = updateNameByUserId;
exports.getInitialName = getInitialName;
