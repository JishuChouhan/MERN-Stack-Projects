const File = require("../models/File"); 

// local file upload --> handler function

exports.localFileUpload = async (req, res) => {
    try{
        // Fetch file
        const file = req.files.file;
        console.log("File is Fetch ->", file);
        
        // Create new file instance
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`; 
        console.log("PATH-> ", path);
        
        file.mv(path, (err) => {
            console.log(err);
            
        });
        res.json({
            success: true,
            message: "Local File uploaded successfully",
        })
    }
    catch(err){
        console.log(err);
    }
}