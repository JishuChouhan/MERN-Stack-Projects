const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// local file upload --> handler function

exports.localFileUpload = async (req, res) => {
  try {
    // Fetch file from request
    const file = req.files.file;
    console.log("File is Fetch ->", file);

    // Create path where file needs to be stored on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("PATH-> ", path);

    //add the path to the move function
    file.mv(path, (err) => {
      console.log(err);
    });
    // Create a successfull response
    res.json({
      success: true,
      message: "Local File uploaded successfully",
    });
  } catch (err) {
    console.log("Not able to upload the file on Server");

    console.log(err);
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("Temp file path-> ", file.tempFilePath);

  if(quality){
    options.quality = quality;
    console.log("Quality is set to ", quality);
  }
  options.resource_type = "auto";
  
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Image upload Handler

exports.imageUpload = async (req, res) => {
  try {
    //Data Fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log("File received:", file);

    // Validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type: ", fileType);
    

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type. Only JPG, JPEG and PNG are allowed.",
      });
    }
    // file format supported hai
    console.log("Uploading to Codehelp");
    
    const response = await uploadFileToCloudinary(file, "CodeHelp");
    console.log("Response-> ", response);
    
    // Save to MongoDB
    const fileData = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    });

    res.json({
        success: true,
        imageUrl: response.secure_url,
        message: "Image uploaded successfully",
    })
  } catch (err) {
    console.error(err);
    console.log("Not able to upload the image");
    res.status(400).json({
      success: false,
      message: "Error in uploading image",
    });
  }
};

// Video Upload 
exports.videoUpload = async (req, res) => {
  try{
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    
    const file = req.files.videoFile;
    console.log("File received:", file);

    // Validation
    const supportedTypes = ["mp4", "mov", "avi"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type: ", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type. Only MP4, MOV and AVI are allowed.",
      });
    }

    // file format supported hai
    console.log("Uploading to Codehelp");
    
    const response = await uploadFileToCloudinary(file, "CodeHelp");
    console.log("Response-> ", response);
    
    // Save to MongoDB
    const fileData = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    });

    res.json({
        success: true,
        imageUrl: response.secure_url,
        message: "Video uploaded successfully",
    })


  }catch(err){
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Error in receiving video data",
    });
  }
}


exports.imageSizeReducer = async(req, res) => {
  try{
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log("File received:", file);

    // Validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type: ", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type. Only JPG, JPEG and PNG are allowed.",
      });
    }

    console.log("Uploading to codehelp");
    const response = await uploadFileToCloudinary(file, "CodeHelp");
    console.log("Response-> ", response);
    
    const fileData = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    })

    res.json({
        success: true,
        imageUrl: response.secure_url,
        message: "Image resized successfully",
    })


  }catch(err){
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Error in receiving image id",
    });
  }
}