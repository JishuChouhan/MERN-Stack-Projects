const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    // get email from req body
    const email = req.body.email;

    // Check user for this email, email validation
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "No user found with this email",
      });
    }
    // Generate token
    const token = crypto.randomUUID();
    // Update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordToken: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    // Create URL
    const url = `http://localhost:3000/update-password/${token}`;

    // Send email with URL
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link: ${url}`
    );
    // return response
    return res.json({
      success: true,
      message: "Email sent successfully please reset and change password",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
    try{
        // data fetch
        const {password, confirmPassword, token} = req.body;

        // Validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        // Get userdetails drom DB using token
        const userDetails = await User.findOne({token: token});
        // If no entry - invalid
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }
        // Token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success: false,
                message: "Token has expired"
            });
        }
        // Hash Pwd
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Password Update
        await User.findByIdAndUpdate(
          {token: token},
          {password: hashedPassword},
          {new: true}
        );
        // return response
        return res.json({
            success: true,
            message: "Password reset successfully"
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}