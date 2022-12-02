const express = require("express");
const { loginUser, signupUser } = require("../controllers/userContoller");

const router = express.Router();

// login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

module.exports = router;
