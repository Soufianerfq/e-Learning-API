const express = require("express");
const router = express.Router();
const registerConroller = require("../controllers/register")


router.post('/', registerConroller.handleNewUser)

module.exports = router;
