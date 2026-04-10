const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth_routes");
const courseRoutes = require("./routes/course_routes");
const userRoutes = require("./routes/user_routes");
const doubtRoutes = require("./routes/doubt_routes");
const replyRoutes = require("./routes/reply_routes");


const app = express();

app.use(cors(
        {
        origin: [
        "http://localhost:5173",
        "https://student-doubt-based-system.vercel.app"
    ],
    credentials: true
    }
));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doubts", doubtRoutes);
app.use("/api/replies", replyRoutes);

module.exports = app;