const Course = require("../models/course_model");

const createCourse = async (req, res) => {
  try {
    const { courseName, courseCode } = req.body;

    const existingCourse = await Course.findOne({ courseCode });

    if (existingCourse) {
      return res.status(400).json({
        message: "Course already exists",
      });
    }

    const course = await Course.create({
      courseName,
      courseCode,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
  createCourse,
  getAllCourses,
};