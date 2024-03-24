const UserErrors = require('./ErrorHandlers');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(400).json({ error: UserErrors.UNAUTHORIZED });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json('Forbidden');

    req.user = decoded;
    next();
  });
};

const authorizedAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ error: UserErrors.UNAUTHORIZED });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { verifyToken, authorizedAdmin };
