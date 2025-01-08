const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("I AM ALIVE");
});

module.exports = router;
