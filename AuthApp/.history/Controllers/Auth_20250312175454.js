const bcrypt = require('bcrypt');
const User = require("../models/User");

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