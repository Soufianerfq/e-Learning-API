const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const verify = require("./middleware/verifyjwt")
const credentials = require('./middleware/credentials');

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json()); 

//middleware for cookies
app.use(cookieParser());

app.use("/", require("./routes/courses"));
app.use("/register", require("./routes/register"))
app.use("/signin", require("./routes/signin"))
app.use("/refresh", require("./routes/refresh"))
app.use("/logout", require("./routes/logout"))

app.use(verify) // any route after this middleware is protected with this JWT 

app.use("/course", require("./routes/api/dataHandle"));


app.listen(5500, () => console.log("listening on port 5500"));
