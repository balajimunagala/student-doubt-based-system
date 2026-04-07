const express = require("express");
const router = express.Router();

const { createDoubt,getTeacherDoubts,getStudentDoubts } = require("../controllers/doubt_controller");

router.post("/create", createDoubt);
router.get("/teacher/:teacherId", getTeacherDoubts);
router.get("/student/:studentId", getStudentDoubts);

module.exports = router;