const mongoose = require("mongoose");
const User = require("../model/user.model");
const Manager = require("../model/mangager.model")
const ApiError = require("../middleware/api-error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config")

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ApiError(404, "Tài khoản không tồn tại. Vui lòng nhập lại."));
  if (user.role == "manager") return next(new ApiError(404, "Tài khoản này là tài khoản nhóm quán lý"));
  const math = await bcrypt.compare(password, user.password);
  if (!math) return next(new ApiError(401, "Sai mật khẩu. Vui lòng nhập lại."));

  try {
    var token = jwt.sign(
      {
        id: user._id,
      },
      config.ACCESS_TOKEN_SECRET.token,
      {
        expiresIn: '15m',
      }
    );
    console.log()
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
exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Manager.findOne({ email });
  if (!user) return next(new ApiError(404, "Tài khoản không tồn tại. Vui lòng nhập lại."));

  const math = await bcrypt.compare(password, user.password);
  if (!math) return next(new ApiError(401, "Sai mật khẩu. Vui lòng nhập lại."));
  if (user.role != "manager") return next(new ApiError(404, "Tài khoản này không thuộc nhóm quán lý"));
  try {
    var token = jwt.sign(
      {
        id: user._id,
      },
      config.ACCESS_TOKEN_SECRET.token,
      {
        expiresIn: '15m',
      }
    );
    console.log()
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
  const manager = await Manager.findOne({ email });
  if (manager) return next(new ApiError(409, "Email này đã tồn tại. Vui lòng nhập email khác."));

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
// dang ky

exports.registeradmin = async (req, res, next) => {

  const { fullname, email, birth, address, gender, password, password_confirm } = req.body;

  const manager = await Manager.findOne({ email });
  if (manager) return next(new ApiError(409, "Email này đã tồn tại. Vui lòng nhập email khác."));
  const user = await User.findOne({ email });
  if (user) return next(new ApiError(409, "Email này đã tồn tại. Vui lòng nhập email khác."));

  try {
    hashedPass = await bcrypt.hash(password, 10);
    await Manager.create({ fullname, email, birth, address, gender, password: hashedPass });
    return res
      .status(201)
      .json({ message: "Đăng ký thành công", success: true });


  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Error"));
  }
};
// dang xuat
exports.logout = async (req, res, next) => {
  window.localStorage.clear();
  res.status(200).send({
    message: "Logout successful",
  });
};
exports.getManager = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return next(new ApiError(401, "CẦN ĐĂNG NHẬP ĐỂ THỰC HIỆN CHỨC NĂNG NÀY"));

  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET.token);
    const userId = decoded.id;
    const manager = await Manager.findById(userId)
    if (!manager) return next(new ApiError(409, "Không tồn tại tài khoản này!!"));


    return res.status(200).json(manager);
  } catch (error) {
    // Handle token verification errors
    return next(new ApiError(501, "Error"));
  }

};
exports.getUser = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return next(new ApiError(401, "CẦN ĐĂNG NHẬP ĐỂ THỰC HIỆN CHỨC NĂNG NÀY"));

  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET.token);
    const userId = decoded.id;
    const user = await User.findById(userId)
    if (!user) return next(new ApiError(409, "Không tồn tại tài khoản này!!"));


    return res.status(200).json(user);
  } catch (error) {
    // Handle token verification errors
    return next(new ApiError(501, "Error"));
  }

};
exports.getUserID = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId)
    if (!user) return next(new ApiError(409, "Không tồn tại tài khoản này!!"));


    return res.status(200).json(user);
  } catch (error) {
    // Handle token verification errors
    return next(new ApiError(501, "Error"));
  }

};
