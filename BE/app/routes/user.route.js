const express = require("express");
const author = require("../middleware/auth.middleware");

const book = require('../controllers/book.controller');

const router = express.Router();
const authenic = require("../controllers/authenic.controller");

router.get('/profile', authenic.getUser);
module.exports = router;