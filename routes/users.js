const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/", (req, res) => {
  res.send("working");
});

module.exports = router;
