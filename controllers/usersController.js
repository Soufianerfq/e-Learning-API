const User = require("../model/Users");

const getUser = async (req, res) => {
  const response = await User.find();
  res.json(response);
};

const deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({ userName: req.body.username });

  res.json(await User.find());
};

const editRoles = async (req, res) => {
  const user = await User.findOne({ userName: req.body.username });
  const roles = req.body.roles;
  user.role = roles;
  await user.save();
  console.log(user);
};

module.exports = { getUser, deleteUser, editRoles };
