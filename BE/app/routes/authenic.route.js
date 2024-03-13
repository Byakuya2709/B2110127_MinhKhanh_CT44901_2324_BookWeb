const express = require("express");
const author = require("../middleware/auth.middleware");
const authenic = require("../controllers/authenic.controller");

const router = express.Router();

router.post("/login", authenic.login);
router.post("/register", authenic.register);
router.get(
  "/manager/hiddencontent",
  author.authenticate,
  author.authorize,
  function (req, res) {
    res.send(`Protected route for user with ID: ${req.UserId}`);
  }
);
router.get("/logout", author.authenticate, authenic.logout);
module.exports = router;
