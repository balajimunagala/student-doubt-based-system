const express = require("express");
const router = express.Router();

const {
  assignCourses,
  getUserCourses,
  getTeachersByCourse
} = require("../controllers/user_controller");

router.put("/:id/assign-courses", assignCourses);
router.get("/:id/courses", getUserCourses);
router.get("/course/:courseId/teachers", getTeachersByCourse);

module.exports = router;