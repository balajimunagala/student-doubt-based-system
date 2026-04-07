import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [doubts, setDoubts] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    fetchTeacherDoubts();
  }, []);

  const fetchTeacherDoubts = async () => {
    try {
      const res = await api.get(`/doubts/teacher/${user._id}`);
      setDoubts(res.data.doubts);
    } catch (error) {
      console.error(error);
    }
  };

  // derive unique course cards from fetched doubts
  const courses = useMemo(() => {
    const map = new Map();

    doubts.forEach((doubt) => {
      if (doubt.courseId?._id) {
        map.set(doubt.courseId._id, doubt.courseId);
      }
    });

    return Array.from(map.values());
  }, [doubts]);

  const filteredDoubts = selectedCourseId
    ? doubts.filter(
        (doubt) => doubt.courseId?._id === selectedCourseId
      )
    : [];

  const handleReply = async (doubtId) => {
    try {
      await api.post(`/replies/${doubtId}`, {
        senderId: user._id,
        message: replyText[doubtId],
      });

      alert("Reply sent successfully");

      setReplyText((prev) => ({
        ...prev,
        [doubtId]: "",
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to send reply");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Welcome, {user.name}
        </h1>

        {/* Course Cards */}
        <h2 className="text-xl font-semibold mb-4">
          Your Teaching Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => setSelectedCourseId(course._id)}
              className="bg-white shadow rounded-2xl p-6 cursor-pointer hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold">
                {course.courseName}
              </h3>
              <p className="text-gray-500">{course.courseCode}</p>
            </div>
          ))}
        </div>

        {/* Doubts for selected course */}
        {selectedCourseId && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Doubts for selected course
            </h2>

            <div className="space-y-6">
              {filteredDoubts.map((doubt) => (
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
                    Student: {doubt.studentId?.name}
                  </p>

                  <p className="text-sm text-blue-600 mt-4">
                    Tap to open discussion →
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;