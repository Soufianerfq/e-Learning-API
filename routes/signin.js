const express = require("express");
const router = express.Router();
const signinConroller = require("../controllers/signIn")
const verify = require("../middleware/verifyjwt")


router.post("/", signinConroller.handleSignIn);

module.exports = router;
