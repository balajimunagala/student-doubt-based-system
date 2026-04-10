require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const User = require("./models/user_model");
require("node:dns").setServers(["8.8.8.8", "1.1.1.1"]);


connectDB()

const PORT = process.env.PORT || 5000;



  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});