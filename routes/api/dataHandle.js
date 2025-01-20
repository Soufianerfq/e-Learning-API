const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/controller");


router
  .route("/")
  .get(controllers.getCourses)
  .post(controllers.addCourse)
  .put((req, res) => {
    res.send("put request successful");
  })
  .delete(controllers.deleteCourse);

module.exports = router;
