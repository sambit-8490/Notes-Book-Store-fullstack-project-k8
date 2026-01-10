import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
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
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};
