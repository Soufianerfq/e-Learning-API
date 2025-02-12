const User = require("../model/Users");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, pwd } = req.body;
  console.log(req.body);

  if (!username || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const duplicate = await User.findOne({ userName: username }).exec();

  if (duplicate)
    return res.status(409).json({ message: "user already exists" });
  try {
    const hashedPWD = await bcrypt.hash(pwd, 10);

    const newuser = await User.create({
      userName: username,
      password: hashedPWD,
      role: {
        User: 2001,
      },
    });

    console.log(newuser);
    res.status(201).json({ message: `user ${newuser.username} registered` });
  } catch (err) {
    res.status(500).json({ message: `internal error ${err}` });
  }
};

module.exports = {
  handleNewUser,
};
