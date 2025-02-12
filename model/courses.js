const mongoose = require("mongoose");
const schema = mongoose.Schema;

const coursesSchema = new schema({
  id: Number,
  Title: String,
  Thumbnail: String,
  Parag: String,
  Parts: Array,
});

module.exports = mongoose.model("Course", coursesSchema);
