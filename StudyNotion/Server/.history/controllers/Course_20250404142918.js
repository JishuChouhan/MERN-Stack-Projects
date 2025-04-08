const Course = require("../models/Course");
const Tag = require("../models/Category");
const User = require("../models/User");
const {uploadImageCloudinary} = require("../utils/imageUploader");

// Create handler Function
exports.createCourse = async (req, res) => {
    try{
        // Fetch data
        const {courseName, courseDescription, WhatYouWillLearn, price, tag: category } = req.body;

        // Get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !WhatYouWillLearn || !category || !price || !thumbnail){
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
        const tagDetails = await Tag.findById(category);
        if(!tagDetails){
            return res.status(400).json({
                success: false,
                error: "Invalid tag"
            });
        }

        // Upload image to Cloudinary
        const thumbnailImage = await uploadImageCloudinary(thumbnail, process.env.FOLDER_NAME);

        // Create an entry for new Course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            WhatYouWillLearn,
            price,
            thumbnail: thumbnailImage.secure_url,
            tag: tagDetails._id,
            instructor: instructorDetails._id
        })

        // Add new Course to the user Schema of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id,},
            {$ush: {courses: newCourse._id,}},
            {new: true}
        );

        // Return Response
        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to Create Course",
            error: err.message
        });
    }
}

// Get All Courses Handler function
exports.getAllCourses = async (req, res) => {
    try{
        // Fetch all courses
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: false,})
            .populate("instructor")
            .exec();

            return res.status(200).json({
                success: true,
                message: "Data for all Courses fetch Successfully",
                data: allCourses
            })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to Fetch Courses",
            error: err.message
        });
    }
} 

// get Course Details
exports.getCourseDetails = async(req, res) => {
    try{
        // get ID
        const {courseId} = req.body;
        // find course details
        const courseDetails = await Course.find({
            _id: courseId,
        }).populate({
            path: "instructor",
            populate:{
                path: "additionalDetails",
            }
        }).populate("category")
        .populate("ratingAndreviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        })
        .exec();

        // Validation
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: `could not find the course with ${courseId}`
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Course Details fetched Successfully",
            data: courseDetails
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to Fetch Course Details",
            error: err.message
        });
    }
}