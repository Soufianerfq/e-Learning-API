const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use("/", require("./routes/courses"));

// built-in middleware for json 
app.use(express.json()); 

//middleware for cookies
app.use(cookieParser());

app.use("/course", require("./routes/api/dataHandle"));
app.use("/register", require("./routes/register"))
app.use("/signin", require("./routes/signin"))

app.listen(5500, () => console.log("listening on port 5500"));
