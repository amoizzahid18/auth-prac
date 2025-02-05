const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    let isPasswordValid = false;
    if (existingUser) {
      isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
    }
    if (!existingUser || !isPasswordValid) {
      return res.status(400).json({
        message: `Invalid credentials`,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1m" }
    );
    res.status(200).json({
        message: "Login successfull",
        success: true,
        jwtToken,
        email: existingUser.email,
        name: existingUser.name, 
    });
  } catch (error) {
    res.status(500).json({
        message: "Internal server error",
        error: error.message,
        success: false
    });
  }
};
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: `User with this '${email}' already exists, go to Login page`,
        success: false,
      });
    }
    let newUser = { name, email, password };
    newUser.password = await bcrypt.hash(password, 10);
    const user = new User(newUser);
    await user.save();
    res.status(201).json({
      message: `Signup successfull`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error`,
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  login,
  signup,
};
