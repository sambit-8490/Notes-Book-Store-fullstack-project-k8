import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Strict Gmail Host
    port: 465,              // Secure Port (Fixes Timeouts)
    secure: true,           // SSL/TLS
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Connection Error:", error);
    } else {
        console.log("SMTP Server is ready to take our messages");
    }
});

export const sendVerificationEmail = async (to, subject, htmlContent) => {
    const mailOptions = {
        from: `"BCS Noteswala" <${process.env.SMTP_EMAIL}>`,
        to,
        subject,
        html: htmlContent,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: ", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email via Gmail: ", error);
        throw error;
    }
};