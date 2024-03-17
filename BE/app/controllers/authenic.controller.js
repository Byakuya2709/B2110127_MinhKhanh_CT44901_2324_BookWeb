const mongoose = require("mongoose");
const User = require("../model/user.model");
const ApiError = require("../middleware/api-error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ApiError(404, "Tài khoản không tồn tại. Vui lòng nhập lại."));

  const math = await bcrypt.compare(password, user.password);
  if (!math) return next(new ApiError(401, "Sai mật khẩu. Vui lòng nhập lại."));

  try {
    var token = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    );

    return res
      .status(201)
      .send({
        message: "Đăng Nhập Thành Công",
        accessToken: token,
        user
      });
  } catch (err) {
    return next(new ApiError(500, "Error"));
  }
};

//register for user
exports.register = async (req, res, next) => {

  const { fullname, email, birth, address, gender, password, password_confirm } = req.body;
  // console.log(fullname, email, birth, address, gender, password, password_confirm);
  // if (!name || !email || !password || !password_confirm)
  //   return next(new ApiError(300, "Error typing"));

  // if (password.length <= 6) {
  //   return next(new ApiError(401, "Password should be more than 4 charaters"));
  // }
  // if (password !== password_confirm)
  //   return next(new ApiError(500, "Password does not math"));

  const user = await User.findOne({ email });
  if (user) return next(new ApiError(409, "Email này đã tồn tại. Vui lòng nhập email khác."));


  try {
    hashedPass = await bcrypt.hash(password, 10);
    await User.create({ fullname, email, birth, address, gender, password: hashedPass });
    return res
      .status(201)
      .json({ message: "Đăng ký thành công", success: true });


  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Error"));
  }
};
exports.logout = async (req, res, next2) => {
  window.localStorage.clear();
  res.status(200).send({
    message: "Logout successful",
  });
};
