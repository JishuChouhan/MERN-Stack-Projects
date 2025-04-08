const Category = require("../models/Category");
const Tag = require("../models/Category");

// Create Tag ka Handler fun

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name ) {
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

exports.categoryPageDetails = async (req, res) => {
  try{
    const { categoryId } = req.body;

    // Get cources for the specified category
    const selectedCategory = await Category.findById(categoryId)
     .populate("courses")
     .exec();
    console.log(selectedCategory);
    // hqandle the case when there are no courses
    if(selectedCategory.courses.length === 0){
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category",
      });
      
    }
    const selectedCourses = selectedCategory.courses;

    // Get courses from otherncategories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId}, // $ne = not equal
    }).populate("courses");

    let differentCourses = [];
    for (const category of categoriesExceptSelected){
      differentCourses.push(...category.courses);
    }

    // Get top-selling courses across all categories
    const allCategories = await Category.find().populate("Courses");
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
     .sort((a, b) => b.sold - a.sold)
     .slice(0, 10);

     res.status(200).json({
      selectedCourses: selectedCourses,
      differentCourses: differentCourses,
      mostSellingCourses: mostSellingCourses,
      success: true,
      message: "Category and course details fetched successfully",
     })
    
  }catch(error){
    console.error(error);
    return res.status(500).json({
        success: false,
        message: error.message,
    });
  }
}