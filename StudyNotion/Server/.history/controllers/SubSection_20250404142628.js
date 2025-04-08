const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const uploadImageCloudinary = require("../utils/imageUploader");

// Create handler Function  

exports.createSubSection = async (req, res) => {
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
             { new: true  }); // HW: log udated section here, after adding populate querry
             // return response
            return res.status(201).json({
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
exports.updateSubSection = async(req, res) => {
    try{
        // fetch data
        const {title, timeDuration, description, sectionId} = req.body;
        // validation
        if(!title || !timeDuration || !description || !sectionId){
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            });
        }
        // update Data
        const section = await SubSection.findByIdAndUpdate(
            sectionId,
            {title, timeDuration, description},
            {new: true}
        );
        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection updated Successfully",
            SubSection: SubSection,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to update SubSection, Please try again"
        })
    }
}

// deleteSection 
exports.deleteSubSection = async (req, res) => {
    try{
        const {sectionId} = req.params;
        await SubSection.findByIdAndDelete(sectionId);
        //return res
        return res.status(200).json({
            success: true,
            message: "SubSection Deleted Successfully"
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            messsage: "Unable to delete SubSection, Please try again"
        })
    }
}