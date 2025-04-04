const express = require("express");
const Task = require("../db/taskSchema"); // Import Task schema
const authMiddleware = require("../middlewares/jwt"); // Middleware to check authentication
const mongoose = require("mongoose")

const router = express.Router();

// Create a new task
router.post("/create", authMiddleware, async (req, res) => {
    try {
        console.log("Received Request:", req.body);
        console.log("User ID from Token:", req.user);
        const { title, description, priority, dueDate } = req.body;

        // Create task with the logged-in user's ID
        const newTask = new Task({
            title,
            description,
            priority,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            userId: req.user.userId, // Get user ID from authMiddleware
        });

        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error("Task Creation Failed:", error);
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
});


router.put("/update/:id", authMiddleware, async (req, res) => {
    try {
      const taskId = req.params.id;
      console.log("Updating task with ID:", taskId); // Debugging step
  
      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found in DB" });
      }
  
      res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  


  router.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
      const taskId = req.params.id;
  
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get('/', authMiddleware, async(req, res)=>{
    try {
        const userId = await req.user._id;

    const tasks = await Task.find({userId})

    if(!tasks){
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task found", tasks });
    } catch (error) {
        console.error("Error fetching task:", error);
      res.status(500).json({ message: "Server error" });
    }
  })


  module.exports = router;