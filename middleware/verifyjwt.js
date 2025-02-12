const jwt = require("jsonwebtoken")

const verify =  (req, res, next) => {
    const authHeader = req.headers.authorization || req.header.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.userInfo.userName;
            req.roles = decoded.userInfo.roles;
            next();
        }
    );
}


module.exports = verify