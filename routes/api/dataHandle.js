const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/controller");

router
  .route("/")
  .get(controllers.getCourses)
  .post((req, res) => {
    res.send("post request successful");
  })
  .put((req, res) => {
    res.send("put request successful");
  })
  .delete((req, res) => {
    res.send("delete request successful");
  });

module.exports = router;
