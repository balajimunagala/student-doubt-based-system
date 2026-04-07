import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [sentDoubts, setSentDoubts] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchStudentCourses();
    fetchStudentDoubts();
  }, []);

  const fetchStudentCourses = async () => {
    try {
      const res = await api.get(`/users/student/${user._id}/courses`);
      setCourses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudentDoubts = async () => {
    try {
      const res = await api.get(`/doubts/student/${user._id}`);
      setSentDoubts(res.data.doubts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCourseClick = async (course) => {
    setSelectedCourse(course);
    setSelectedTeacher(null);

    try {
      const res = await api.get(`/users/course/${course._id}/teachers`);
      setTeachers(res.data.teachers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendDoubt = async () => {
    if (!selectedCourse || !selectedTeacher) {
      alert("Please select course and teacher");
      return;
    }

    try {
      await api.post("/doubts/create", {
        studentId: user._id,
        teacherId: selectedTeacher._id,
        courseId: selectedCourse._id,
        title,
        description,
      });

      alert("Doubt sent successfully");

      setTitle("");
      setDescription("");

      await fetchStudentDoubts();
    } catch (error) {
      console.error(error);
      alert("Failed to send doubt");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Welcome, {user.name}
        </h1>

        {/* Course Cards */}
        <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => handleCourseClick(course)}
              className="bg-white shadow rounded-2xl p-6 cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">
                {course.courseName}
              </h3>
              <p className="text-gray-500">{course.courseCode}</p>
            </div>
          ))}
        </div>

        {/* Teacher Cards */}
        {selectedCourse && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Teachers for {selectedCourse.courseName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {teachers.map((teacher) => (
                <div
                  key={teacher._id}
                  onClick={() => setSelectedTeacher(teacher)}
                  className={`bg-white shadow rounded-2xl p-6 cursor-pointer hover:shadow-lg transition ${
                    selectedTeacher?._id === teacher._id
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold">
                    {teacher.name}
                  </h3>
                  <p className="text-gray-500">{teacher.email}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Doubt Form */}
        {selectedTeacher && (
          <div className="bg-white shadow rounded-2xl p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Ask {selectedTeacher.name}
            </h2>

            <input
              className="w-full border rounded-lg px-4 py-3 mb-4"
              placeholder="Doubt title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full border rounded-lg px-4 py-3 mb-4"
              rows="5"
              placeholder="Describe your doubt"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={handleSendDoubt}
              className="px-6 py-3 border rounded-lg"
            >
              Send Doubt
            </button>
          </div>
        )}

        {/* Sent Doubts */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Your Sent Doubts
          </h2>

          <div className="space-y-4">
            {sentDoubts.map((doubt) => (
              <div
                key={doubt._id}
                onClick={() => navigate(`/thread/${doubt._id}`)}
                className="bg-white shadow rounded-2xl p-6 cursor-pointer hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">
                  {doubt.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {doubt.description}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Teacher: {doubt.teacherId?.name}
                </p>

                <p className="text-sm text-blue-600 mt-4">
                  Tap to open discussion →
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;