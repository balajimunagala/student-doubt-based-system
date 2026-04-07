const Doubt = require("../models/doubt_model");
const User = require("../models/user_model");

const createDoubt = async (req, res) => {
  try {
    const {
      studentId,
      teacherId,
      courseId,
      title,
      description,
    } = req.body;

    const teacher = await User.findOne({
      _id: teacherId,
      role: "teacher",
      courses: courseId,
    });

    if (!teacher) {
      return res.status(400).json({
        message: "Teacher is not assigned to this course",
      });
    }

    const doubt = await Doubt.create({
      studentId,
      teacherId,
      courseId,
      title,
      description,
    });

    res.status(201).json({
      message: "Doubt sent successfully",
      doubt,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTeacherDoubts = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const doubts = await Doubt.find({
      teacherId,
    })
      .populate("studentId", "name email")
      .populate("courseId", "courseName courseCode")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Teacher doubts fetched successfully",
      doubts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStudentDoubts = async (req, res) => {
  try {
    const { studentId } = req.params;

    const doubts = await Doubt.find({
      studentId,
    })
      .populate("teacherId", "name email")
      .populate("courseId", "courseName courseCode")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Student doubts fetched successfully",
      doubts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createDoubt, getTeacherDoubts, getStudentDoubts };