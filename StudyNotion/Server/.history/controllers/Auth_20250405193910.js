const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
require("dotenv").config();

exports.sendOTP = async (req, res) => {
  try {
    //fetch email from request body
    const { email } = req.body;

    // check if user alrady exist
    const checkUserPresent = await User.findOne({ email });

    // if user already exists, then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: true,
        message: "User already exists. Please login.",
      });
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    // check unique otp or not
    const result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });
      result = await OTP.findOne({ otp });
    }
    const otpPayload = { email, otp };
    // create an entry for OTP
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
      otp: otpBody.otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SignUp ->
exports.signUp = async function (req, res) {
  try {
    // Data fetch from request ki body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // validate krlo
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // 2 password match
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Passwords does not match.",
      });
    }

    // Check user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "Email already exists. Please try with another email.",
      });
    }

    // find most recent OTP stored for the user
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);

    // Valitade OTP
    if (response.length === 0) {
      // OTP not found
      return res.status(403).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== response[0].otp) {
      // OTP not match
      return res.status(403).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the User
    let approved = "";
    approved === "Instrucotr" ? (approved = flase) : (approved = true);

    // Create the Additional Profile for User
    const profileDetails = await Profile.create({
      gender: null,
      dateofBirth: null,
      about: null,
      contactNumber: null,
    });
    //Entry create in DB
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      contactNumber,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully.",
    });
  } catch (error) {
    // returs res
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "User cannot be register, Please try again.",
    });
  }
};

// Login ->
exports.login = async (req, res) => {
  try {
    // get data from request body
    const { email, password } = req.body;

    // Validation data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required.",
      });
    }
    // user check exist or not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found.",
      });
    }
    // generate JWT token, after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      user.token = token;
      user.password = user.password;

      // Create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully.",
        user,
        token,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password does not match.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be logged in, Please try again.",
    });
  }
};

// changedPassword
exports.changePassword = async (res, req) => {
  try {
    // Fetch data from req body
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password doesn't match",
      });
    }

    //
  } catch (eorro) {}
};
