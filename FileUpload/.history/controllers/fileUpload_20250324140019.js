const File = require("../models/File"); 

// local file upload --> handler function

exports.localFileUpload = async (req, res) => {
    try{
        // Fetch file from request
        const file = req.files.file;
        console.log("File is Fetch ->", file);
        
        // Create path where file needs to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`; 
        console.log("PATH-> ", path);
        
        //add the path to the move function
        file.mv(path, (err) => {
            console.log(err);
            
        });
        // Create a successfull response
        res.json({
            success: true,
            message: "Local File uploaded successfully",
        })
    }
    catch(err){
        console.log("Not able to upload the file on Server");
        
        console.log(err);
    }
}

// Image upload Handler

// exports.imageUpload = async (req, res) => {
//     try{
        
//     }
// }