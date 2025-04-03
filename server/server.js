const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dataBaseConnection = require("./db/connection");
const userRoutes = require("./routes/userRoute"); // ✅ Import user routes

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Allow frontend origin
  credentials: true,  // Allow cookies & authentication headers
}));

app.use(express.json());
app.use("/api",userRoutes);

// ✅ Use userRoutes for handling API requests
app.use("/api", userRoutes); // ✅ Now, "/api/signup" will work

app.get("/get", (req, res) => {
  res.send("Get request successful");
});

app.listen(3000, () => {
  dataBaseConnection();
  console.log("Node app is running on port 3000");
});
