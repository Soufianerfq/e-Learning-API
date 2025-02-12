const User = require("../model/Users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleSignIn = async (req, res) => {
  const { username, pwd } = req.body;

  if (!username || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const user = await User.findOne({ userName: username }).exec();
  console.log(user);

  if (!user) return res.status(401).json({ message: "incorrect username" });

  const match = await bcrypt.compare(pwd, user.password);

  if (match) {
    const roles = Object.values(user.role);
    //creat JWT
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: user.userName,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "600s" }
    );
    const refreshToken = jwt.sign(
      { username: user.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); //for production

    res.json({ accessToken, roles }); //must be stored in memory (state)
  } else res.status(401).json({ message: "incorrect password" });
};

module.exports = {
  handleSignIn,
};
