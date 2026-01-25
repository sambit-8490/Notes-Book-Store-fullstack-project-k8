import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import dns from 'node:dns';

dotenv.config();

// Force IPv4 to avoid IPv6 timeouts on some cloud providers (Render/AWS)
try {
    dns.setDefaultResultOrder('ipv4first');
} catch (error) {
    console.error("Failed to set DNS order:", error);
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,              // 587 is the standard submission port
    secure: false,          // false = STARTTLS matches port 587
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // Helps when cloud IPs are flagged
        ciphers: 'SSLv3'
    },
    connectionTimeout: 10000, // Explicit timeout
    // Debug logging
    logger: true,
    debug: true
});

// Verify connection
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Connection Error Details:", error);
    } else {
        console.log("SMTP Server is ready (IPv4 forced, Port 587)");
    }
});

export const sendVerificationEmail = async (to, subject, htmlContent) => {
    const mailOptions = {
        from: `"BCS Noteswala" < ${process.env.SMTP_EMAIL}> `,
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