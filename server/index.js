import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import validator from "validator";
import path from "path";
import cors from "cors";
const __dirname = path.resolve();
dotenv.config();

import User from "./models/User.js";
import authRoutes from "./routes/auth.routes.js";
import TyPdf from "./models/TyPdf.js";
import SyPdf from "./models/SyPdf.js";
import FyPdf from "./models/FyPdf.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

app.get("/health", (req, res) => {
  res.send("Server is running");
});

// api routes starts here
// Auth routes
app.use(authRoutes);


// CRUD Operation starts here...
// Create or ADD PDF api starts here
app.post("/createTyPdf", async (req, res) => {
  try {
    const { title, description, pdfUrl, imgUrl, year, faculty } = req.body;

    const tyPdfs = new TyPdf({
      title: title,
      description: description,
      pdfUrl: pdfUrl,
      imgUrl: imgUrl,
      year: year,
      faculty: faculty,
    });

    const savedPdf = await tyPdfs.save();

    res.json({
      success: true,
      message: "PDF added successfully",
      data: savedPdf,
    });
  } catch (e) { console.error(e); res.status(500).json({ error: e.message }) }
});

app.post("/createSyPdf", async (req, res) => {
  try {
    const { title, description, pdfUrl, imgUrl, year, faculty } = req.body;

    const syPdfs = new SyPdf({
      title: title,
      description: description,
      pdfUrl: pdfUrl,
      imgUrl: imgUrl,
      year: year,
      faculty: faculty,
    });

    const savedPdf = await syPdfs.save();

    res.json({
      success: true,
      message: "PDF added successfully",
      data: savedPdf,
    });
  } catch (e) { console.error(e); res.status(500).json({ error: e.message }) }
});

app.post("/createFyPdf", async (req, res) => {
  try {
    const { title, description, pdfUrl, imgUrl, year, faculty } = req.body;

    const fyPdfs = new FyPdf({
      title: title,
      description: description,
      pdfUrl: pdfUrl,
      imgUrl: imgUrl,
      year: year,
      faculty: faculty,
    });

    const savedPdf = await fyPdfs.save();

    res.json({
      success: true,
      message: "PDF added successfully",
      data: savedPdf,
    });
  } catch (e) { console.error(e); res.status(500).json({ error: e.message }) }
});
// Create or ADD PDF api ends here

// All Fy Pdfs fetching api starts here
app.get("/FyallPdfs", async (req, res) => {
  const fyPdfs = await FyPdf.find();

  res.json({
    success: true,
    message: "Pdf Items fetched successfully",
    data: fyPdfs,
  });
});
// All Fy Pdfs fetching api ends here

// All Sy Pdfs fetching api starts here
app.get("/SyallPdfs", async (req, res) => {
  const syPdfs = await SyPdf.find();

  res.json({
    success: true,
    message: "Pdf Items fetched successfully",
    data: syPdfs,
  });
});
// All Sy Pdfs fetching api ends here

// All Ty Pdfs fetching api starts here
app.get("/TyallPdfs", async (req, res) => {
  const tyPdfs = await TyPdf.find();

  res.json({
    success: true,
    message: "Pdf Items fetched successfully",
    data: tyPdfs,
  });
});
// All Ty Pdfs fetching api ends here

// Pdfs Search by title
// http://localhost:5000/pdfsbytitle?title=Operating System
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


app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
