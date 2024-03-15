const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "welcome",
  });
});

const authenRoute = require("./app/routes/authenic.route");
app.use("/api/", authenRoute);

const managerRoute = require("./app/routes/manager.route");
app.use("/manager/", managerRoute);

app.use((res, req, next) => {
  return next(new ApiError(404, "Resource Not Found."));
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Sever Error!",
  });
});
module.exports = app;
