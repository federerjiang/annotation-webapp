const express = require("express");
const evalControllers = require("../controllers/eval-controller");

const router = express.Router();

router.get("/label-eval/:uid", evalControllers.getInitialName);

router.post("/label-eval/:uid", evalControllers.updateNameByUserId);

module.exports = router;
