const mongoose = require("mongoose");
const Book = require("../model/book.model");
// const ApiError = require("../middleware/api-error");
// const publisher = require("../model/publisher.model");
// const bookManager = require("../model/bookManager.model");

// Get all books created by the user
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// exports.getAllBooks = async (req, res) => {
//     const { titiles } = req.body;
//     try {
//         const books = await Book.find({ titile: titiles });
//         return res.status(200).json(books);
//     } catch (error) {
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };


// exports.getBooks = async (req, res) => {
//     const creatorId = req.UserId;
//     try {
//         const books = await bookManager.find({ userId: userId }).populate({
//             path: 'bookId',
//             model: 'Book'
//         });
//         return res.status(200).json(books);
//     } catch (error) {
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// Get a single book by its ID


// Create a new book
exports.createBook = async (req, res) => {
    const { title, price, publisher, publicationDate, available } = req.body;
    const creatorId = req.UserId;

    try {
        const newBook = await Book.create({
            title,
            price,
            publisher,
            publicationDate,
            available,

        });
        return res.status(201).json(newBook);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateBook = async (req, res) => {
    const bookId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId, updateFields, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(updatedBook);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.deleteBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
