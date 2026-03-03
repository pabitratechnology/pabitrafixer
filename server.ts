import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"; // Added CORS
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./server/config/db";
import apiRoutes from "./server/routes/api";
import { errorHandler } from "./server/middleware/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Clean up URI and set Port
const MONGODB_URI = (process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jobs").trim();
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

/**
 * GLOBAL MIDDLEWARE
 */
app.use(cors()); // Allows your Frontend (Port 5173) to talk to this Backend (Port 3000)
app.use(express.json()); // Allows the server to read JSON in request bodies

async function startServer() {
  // 1. Connect to Database
  await connectDB(MONGODB_URI);

  /**
   * 2. API ROUTES
   * These MUST come before the Vite/Static middleware
   */
  app.use("/api", apiRoutes);

  /**
   * 3. VITE / STATIC FILE HANDLING
   * This handles the Frontend part of your application
   */
  if (process.env.NODE_ENV !== "production") {
    // Development Mode: Use Vite Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode: Serve built files from 'dist' folder
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    
    // Redirect all other requests to index.html (SPA support)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  /**
   * 4. ERROR HANDLING
   * Catch-all for any errors thrown in routes
   */
  app.use(errorHandler);

  // 5. Start Listening
  app.listen(PORT, () => {
    console.log(`-----------------------------------------------`);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 API Base Path: http://localhost:${PORT}/api`);
    console.log(`-----------------------------------------------`);
  });
}

startServer().catch(err => {
  console.error("FATAL: Failed to start server:", err);
});