const express = require("express");
const author = require("../middleware/auth.middleware");

const book = require('../controllers/book.controller');

const router = express.Router();


router.post('/book/new', author.authenticate, author.authorize, book.createBook);
router.post('/book/update/:id', author.authenticate, author.authorize, book.updateBook);
router.delete('/book/:id', author.authenticate, author.authorize, book.deleteBook);

router.get('/book',book.getAllBooks);

router.get('/book/:id',book.getBook);

const publisher = require('../controllers/publisher.controler');

router.get("/publisher", publisher.getAllPublishers)

router.get("/publisher/:id", publisher.getPublisherById)

router.post('/publisher/new', author.authenticate, author.authorize, publisher.createPublisher);
router.post('/publisher/update/:id', author.authenticate, author.authorize, publisher.updatePublisher);
router.delete('/publisher/:id', author.authenticate, author.authorize, publisher.deletePublisher);


module.exports = router;