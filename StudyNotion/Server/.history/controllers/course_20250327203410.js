const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/User");
const {uploadImageCloudinary} = require("../utils/imageUploader");

// Create handler Function
exports.createCourse = async (req, res) => {
    try{
        // Fetch data
        const {courseName, courseDescription, WhatYouWillLearn, price, tag } = req.body;

        // Get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !WhatYouWillLearn || !tag || !price || !thumbnail){
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            });
        }

        // Check for Instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);
        
        if(!instructorDetails){
            return res.status(403).json({
                success: false,
                error: "Only instructors can create courses"
            });
        }

        // Check given tag is valid or not
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(400).json({
                success: false,
                error: "Invalid tag"
            });
        }

        // Upload image to Cloudinary
        const thumnailImage = await uploadImageCloudinary(thumbnail, process.env.FOLDER_NAME);

        // Create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            WhatYouWillLearn,
            price,
            thumbnail: thumnailImage.secure_url,
            tag: tagDetails._id,
            instructor: instructorDetails._id
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}