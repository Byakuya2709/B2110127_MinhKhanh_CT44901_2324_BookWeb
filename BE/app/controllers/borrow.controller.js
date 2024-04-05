const mongoose = require("mongoose");

const User = require("../model/user.model");
const Manager = require("../model/mangager.model")

const ApiError = require("../middleware/api-error");
const BookManager = require("../model/bookManager.model");
const Book = require("../model/book.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config")

exports.getAllTransaction = async (req, res, next) => {
    try {

        // const token = req.header("Authorization");
        // console.log(token)
        // if (!token) {
        //     return next(new ApiError(401, "CẦN ĐĂNG NHẬP ĐỂ THỰC HIỆN CHỨC NĂNG NÀY"));
        // }
        // const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET.token);
        const transactions = await BookManager.find({});
        if (!transactions) return res.json("error")
        else res.status(201).json(transactions);
    } catch (error) {
        return next(new ApiError(500, "Internal Server Error"));
    }
};
exports.getAll = async (req, res, next) => {
    try {

        // const token = req.header("Authorization");
        // console.log(token)
        // if (!token) {
        //     return next(new ApiError(401, "CẦN ĐĂNG NHẬP ĐỂ THỰC HIỆN CHỨC NĂNG NÀY"));
        // }
        // const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET.token);
        const user = req.params.id;
        const transactions = await BookManager.find({ userId: user });
        if (!transactions) return res.json("error")
        else res.status(201).json(transactions);
    } catch (error) {
        return next(new ApiError(500, "Internal Server Error"));
    }
};
exports.borrowBook = async (req, res, next) => {
    try {

        const { bookId, userId, returnDate } = req.body;

        const book = await Book.findById(bookId);
        if (!book) return next(new ApiError(404, "Sách không tồn tại"));
        if (book.available === 0) return next(new ApiError(400, "Sách hiện không có sẵn để mượn"));

        const newBorrow = new BookManager({
            userId: userId,
            bookId: bookId,
            borrowDate: new Date(),
            returnDate: new Date(returnDate)
        });

        await newBorrow.save();

        book.available--;
        await book.save();

        res.status(201).json({ message: "Mượn sách thành công" });
    } catch (error) {
        return next(new ApiError(500, "Internal Server Error"));
    }
};
exports.deleteBorrow = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transaction = await BookManager.findById(id);

        if (!transaction) {
            return next(new ApiError(404, "Giao dịch không tồn tại"));
        }

        // Tăng số lượng sách có sẵn lên 1
        await Book.findByIdAndUpdate(transaction.bookId, { $inc: { available: 1 } });

        // Xóa giao dịch khỏi cơ sở dữ liệu
        await BookManager.findByIdAndDelete(id);

        res.status(200).json({ message: "Xóa giao dịch thành công" });
    } catch (error) {
        return next(new ApiError(500, "Lỗi nội bộ của máy chủ"));
    }
};
exports.updateTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const transaction = await BookManager.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        transaction.status = status;

        await transaction.save();

        // Send a success response
        res.status(200).json({ message: "Transaction status updated successfully" });
    } catch (error) {
        // Handle any errors
        return next(new ApiError(500, "Internal Server Error"));
    }
};
