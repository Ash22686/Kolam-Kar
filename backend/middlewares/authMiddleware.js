// backend/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Good practice to ensure process.env is loaded

module.exports = function (req, res, next) {
  // 1. Get the 'Authorization' header
  const authHeader = req.header("Authorization");

  // 2. Check if the header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "No token or invalid token format, authorization denied" });
  }

  try {
    // 3. Extract the token by removing 'Bearer ' from the start
    const token = authHeader.split(" ")[1];

    // 4. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};