const User = require("../models/user_model");

const assignCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const { courses } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { courses },
      { new: true }
    ).populate("courses");

    res.status(200).json({
      message: "Courses assigned successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserCourses = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("courses");

    res.status(200).json(user.courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTeachersByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const teachers = await User.find({
      role: "teacher",
      courses: courseId,
    }).populate("courses");

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  assignCourses,
  getUserCourses,
  getTeachersByCourse,
};