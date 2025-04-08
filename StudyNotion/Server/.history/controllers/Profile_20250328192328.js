const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    // Get data
    const { gender, dateofBirth = "", about = "", contactNumber } = req.body;
    // user id
    const id = req.user.id;
    // validate data
    if (!gender || !contactNumber || !id) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }
    // find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await User.findById(profileId);

    // update profile
    profileDetails = dateofBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;
    await profileDetails.save();

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetails,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        error: error.message,
    });
  }
};

// deleteAccount
// Expplore  -> how can we schedule this deletion operation -> cron job
exports.deleteAccount = async (req, res) => {
    try{
        // get id
        const userId = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }
        // delete profile
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        // TODO: Hw unenroll user from all enrolled courses
        // delete user
        await User.findByIdAndDelete({_id: id});
        // return response
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    }catch(error){
      return res.status(400).json({
        sussess: false,
        message: error.message
      })
    }
}

exports.getAllUserDetails = async ( req, res ) => {
  try{
    // get id
    const id = req.user.id;
    // validation and get user details
    const userDetails = await User.findById(id).populate("additionalDetails").exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "User details retrieved successfully"
    })
  }catch(error){
    console.error(error);
    return res.status(500).json({
        success: false,
        message: error.message,
    });
  }
}