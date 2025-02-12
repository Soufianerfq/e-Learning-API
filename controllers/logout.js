const User = require("../model/Users")

const handleLogout = async (req, res)=>{
    //message to FE: clear out access token from memory (state)
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //successful but no content
    const refreshToken = cookies.jwt;


    //check if the refresh token in the DB
    const user = await User.findOne({refreshToken: refreshToken}).exec();
    console.log(user)
    if (!user) {
        res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        return res.sendStatus(204); //successful but no content
    }

    //update the DB, clear out the refresh token
    user.refreshToken = "";
    await user.save();

    res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.sendStatus(204) //all is well but no content to send 

}


module.exports= {
    handleLogout
}