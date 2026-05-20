import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: username,
      email,
      role,
      password: hashedPassword,
      isVerified: true, // direct verification
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
        username: newUser.name,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user;

    if (username) {
      user = await User.findOne({ name: username });
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.json({
        success: false,
        message: "Incorrect email or username",
      });
    }

    let isPasswordValid = false;

    // old plain-text password migration
    if (user.password === password) {
      isPasswordValid = true;

      user.password = await bcrypt.hash(password, 10);
      await user.save();
    } else {
      isPasswordValid = await bcrypt
        .compare(password, user.password)
        .catch(() => false);
    }

    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Logged in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const sendResetOtp = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
