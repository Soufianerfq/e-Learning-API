const mongoose = require("mongoose");
const schema = mongoose.Schema;


const userSchema = new schema({
  userName: {
    type: String,
    required: true,
  },
  role: {
    Admin: Number,
    User: Number,
    Editor: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});


module.exports = mongoose.model("User", userSchema)