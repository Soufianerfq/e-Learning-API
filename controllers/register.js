const usersDB = {
  users: require("../model/users.json"),
  setUser: function (datas) {
    this.users = datas;
  },
};

const bcrypt = require("bcrypt");
const path = require("path");
const fsPromise = require("fs").promises;

const handleNewUser = async (req, res) => {
  const { username, pwd } = req.body;

  if (!username || !pwd)
    return res.status(400).json({ "message": "Username and password are required." });

  const duplicate = usersDB.users.find((person) => person.username === username);

  if (duplicate) return res.status(409).json({ "message": "user already exists" });
  try {
    const hashedPWD = await bcrypt.hash(pwd, 10);
    const newUser = {
        username: username,
        passWord: hashedPWD
    }
    usersDB.setUser([...usersDB.users, newUser]);
    await fsPromise.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(usersDB.users)
    )

    console.log(newUser)
    res.status(201).json({"message":`user ${newUser.username} registered`})
  } catch (err) {
    res.status(500).json({ "message": `internal error ${err}` });
  }
};


module.exports = {
    handleNewUser
}