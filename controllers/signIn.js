const usersDB = {
    users: require("../model/users.json"),
    setUser: function (datas) {
      this.users = datas;
    },
};

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const FSpromises = require("fs").promises
const path = require("path")
require("dotenv").config()

const handleSignIn = async (req, res)=>{
    const {username, pwd} = req.body;
    
    if (!username || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const user = usersDB.users.find(person => person.username === username)

    if (!user) return res.status(401).json({"message": "incorrect username"})

      const match = await bcrypt.compare(pwd, user.passWord)

      if(match){ 
        //creat JWT
        const accessToken = jwt.sign(
          {"username": user.username},
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn: "60s"}
        );
        const refreshToken = jwt.sign(
          {"username": user.username},
          process.env.REFRESH_TOKEN_SECRET,
          {expiresIn: "1d"}
        );

        //saving refresh token with logged in user
        const otherUsers = usersDB.users.filter(person => person.username !== user.username)
        const loggedinUser = {...user,refreshToken}
        usersDB.setUser([...otherUsers, loggedinUser])
        await FSpromises.writeFile(
          path.join(__dirname, '..', 'model', 'users.json'),
          JSON.stringify(usersDB.users)
        )
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
        res.json({accessToken}); //must be stored in memory (state)

      }else (res.status(401).json({"message": "incorrect password"}))

  }


module.exports= {
    handleSignIn
}