//app create

const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//Add Middleware
app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles: true,
}));

//Database setup
const db = require("./config/DataBase");
db.connect();

// Cloud setup
const cloudinary = require("./config/Cloudinary");
cloudinary.cloudinaryConnect();

//Api route mount 
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

// Start the server
app.listen(PORT), () => {
    console.log(`Server running on port ${PORT}`);
};