const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    
  const token = req.header('auth-token');

  // Check if a token is provided in the request headers
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using your secret key from the configuration
    const decoded = jwt.verify(token,"BlogApp")

    // Attach the decoded user information to the request object
    req.userId = decoded.userId;

    // Continue with the next middleware
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
}

module.exports = {auth}
