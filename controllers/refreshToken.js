const usersDB = {
    users: require("../model/users.json"),
    setUser: function (datas) {
      this.users = datas;
    },
};

const jwt = require("jsonwebtoken")
require("dotenv").config()

const handleRefreshToken =  (req, res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const user = usersDB.users.find(person => person.refreshToken === refreshToken)
    console.log(user)
    if (!user) return res.sendStatus(403); //forbidden

    //evaulate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) =>{
            console.log(decoded.username)
            if (err || user.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "60s"}
            );
            res.json({accessToken})
        }
    );

}


module.exports= {
    handleRefreshToken
}