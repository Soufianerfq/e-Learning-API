const express = require("express");
const router = express.Router();
const userController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/veirfyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), userController.getUser)
  .put(verifyRoles(ROLES_LIST.Admin), userController.editRoles)
  .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser);

module.exports = router;
