const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const ApiError = require("../middleware/api-error");

exports.authenticate = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    // const token = req.header("Authorization").split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.UserId = decoded.id;

    next();
  } catch (error) {
    return next(new ApiError(401, "Authentication failed"));
  }
};

exports.authorize = async (req, res, next) => {
  try {
    const userId = req.UserId;
    const user = await User.findById(userId);
    console.log(userId);
    if (!user || user.role != "manager") {
      return next(new ApiError(401, "ban khong co quyen truy cap"));
    }

    next();
  } catch (error) {
    return next(new ApiError(401, "fail author"));
  }
};
