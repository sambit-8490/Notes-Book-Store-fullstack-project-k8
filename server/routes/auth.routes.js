// server/routes/auth.routes.js

import express from "express";

import {
  signup,
  login,
  sendResetOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

// ================= AUTH =================

router.post("/signup", signup);

router.post("/login", login);

// ============== RESET PASSWORD ==============

router.post("/reset-password", sendResetOtp);

export default router;
