const usersDB = {
    users: require("../model/users.json"),
    setUser: function (datas) {
      this.users = datas;
    },
};

const FSPromises = require('fs').promises
const path = require("path")

const handleLogout = async (req, res)=>{
    //message to FE: clear out access token from memory (state)
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //successful but no content
    const refreshToken = cookies.jwt;


    //check if the refresh token in the DB
    const user = usersDB.users.find(person => person.refreshToken === refreshToken)
    console.log(user)
    if (!user) {
        res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        return res.sendStatus(204); //successful but no content
    }

    //update the DB, clear out the refresh token
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== user.refreshToken)
    const loggedinUser = {...user, refreshToken: ''}
    usersDB.setUser([...otherUsers, loggedinUser])
    await FSPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    )

    res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.sendStatus(204) //all is well but no content to send 

}


module.exports= {
    handleLogout
}