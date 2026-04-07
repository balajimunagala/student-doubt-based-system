const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
} = require("../controllers/course_controller");

router.post("/create", createCourse);
router.get("/", getAllCourses);

module.exports = router;