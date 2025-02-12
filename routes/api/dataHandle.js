const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/controller");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/veirfyRoles")


router
  .route("/")
  .get(controllers.getCourses)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),controllers.addCourse)
  .put((req, res) => {
    res.send("put request successful");
  })
  .delete(verifyRoles(ROLES_LIST.Admin),controllers.deleteCourse);

module.exports = router;
