const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/controller");
const verify = require("../../middleware/verifyjwt")

router
  .route("/")
  .get(verify ,controllers.getCourses)
  .post(controllers.addCourse)
  .put((req, res) => {
    res.send("put request successful");
  })
  .delete(controllers.deleteCourse);

module.exports = router;
