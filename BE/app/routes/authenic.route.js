const express = require("express");
// const author = require("../middleware/auth.middleware");
const authenic = require("../controllers/authenic.controller");

const router = express.Router();

router.post("/login", authenic.login);
router.post("/loginadmin", authenic.loginAdmin);
router.post("/register", authenic.register);

// router.get("/logout", author.authenticate, authenic.logout);
module.exports = router;
