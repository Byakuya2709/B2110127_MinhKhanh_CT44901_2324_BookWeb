const mongoose = require("mongoose");
const Book = require("../model/book.model");
const ApiError = require('../middleware/api-error');


exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find({});
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getBook = async (req, res, next) => {
    const bookId = req.params.id;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not founds" });
        }
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.createBook = async (req, res, next) => {
    const { title, price, publisher, publicationDate, available } = req.body;
    console.log(title, price, publisher, publicationDate, available);
    const existingBook = await Book.findOne({ title, publisher });
    if (existingBook) {
        return next(new ApiError(400, "Sách này đã tồn tại"));
    }

    try {

        const newBook = await Book.create({ title, price, publisher, publicationDate, available });
        return res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error);
        return next(new ApiError(500, "Internal Server Error"));
    }
};



exports.updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const { title, price, publisher, publicationDate, available } = req.body;
        const isExistingBook = await Book.findOne({ title: { $regex: new RegExp(title, 'i') } });

        // if (isExistingBook) {
        //     return next(new ApiError(400, "Sách này đã tồn tại Hoặc trùng với tên cũ"));
        // }

        const updatedBook = await Book.findByIdAndUpdate(bookId, { title, price, publisher, publicationDate, available });

        if (!updatedBook) {
            return next(new ApiError(500, "KHÔNG THỂ CẬP NHẬT SÁCH NÀY."));
        }
        res.status(201).send({ message: "success" })
    } catch (error) {
        // console.error(error);
        return next(new ApiError(500, "Internal Server Error"));
    }
};


exports.deleteBook = async (req, res, next) => {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) return next(new ApiError(401, 'Không tìm thấy sách này.'));
    try {
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Không tìm thấy sách này.' });
        }
        return res.status(201).json({ message: "success" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
