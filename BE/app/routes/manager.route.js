const express = require("express");
const author = require("../middleware/auth.middleware");
const book = require('../controllers/book.controller');

const router = express.Router();
//Profile
const authenic = require("../controllers/authenic.controller");
router.get('/profile', authenic.getManager);

// BOOK
router.post('/book/new', author.authenticate, author.authorize, book.createBook);
router.post('/book/update/:id', author.authenticate, author.authorize, book.updateBook);
router.delete('/book/:id', author.authenticate, author.authorize, book.deleteBook);


router.get('/book', book.getAllBooks);

router.get('/book/:id', book.getBook);


// NXB
const publisher = require('../controllers/publisher.controler');

router.get("/publisher", publisher.getAllPublishers)

router.get("/publisher/:id", publisher.getPublisherById)

router.post('/publisher/new', author.authenticate, author.authorize, publisher.createPublisher);
router.post('/publisher/update/:id', author.authenticate, author.authorize, publisher.updatePublisher);
router.delete('/publisher/:id', author.authenticate, author.authorize, publisher.deletePublisher);

// quản lý mượn sách
const borrow = require("../controllers/borrow.controller")
router.get('/borrow', borrow.getAllTransaction);
router.patch('/borrow/update/:id', borrow.updateTransaction);
router.get('/user/:id', authenic.getUserID);
router.delete('/book/borrow/:id', author.authenticate, author.authorize, borrow.deleteBorrow);

module.exports = router;