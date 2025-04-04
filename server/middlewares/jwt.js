const jwt = require("jsonwebtoken");
const User = require('../db/userSchema')

const verifyToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "Access denied, no token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token part

    // console.log(token)

    try {
        console.log()
        const {userId} = jwt.verify(token, process.env.JWT_KEY);

        const currentUser = await User.findById(userId);

        console.log(decoded, "decoded")
        req.user = currentUser; 
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = verifyToken;