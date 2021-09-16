const express = require("express");
const trainControllers = require("../controllers/train-controller");

const router = express.Router();

router.get("/label-train/:uid", trainControllers.getInitialName);

router.post("/label-train/:uid", trainControllers.updateNameByUserId);

module.exports = router;
