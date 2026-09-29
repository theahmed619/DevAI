import sendMail from "../middlewares/sendMail.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Please enter your email address",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.Jwt_sec, {
      expiresIn: "5d",
    });

    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Login controller error:", error);
    res.status(500).json({
      message: "An error occurred while signing in. Please try again.",
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;

    if (!otp || !verifyToken) {
      return res.status(400).json({
        message: "OTP and verification token are required",
      });
    }

    let verify;
    try {
      verify = jwt.verify(verifyToken, process.env.Activation_sec);
    } catch (jwtErr) {
      return res.status(400).json({
        message:
          jwtErr.name === "TokenExpiredError"
            ? "OTP Expired. Please request a new code."
            : "Invalid verification session. Please sign in again.",
      });
    }

    if (verify.otp !== Number(otp)) {
      return res.status(400).json({
        message: "Incorrect OTP. Please check and try again.",
      });
    }

    const token = jwt.sign({ _id: verify.user._id }, process.env.Jwt_sec, {
      expiresIn: "5d",
    });

    res.json({
      message: "Logged in successfully",
      user: verify.user,
      token,
    });
  } catch (error) {
    console.error("Verify user error:", error);
    res.status(500).json({
      message: "Verification failed. Please try again.",
    });
  }
};

// --- THIS FUNCTION IS NEW ---
// It is INSECURE and trusts the frontend
export const googleAuth = async (req, res) => {
  try {
    // 1. Get email and name directly from req.body
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        message: "Email and Name are required",
      });
    }

    // 2. Find user by email
    let user = await User.findOne({ email });

    if (user) {
      // User exists. Update their name if it's missing.
      user.name = user.name || name;
      await user.save();
    } else {
      // This is a new user.
      user = await User.create({
        name,
        email,
      });
    }

    // 3. Create your app's own JWT
    const token = jwt.sign({ _id: user._id }, process.env.Jwt_sec, {
      expiresIn: "5d",
    });

    // 4. Send back your token and user data
    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({
      message: "Google login failed. Please try again.",
    });
  }
};
// --- END OF NEW FUNCTION ---

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      message: "Failed to fetch profile.",
    });
  }
};
