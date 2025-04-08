const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

// createRating
exports.createRating = async (request, res) => {
  try {
    // user ID
    const { userId } = request.user.id;
    // Fetch data from userId
    const { courseId, rating, review } = request.body;
    // Check if User is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $eleMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(403).json({
        success: false,
        message: "User is not enrolled in this course",
      });
    }

    // Check if user already review the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "User already reviewed this course",
      });
    }
    // create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      user: userId,
      course: courseId,
    });
    // update course with this rating and review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);

    // return response
    return res.status(200).json({
      success: true,
      messame: "Rating and Review Successfully",
      ratingReview,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to create Rating and Review",
      error: err.message,
    });
  }
};

// getAverageRating
exports.getAverageRating = async (req, res) => {
  try {
    // Get course ID
    const { courseId } = req.body.courseId;

    // Calculate average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Type.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating",
          },
        },
      },
    ]);
    // return the average rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }
    // if no rating / review exist
    return res.status(200).json({
      success: true,
      message: "Average ARting is 0, no ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get average rating",
      error: error.message,
    });
  }
};

// getAllRating
// course Id ke corresponding rating review leke aani h
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All Ratings and Reviews fetched successfully",
      allReviews,
    });
  } catch (err) {
    return res.status(500).json({
        success: false,
        message: err.message,
    })
  }
};

