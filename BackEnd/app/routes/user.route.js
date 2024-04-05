const express = require("express");
const author = require("../middleware/auth.middleware");
const borrow = require("../controllers/borrow.controller")
const book = require('../controllers/book.controller');

const router = express.Router();
const authenic = require("../controllers/authenic.controller");

router.get('/profile', authenic.getUser);

router.get('/book', book.getAllBooks);
router.get('/book/:id', book.getBook);
router.get('/book/borrow/manager/:id', author.authenticate, borrow.getAll);
router.post('/book/borrow', author.authenticate, borrow.borrowBook);
router.delete('/book/borrow/:id', author.authenticate, borrow.deleteBorrow);
module.exports = router;