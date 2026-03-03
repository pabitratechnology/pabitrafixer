import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ✅ ADD .ts EXTENSIONS TO THESE IMPORTS
import { connectDB } from "./server/config/db.ts"; 
import apiRoutes from "./server/routes/api.ts";
import { errorHandler } from "./server/middleware/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = (process.env.MONGODB_URI || "").trim();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connect to Database (Simplified for Vercel)
if (MONGODB_URI) {
  connectDB(MONGODB_URI).catch(err => console.error("DB Connection Error:", err));
}

// 2. API Routes
app.use("/api", apiRoutes);

// 3. Error Handling
app.use(errorHandler);

// 4. Handle Static Files (Only for local dev; Vercel uses vercel.json for this)
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// 5. IMPORTANT: Conditional Listen & Export
// On Vercel, app.listen is NOT used. We just export the app.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Local Server: http://localhost:${PORT}`);
  });
}

export default app; // 👈 REQUIRED for Vercel