const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    // data Fetch
    const { sectionName, courseId } = req.body;
    // validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Create Section
    const newSection = await Section.create({ sectionName });
    // Update Course with section ObjectID
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    );
    // Todo use populate to replace section , subSection both in the updatedCourseDetails
    // Return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to create section, Please try again",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    // Data
    const { sectionId, sectionName } = req.body;
    // Validation
    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Update Data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    // Return Response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section: section,
    });
    // Return Response
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to update section, Please try again",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    // Get ID - assuming that we are sending ID in params
    const { sectionId } = req.params;
    //Use findById
    await Section.findByIdAndDelete(sectionId);
    // TODO[Do in Testing Time]: Do we need to delete the entry from course schema
    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete section, Please try again",
    });
  }
};
