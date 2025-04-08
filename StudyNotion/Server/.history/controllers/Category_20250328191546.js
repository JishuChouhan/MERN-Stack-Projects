const Tag = require("../models/Category");

// Create Tag ka Handler fun

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "Please provide name and description",
      });
    }
    // Create entry in DB
    const categoryDetails = await Tag.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    // RETURN RES
    res.status(201).json({
      success: true,
      data: categoryDetails,
      message: "Category created successfully",
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// getAllTags Handler Fun
exports.showAllCategory= async (req, res) => {
    try{
        const allTags = await Tag.find({}, {name: true, description: true});
        res.status(200).json({
            success: true,
            data: allTags,
            message: "All Tags retrieved successfully",
        });
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}