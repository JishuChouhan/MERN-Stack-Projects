const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion || codeHelp - by Jishu Chouhan',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log(info);
        return info;
        
    }
    catch(error){
        console.error("Error sending email:", error);
    }
}
module.exports = mailSender;