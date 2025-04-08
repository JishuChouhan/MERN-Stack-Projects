const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try{
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer", "");
        // if token is missing
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }
        // Verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
            
        }catch(e){
            // verification - issue
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
        next();
    }catch(e){
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token"
        })
    }
}

// isStudent
exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Students only"
            });
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "User role connot be verify, please try again"
        })
    }
}

// isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Instructor only"
            });
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "User role connot be verify, please try again"
        })
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success: false,
                message: "This is the Protected route for Admin only"
            })
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "User role connot be verify, please try again"
        })
    }
}