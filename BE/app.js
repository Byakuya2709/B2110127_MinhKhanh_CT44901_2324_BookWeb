const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const ApiError = require("./app/middleware/api-error"); // Chắc chắn rằng bạn đã require ApiError
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/dist'))
app.get("/", (req, res) => {
  res.json({
    message: "welcome",
  });
});

const authenRoute = require("./app/routes/authenic.route");
app.use("/api/", authenRoute);

const managerRoute = require("./app/routes/manager.route");
app.use("/manager/", managerRoute);

const userRoute = require("./app/routes/user.route");
app.use("/user/", userRoute);


// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource Not Found."));
});

// Middleware xử lý lỗi 500 và các lỗi khác
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Sever Error!",
  });
});

module.exports = app;
