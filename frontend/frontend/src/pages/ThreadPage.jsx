import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ThreadPage() {
  const { doubtId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchReplies();
  }, [doubtId]);

  const fetchReplies = async () => {
    try {
      const res = await api.get(`/replies/${doubtId}`);
      console.log(res.data); // debug
      setReplies(res.data?.replies || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendReply = async () => {
    try {
      await api.post(`/replies/${doubtId}`, {
        message,
        senderId: user._id,
      });

      setMessage("");
      fetchReplies();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Discussion Thread</h1>

        <div className="space-y-4">
          {replies.map((reply) => (
            <div
              key={reply._id}
              className="bg-white shadow rounded-2xl p-4"
            >
              <p className="text-sm text-gray-500 mb-2">
                {reply.senderId?.name}
              </p>
              <p>{reply.message}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <input
            className="flex-1 border rounded-xl px-4 py-3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your reply..."
          />
          <button
            onClick={handleSendReply}
            className="px-6 py-3 border rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThreadPage;