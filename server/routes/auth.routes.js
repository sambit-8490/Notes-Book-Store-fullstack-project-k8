import express from "express";
import {
    signup,
    login,
    verifyOtp,
    resendOtp,
    sendResetOtp,
    verifyResetOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/send-reset-otp", sendResetOtp);
router.post("/verify-reset-otp", verifyResetOtp);

export default router;
