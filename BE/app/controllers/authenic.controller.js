const mongoose = require("mongoose");
const User = require("../model/user.model");
const ApiError = require("../middleware/api-error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ApiError(300, "notexists"));

  const math = await bcrypt.compare(password, user.password);
  if (!math) return next(new ApiError(200, "wrongPassword"));

  try {
    var token = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 900000,
      }
    );

    return res
      .status(200)
      .send({
        message: "Successfull",
        accessToken: token,
        user
      });
  } catch (err) {
    return next(new ApiError(500, "Error"));
  }
};

//register for user
exports.register = async (req, res, next) => {

  const { name, email, password, password_confirm } = req.body;
  // console.log(name, email, password, password_confirm);
  // if (!name || !email || !password || !password_confirm)
  //   return next(new ApiError(300, "Error typing"));

  // if (password.length <= 6) {
  //   return next(new ApiError(401, "Password should be more than 4 charaters"));
  // }
  // if (password !== password_confirm)
  //   return next(new ApiError(500, "Password does not math"));

  const user = await User.findOne({ email });
  if (user) return next(new ApiError(200, "userexists"));


  try {
    hashedPass = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPass });
    // const newUser = new User({
    //   name: name,
    //   email: email,
    //   password: hashedPass,
    // });
    // const saveUser = await newUser.save();
    return res
      .status(201)
      .json({ message: "sucessfully", success: true });


  } catch (error) {
    return next(new ApiError(500, "Error"));
  }
};
exports.logout = async (req, res, next2) => {
  window.localStorage.clear();
  res.status(200).send({
    message: "Logout successful",
  });
};
