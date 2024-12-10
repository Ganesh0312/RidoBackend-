const express = require("express");
const {
  register,
  login,
  getUserByEmail,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getuser/:useremail", getUserByEmail);

module.exports = router;
