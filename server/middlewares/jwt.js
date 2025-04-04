const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "Access denied, no token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token part

    // console.log(token)

    try {
        console.log()
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        console.log(decoded, "decoded")
        req.user = decoded; // Attach decoded data to req.user
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = verifyToken;