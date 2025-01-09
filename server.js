const express = require("express");
const app = express();

app.use(express.json());

app.use("/", require("./routes/courses"));

app.use("/course", require("./routes/api/dataHandle"));

app.listen(5500, () => console.log("listening on port 5500"));
