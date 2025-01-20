const express = require("express");
const router = express.Router();
const signinConroller = require("../controllers/signIn")


router.post("/", signinConroller.handleSignIn);

module.exports = router;
