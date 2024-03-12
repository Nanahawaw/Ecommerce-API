const UserErrors = require("./ErrorHandlers");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookie.accessToken;
  if (!token) return res.status(400).json({ error: UserErrors.UNAUTHORIZED });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Forbidden");
  });
  req.user = user;
  next();
};

module.exports = verifyToken;
