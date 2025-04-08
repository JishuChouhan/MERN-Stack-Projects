const express = require('express');
const router = express.Router();

const {login, signup} = require("../Controllers/Auth");
const {midAuth, isStudent, isAdmin} = require("../MiddleWares/midAuth");

router.post('/login', login);
router.post('/signup', signup);

router.get("/test", midAuth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Test Route"
    });
})

// Protected Routes
router.get("/student", midAuth, isStudent, (req,res) => {
    res.status(200).json({
        success: true,
        message: "Student Route"
    });
});

router.get("/admin", midAuth, isAdmin, (req,res) => {
    res.status(200).json({
        success: true,
        message: "Admin Route"
    });
});

module.exports = router;