import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import validator from "validator";
import path from "path";
import cors from "cors";
import dns from "node:dns";
import bcrypt from "bcrypt";

const __dirname = path.resolve();

dotenv.config();

// Fix for Nodemailer/Gmail ETIMEDOUT on some networks (IPv6 issues)
try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {
  console.log("Could not set DNS order:", e.message);
}

import User from "./models/User.js";
import authRoutes from "./routes/auth.routes.js";
import TyPdf from "./models/TyPdf.js";
import SyPdf from "./models/SyPdf.js";
import FyPdf from "./models/FyPdf.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);

// ================= DEFAULT ADMIN =================

async function createDefaultAdmin() {
  try {

    const existingAdmin = await User.findOne({
      email: "admin@noteswala.com",
    });

    if (existingAdmin) {
      console.log("Default admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@noteswala.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    await admin.save();

    console.log("Default admin created successfully");

  } catch (error) {

    console.log("Admin creation error:", error.message);

  }
}

// ================= MONGODB =================

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {

    console.log("Connected to MongoDB");

    await createDefaultAdmin();

  })
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// ================= HEALTH =================

app.get("/health", (req, res) => {
  res.send("Server is running");
});

// ================= AUTH ROUTES =================

app.use(authRoutes);

// ================= CREATE PDF =================

app.post("/createTyPdf", async (req, res) => {

  try {

    const { title, description, pdfUrl, imgUrl, year, faculty } = req.body;

    const tyPdfs = new TyPdf({
      title,
      description,
      pdfUrl,
      imgUrl,
      year,
      faculty,
    });

    const savedPdf = await tyPdfs.save();

    res.json({
      success: true,
      message: "PDF added successfully",
      data: savedPdf,
    });

  } catch (e) {

    console.error(e);

    res.status(500).json({
      success: false,
      error: e.message,
    });

  }
});

app.post("/createSyPdf", async (req, res) => {

  try {

    const { title, description, pdfUrl, imgUrl, year, faculty } = req.body;

    const syPdfs = new SyPdf({
      title,
      description,
      pdfUrl,
      imgUrl,
      year,
      faculty,
    });

    const savedPdf = await syPdfs.save();

    res.json({
      success: true,
      message: "PDF added successfully",
      data: savedPdf,
    });

  } catch (e) {

    console.error(e);

    res.status(500).json({
      success: false,
      error: e.message,
    });

  }
});

app.post("/createFyPdf", async (req, res) => {

  try {

    const { title, description, pdfUrl, imgUrl, year, faculty } = req.body;

    const fyPdfs = new FyPdf({
      title,
      description,
      pdfUrl,
      imgUrl,
      year,
      faculty,
    });

    const savedPdf = await fyPdfs.save();

    res.json({
      success: true,
      message: "PDF added successfully",
      data: savedPdf,
    });

  } catch (e) {

    console.error(e);

    res.status(500).json({
      success: false,
      error: e.message,
    });

  }
});

// ================= FETCH PDFs =================

app.get("/FyallPdfs", async (req, res) => {

  const fyPdfs = await FyPdf.find();

  res.json({
    success: true,
    message: "Pdf Items fetched successfully",
    data: fyPdfs,
  });
});

app.get("/SyallPdfs", async (req, res) => {

  const syPdfs = await SyPdf.find();

  res.json({
    success: true,
    message: "Pdf Items fetched successfully",
    data: syPdfs,
  });
});

app.get("/TyallPdfs", async (req, res) => {

  const tyPdfs = await TyPdf.find();

  res.json({
    success: true,
    message: "Pdf Items fetched successfully",
    data: tyPdfs,
  });
});

// ================= SEARCH PDFs =================

app.get("/Fypdfsbytitle", async (req, res) => {

  const { title } = req.query;

  const fyPdfs = await FyPdf.find({
    title: { $regex: title, $options: "i" },
  });

  res.json({
    success: true,
    message: "pdfs fetched successfully",
    data: fyPdfs,
  });
});

app.get("/Sypdfsbytitle", async (req, res) => {

  const { title } = req.query;

  const syPdfs = await SyPdf.find({
    title: { $regex: title, $options: "i" },
  });

  res.json({
    success: true,
    message: "pdfs fetched successfully",
    data: syPdfs,
  });
});

app.get("/Typdfsbytitle", async (req, res) => {

  const { title } = req.query;

  const tyPdfs = await TyPdf.find({
    title: { $regex: title, $options: "i" },
  });

  res.json({
    success: true,
    message: "pdfs fetched successfully",
    data: tyPdfs,
  });
});

// ================= CLIENT BUILD =================

app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {

  res.sendFile(
    path.join(__dirname, "..", "client", "build", "index.html")
  );

});

// ================= SERVER =================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
