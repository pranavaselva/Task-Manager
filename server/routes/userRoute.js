const express = require("express");
const User = require("../db/userSchema");
const bcrypt = require("bcryptjs");
const router = express.Router();

//for siging up
router.post('/signup', async (req, res) => {
  // console.log("Received body:", req.body);
  try {
    const { name, email, password } = req.body;
    console.log(req.body)

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ success: true, data: newUser });
    res.send("post request successfull")
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If login is successful
    res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


module.exports = router;