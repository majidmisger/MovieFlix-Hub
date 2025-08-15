const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log("🚀 ~ req.header:", req.header('Authorization'));
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;
    next();
  } catch (error) {
    console.log("🚀 ~ error:", error)
    res.status(401).json({ message: 'Invalid token' });
  }
};
