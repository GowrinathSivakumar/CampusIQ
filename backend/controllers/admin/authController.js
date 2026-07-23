// Import the User model to interact with the MongoDB database
const User = require('../../models/User');
// Import bcryptjs for password comparison
const bcrypt = require('bcryptjs');
// Import jsonwebtoken for JWT generation
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    // Step 1: Extract user data from the request body
    // Get name, email, password, and role from the incoming request
    const { name, email, password, role } = req.body;

    // Step 2: Validate that all required fields are provided
    // Return 400 Bad Request error if any required field is missing
    // This ensures we don't process incomplete registration data
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Step 3: Check if a user with the same email already exists in the database
    // This prevents duplicate registrations with the same email address
    // findOne() returns the user document if found, or null if not found
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Step 4: Hash the password using bcrypt before saving
    // bcrypt.hash() creates a one-way hash that cannot be reversed
    // The salt rounds (12) determine the computational cost - higher is more secure
    // This ensures passwords are never stored in plain text in the database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Step 5: Create a new user in MongoDB with the hashed password
    // Store the hashed password instead of the plain text password
    // Role defaults to 'student' if not provided in the request
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Store the hashed password, not plain text
      role: role || 'student',
    });

    // Step 6: Return success response with created user data
    // Exclude the password field from the response for security
    // Even though it's hashed, we never send password data in API responses
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    // Step 7: Handle any unexpected errors (database errors, validation errors, etc.)
    // Return 500 Internal Server Error with the error message
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Validate that both email and password are provided
    // Return 400 error if either field is missing
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find the user by email in the database
    // This will return the user document if found, or null if not found
    const user = await User.findOne({ email });

    // Check if user exists
    // If user doesn't exist, return 400 with generic error message
    // Using generic message for security (doesn't reveal if email exists)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare the entered password with the hashed password in the database
    // bcrypt.compare() returns true if passwords match, false otherwise
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, return 400 with generic error message
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Password matches - generate JWT token
    // Create payload with user's _id and role
    const payload = {
      id: user._id,
      role: user.role,
    };

    // Sign the token using JWT_SECRET from environment variables
    // Set expiry to 7 days (7 * 24 * 60 * 60 seconds)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Return success response with token and user data
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    // Get the user ID from req.user (set by the authentication middleware)
    // The middleware decoded the JWT and attached the user info to req.user
    const userId = req.user.id;

    // Find the user by ID in MongoDB
    // Use .select('-password') to exclude the password field from the result
    const user = await User.findById(userId).select('-password');

    // Check if user exists
    // If user not found, return 404 Not Found response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Return the user's profile data
    res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { name, email } = req.body;

    res.status(200).json({
      success: true,
      message: 'Update settings placeholder - authentication logic not implemented yet',
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateSettings,
};