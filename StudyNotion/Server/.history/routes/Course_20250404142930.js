const express = require("express");
const router = express.Router();

// Import the controllers

// Course Controllers Import
const{ 
    createCourse,
    getAllCourses,
    getCourseDetails
} = require("../controllers/Course");

// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails
} = require("../controllers/Category");

// Sections Controllers Import
const{
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/Section");

// Sub-Section Controllers 
const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/SubSection");

// Rating Controllers Import
const {
    createRating,
    getAverageRating,
    getAllRating
} = require("../controllers/RatingAndreview");

// Importing middlewares
const { auth, isInstructor, isStudent, isAdminn: isAdmin } = require("../middlewares/auth");
const { route } = require("./User");



// add a section to a course
router.post("addSection", auth, isInstructor, createSection);

/// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);

// Delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection);

// Edit sub section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);

// Courses can Only be Created by Instructor
router.post("/createCourse", auth, isInstructor, createCourse);

// Get all registered Coures
router.get("/getAllCourses", getAllCourses);

// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);

// TODO: Put IsAdmin Middleware here

// Category Middlewares
router.post("createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// Rating and Review
router.post("/createRating", auth, isAdmin, createCategory);

router.post("/getAverageRating", getAverageRating);

router.post("/getAllRating", getAllRating)

module.exports = router;