const express = require("express");
const User = require("../db/userSchema");
const bcrypt = require("bcryptjs");
const router = express.Router();  
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

module.exports = router;