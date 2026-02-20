require("dotenv").config();

const nodemailer = require("nodemailer");

const emailService = async (email, otp) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        }

    })
    await transport.sendMail({
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is ${otp} and this code expires in 2 minutes`

    })
}

module.exports = emailService;