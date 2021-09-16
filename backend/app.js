const express = require("express");
const mongoose = require("mongoose");
const trainRoute = require("./routes/train-route");
const evalRoute = require("./routes/eval-route");
const HttpError = require("./models/http-error");
const userRoute = require("./routes/user-routes");
const URL = "mongodb://127.0.0.1:27017/mnc";
const port = 8010;
// const URL = "mongodb://mongodb:27017/mnc";

const app = express();
app.use(express.json());
// app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "Get, POST, PATCH, DELETE");
  next();
});

app.use("/api/", evalRoute);
app.use("/api/", trainRoute);
app.use("/api/", userRoute);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    console.log("error comes here");
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(URL)
  .then(() => {
    console.log("connecte to the database");
    app.listen(port, "127.0.0.1", () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
