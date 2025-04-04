const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dataBaseConnection = require("./db/connection");
const userRoutes = require("./routes/userRoute"); // ✅ Import user routes
const taskRoutes  = require("./routes/taskRoute")

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // Allow frontend origin
  credentials: true,  // Allow cookies & authentication headers
}));

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

// ✅ Use userRoutes for handling API requests
app.use("/api/auth", userRoutes); 
app.use("/api/task", taskRoutes);


app.get("/get", (req, res) => {
  res.send("Get request successful");
});

app.listen(3000, () => {
  dataBaseConnection();
  console.log("Node app is running on port 3000");
});
