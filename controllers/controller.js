const data = {
  courses: require("../model/lessons.json"),
  setCourses: function (data) {
    this.courses = data;
  },
};

const getCourses = (req, res) => {
  res.json(data.courses);
};

module.exports = {
  getCourses,
};
