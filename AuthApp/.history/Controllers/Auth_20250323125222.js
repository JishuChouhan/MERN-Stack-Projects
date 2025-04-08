const bcrypt = require('bcrypt');
const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Signup route handler
exports.signup = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        // secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success: false,
                message: "Failed to hash password"
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        return res.status(201).json({
            success: true,
            message: "User created successfully"
        });
    }

    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered"
        });
    }
}

exports.login = async (req,res) => {
    try{
        //data fetch
        const {email, password} = req.body;
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "Please provide email and password carefully"
            });
        }
        // check for registered user
        const user = await User.findOne({email});
        //if not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message: "User not found"
            });
        }
        const payload = {
            email:user.email,
            id: user._id,
            role: user.role
        }
        //verify password and generate JWT token
        if(await bcrypt.compare(password,user.password)){
            //generate JWT token
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
            user.token = token;
            user.password = undefined;

            const options={
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                user,
                token,
                message: "Logged in successfully",
            });
        }
        else{
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Incorrect password"
            });
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        });
    }
}