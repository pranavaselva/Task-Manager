const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

function dataBaseConnection() {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("✅ MongoDB connected successfully!");
        })
        .catch((err) => {
            console.error("❌ MongoDB connection failed:", err.message);
        });
}

module.exports = dataBaseConnection;
