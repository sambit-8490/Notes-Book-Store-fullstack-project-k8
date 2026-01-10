import { Schema, model } from "mongoose";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    type: {
        type: String, // 'VERIFICATION' or 'RESET_PASSWORD'
        default: 'VERIFICATION'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // The document will be automatically deleted after 10 minutes (600 seconds)
    }
}, { timestamps: true });

const Otp = model("Otp", otpSchema);

export default Otp;
