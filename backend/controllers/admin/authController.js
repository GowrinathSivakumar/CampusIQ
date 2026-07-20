// Import the User model to interact with the MongoDB database
const User = require('../../models/User');

const register = async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, password, role } = req.body;

    // Validate that all required fields are provided
    // Return 400 error if any required field is missing
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Check if a user with the same email already exists in the database
    // This prevents duplicate registrations with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Create a new user in MongoDB
    // Password is saved as-is for now (hashing will be added in next step)
    // Role defaults to 'student' if not provided
    const user = await User.create({
      name,
      email,
      password, // Temporary: saving password without hashing
      role: role || 'student',
    });

    // Return success response with created user data
    // Exclude the password field from the response for security
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
    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    res.status(200).json({
      success: true,
      message: 'Login placeholder - authentication logic not implemented yet',
      data: {
        email,
        password,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Get user placeholder - authentication logic not implemented yet',
      data: {
        id: 'placeholder-id',
        name: 'placeholder-name',
        email: 'placeholder-email',
        role: 'placeholder-role',
      },
    });
  } catch (error) {
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