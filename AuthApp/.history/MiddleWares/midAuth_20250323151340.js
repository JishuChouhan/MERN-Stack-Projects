const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.midAuth = (req,res,next) => {
    try{
        //extract JWT Token
        const token = req.body.token;
        
        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }
        //verify token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        }catch(e){
            return res.status(401).json({
                success: false,
                message: "Token is not valid"
            });
        }
        next();

    }catch(err){
        return res.status(401).json({
            success: false,
            message: "Something went wrong, while verifying the token"
        });
    }
}

exports.isStudent = (res,res,next) => {
    try{
        if(req.user.role !== "student"){
            return res.status(401).json({
                success: false,
                message: "You are not authorized to access this Student route"
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "An error occurred while checking user role"
        })
    }
}

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role!== "admin"){
            return res.status(401).json({
                success: false,
                message: "You are not authorized to access this Admin route"
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "An error occurred while checking user role"
        });
    }
}