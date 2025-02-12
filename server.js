require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const verify = require("./middleware/verifyjwt");
const credentials = require("./middleware/credentials");
const connectDB = require("./config/dbConn");

connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use("/", require("./routes/courses"));
app.use("/register", require("./routes/register"));
app.use("/signin", require("./routes/signin"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verify); // any route after this middleware is protected with this JWT

app.use("/course", require("./routes/api/dataHandle"));
app.use("/user", require("./routes/api/usersHandler"));

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(5500, () => console.log("listening on port 5500"));
}); //will listen for a successfull connection with the DB before start listening for client requests
