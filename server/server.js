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



// ✅ Use userRoutes for handling API requests
app.use("/api", userRoutes); 
app.use("/apis", taskRoutes);

app.get("/get", (req, res) => {
  res.send("Get request successful");
});

app.listen(3000, () => {
  dataBaseConnection();
  console.log("Node app is running on port 3000");
});
