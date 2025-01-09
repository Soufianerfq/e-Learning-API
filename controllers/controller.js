const data = {
  courses: require("../model/lessons.json"),
  setCourses: function (data) {
    this.courses = data;
  },
};

const getCourses = (req, res) => {
  res.json(data.courses);
};

const addCourse = (req, res) => {
  const newCourse = {
    id: data.courses?.length ? data.courses[data.courses.length - 1].id + 1 : 1,
    Title: req.body.title,
    Thumbnail: req.body.Thumbnail,
    Parag: req.body.Parag,
  };

  data.setCourses([...data.courses, newCourse]);
  res.status(203).json(data.courses);
};

const deleteCourse = (req, res) => {
  const course = data.courses.find((crs) => crs.id == parseInt(req.body.id));

  if (!course) {
    return res
      .status(400)
      .json({ message: `course ID ${req.body.id} not found` });
  }

  const newData = data.courses.filter(
    (crs) => crs.id !== parseInt(req.body.id)
  );
  data.setCourses([...newData]);
  res.status(203).json(data.courses);
};

module.exports = {
  getCourses,
  addCourse,
  deleteCourse,
};
