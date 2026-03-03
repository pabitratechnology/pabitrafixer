import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // Import mongoose directly
import path from "path";
import { fileURLToPath } from "url";

// --- REMOVED THE FAILING DATABASE IMPORT ---
// import { connectDB } from "./server/config/db"; 

// --- KEEPING THESE BUT ADDING .JS (Node requires .js even for .ts files in ESM) ---
import apiRoutes from "./server/routes/api.js"; 
import { errorHandler } from "./server/middleware/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || "";
const app = express();

app.use(cors());
app.use(express.json());

// 1. DATABASE CONNECTION (Embedded here to avoid errors)
const connectToMongo = async () => {
  try {
    if (!MONGODB_URI) {
      console.error("❌ MONGODB_URI is missing!");
      return;
    }
    await mongoose.connect(MONGODB_URI.trim());
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
};
connectToMongo();

// 2. API ROUTES
app.use("/api", apiRoutes);

// 3. ERROR HANDLING
app.use(errorHandler);

// 4. PRODUCTION STATIC FILES
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// 5. EXPORT FOR VERCEL
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Running on http://localhost:${PORT}`));
}

export default app;