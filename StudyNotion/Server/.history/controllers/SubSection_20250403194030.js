const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const uploadImageCloudinary = require("../models/UploadImageCloudinary");

// Create handler Function  

exports.createSubsection = async (req, res) => {
    try{
        // Fetch data
        const { title, timeDuration, description, videoUrl, sectionId } = req.body;

        // Extract video/file
        const video = req.files.videoFile;
        // Validation
        if(!sectionId || !title || !description || !videoUrl || !timeDuration){
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        // Upload video to cloudinary
        const uploadDetails = await uploadImageCloudinary(video, process.env.FOLDER_NAME);
        // create a sub section
        const subSectionDetails = new SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
            sectionId
        });
        // update with this sub section objectID
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
             { $push: { 
                subsections: subSectionDetails._id 
            } },
             { new: true  }); // HW: log udated section here, fter adding populate querry
             // return response
             res.status(201).json({
                 message: "Subsection created successfully",
                 updatedSection
             });
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Server Error"});
    }
}

// Todo: updateSubsection
exports.updateSubsection = async(req, res) => {
    try{
        // fetch data
        const {title, timeDuration, description, sectionId} = req.params
    }catch{

    }
}

// deleteSection