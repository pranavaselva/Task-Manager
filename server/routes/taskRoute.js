const express = require("express");
const Task = require("../db/taskSchema"); // Import Task schema
const authMiddleware = require("../middlewares/jwt"); // Middleware to check authentication

const router = express.Router();

// Create a new task
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        // Create task with the logged-in user's ID
        const newTask = new Task({
            title,
            description,
            priority,
            dueDate,
            userId: req.user.id, // Get user ID from authMiddleware
        });

        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
});

module.exports = router;
