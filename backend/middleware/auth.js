// Import jsonwebtoken for token verification
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    // Initialize token variable
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    // The header format should be: "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Extract the token by splitting the header and taking the second part
      token = req.headers.authorization.split(' ')[1];
    }

    // If token is missing, return 401 Unauthorized response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route - No token provided',
      });
    }

    // Verify the token using jsonwebtoken and JWT_SECRET from environment variables
    // jwt.verify() will throw an error if the token is invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    // This makes the user data available in subsequent middleware and route handlers
    req.user = decoded;

    // Call next() to proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails (invalid token, expired, etc.), return 401 Unauthorized
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route - Invalid or expired token',
    });
  }
};

module.exports = protect;
