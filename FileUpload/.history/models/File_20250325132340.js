const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: [String],
    },
    email: {
        type: String,
        required: true,
        // unique: true
    }
});

// Post middleware->

fileSchema.post("save", async function(doc){
    try{
        console.log("doc", doc);
        
    }catch(error){
        console.error(error);
        
    }
})

const File = mongoose.model('File', fileSchema);

module.exports = File;