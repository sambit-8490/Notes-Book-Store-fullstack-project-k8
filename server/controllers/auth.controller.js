import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/email.js";

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function createAndSendOtp(email, name, type = 'VERIFICATION') {
  const otp = generateOTP();

  // Remove any existing OTPs for this email and type
  await Otp.deleteMany({ email, type });

  // Create new OTP
  await Otp.create({ email, otp, type });

  let subject = "";
  let html = "";

  if (type === 'VERIFICATION') {
    subject = "Verify Your Account - Blogify";
    html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; padding: 20px; }
          .container { max-width: 600px; background: #ffffff; padding: 40px; margin: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); text-align: center; }
          .logo { font-size: 24px; font-weight: bold; color: #333; margin-bottom: 20px; }
          .logo span { color: #43ABE8; }
          .otp-box { background: #f0f4f8; padding: 15px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1F305E; margin: 30px 0; display: inline-block; }
          .message { color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
          .footer { font-size: 12px; color: #999; margin-top: 40px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Blog<span>ify</span></div>
          <h2>Verify Your Email</h2>
          <p class="message">Hello <strong>${name}</strong>,<br/>Use the code below to verify your email address.</p>
          <div class="otp-box">${otp}</div>
          <p class="message">This code expires in 10 minutes.</p>
          <div class="footer">© ${new Date().getFullYear()} Blogify. All rights reserved.</div>
        </div>
      </body>
      </html>
    `;
  } else if (type === 'RESET_PASSWORD') {
    subject = "Reset Your Password - Blogify";
    html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; padding: 20px; }
          .container { max-width: 600px; background: #ffffff; padding: 40px; margin: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); text-align: center; }
          .logo { font-size: 24px; font-weight: bold; color: #333; margin-bottom: 20px; }
          .logo span { color: #43ABE8; }
          .otp-box { background: #f0f4f8; padding: 15px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1F305E; margin: 30px 0; display: inline-block; }
          .message { color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
          .footer { font-size: 12px; color: #999; margin-top: 40px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Blog<span>ify</span></div>
          <h2>Reset Password</h2>
          <p class="message">Hello <strong>${name}</strong>,<br/>You requested a password reset. Use the code below to proceed.</p>
          <div class="otp-box">${otp}</div>
          <p class="message">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
          <div class="footer">© ${new Date().getFullYear()} Blogify. All rights reserved.</div>
        </div>
      </body>
      </html>
    `;
  }

  await sendVerificationEmail(email, subject, html);
}

export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.json({ success: false, message: "Email already exists" });
      } else {
        // Resend OTP for unverified account
        const hashedPassword = await bcrypt.hash(password, 10);

        existingUser.name = username;
        existingUser.password = hashedPassword;
        existingUser.role = role;
        await existingUser.save();

        await createAndSendOtp(email, username, 'VERIFICATION');

        return res.json({
          success: true,
          message: "Account exists but not verified. New OTP sent.",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: username,
      email,
      role,
      password: hashedPassword,
      isVerified: false,
    });

    await newUser.save();
    await createAndSendOtp(email, username, 'VERIFICATION');

    res.json({
      success: true,
      message: "User created. OTP sent to email.",
    });

  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
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
      return res.json({ success: false, message: "Incorrect email or username" });
    }

    let isPasswordValid = false;
    // Migration logic
    if (user.password === password) {
      isPasswordValid = true;
      user.password = await bcrypt.hash(password, 10);
      await user.save();
    } else {
      isPasswordValid = await bcrypt.compare(password, user.password).catch(() => false);
    }

    if (!isPasswordValid) return res.json({ success: false, message: "Incorrect password" });

    if (!user.isVerified) {
      await createAndSendOtp(user.email, user.name, 'VERIFICATION');
      return res.json({
        success: false,
        message: "Email not verified. A verification OTP has been sent to your email.",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      message: "Logged in successfully",
      data: { token, user },
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found." });

    // Find the OTP in the separate collection
    const validOtp = await Otp.findOne({ email, otp, type: 'VERIFICATION' });

    if (!validOtp) {
      return res.json({ success: false, message: "Invalid or expired OTP." });
    }

    user.isVerified = true;
    await user.save();

    // Clean up used OTP
    await Otp.deleteOne({ _id: validOtp._id });

    // Auto-login the user by generating a token
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({
      success: true,
      message: "Email verified successfully!",
      data: { token, user } // Return token for auto-login
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.isVerified) {
      return res.json({ success: false, message: "Invalid user or already verified." });
    }

    await createAndSendOtp(email, user.name, 'VERIFICATION');
    res.json({ success: true, message: "OTP resent successfully." });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "Email not registered" });

    await createAndSendOtp(email, user.name, 'RESET_PASSWORD');
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const validOtp = await Otp.findOne({ email, otp, type: 'RESET_PASSWORD' });

    if (!validOtp) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await Otp.deleteOne({ _id: validOtp._id });

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
