const User = require("../model/Users");

const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken: refreshToken }).exec();
  console.log(user);
  if (!user) return res.sendStatus(403); //forbidden
  //evaulate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log(decoded.username);
    if (err || user.userName !== decoded.username) return res.sendStatus(403);
    const roles = Object.values(user.role);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    res.json({ roles, accessToken });
  });
};

module.exports = {
  handleRefreshToken,
};
