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

        // Transporter
    // shift this confifuratio under /config folder
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }, 
        })
        
        // Send Mail
        let info = await transporter.sendMail({
            from: `honeyj`,
            to: doc.email,
            subject: "New Email uploaaded on Cloudinary",
            html: `<h1>Hello from Jishu Chouhan</h1> <p>File Uploaded view here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })
        console.log("Info-> ", info);
        
    }catch(error){
        console.error(error);
        
    }
})

const File = mongoose.model('File', fileSchema);

module.exports = File;