import express from "express";
import * as authController from "../controllers/authController";
import * as jobController from "../controllers/jobController";
import * as notificationController from "../controllers/notificationController";
import * as contentController from "../controllers/contentController";
import * as miscController from "../controllers/miscController";
import { authenticate, isAdmin, isAuthorizedToPost } from "../middleware/index";
import mongoose from "mongoose";

const router = express.Router();

/**
 * ==========================================
 * 1. SYSTEM & DIAGNOSTICS
 * ==========================================
 */
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

/**
 * ==========================================
 * 2. AUTHENTICATION & IDENTITY
 * ==========================================
 */
// Public Authentication
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// Regain Access (Forgot Password Flow)
router.post("/auth/forgot-password", authController.forgotPassword);
router.post("/auth/reset-password/:token", authController.resetPassword);

// Private Identity Management
router.get("/auth/profile", authenticate, authController.getProfile);
router.put("/auth/profile", authenticate, authController.updateProfile);

/**
 * ==========================================
 * 3. USER DIRECTORY (ADMIN ONLY)
 * ==========================================
 */
router.get("/users", authenticate, isAdmin, authController.getUsers);
router.put("/users/:id", authenticate, isAdmin, authController.updateUser);
router.delete("/users/:id", authenticate, isAdmin, authController.deleteUser);

/**
 * ==========================================
 * 4. JOB ENGINE
 * ==========================================
 */
// Public Job Discovery
router.get("/jobs", jobController.getJobs);
router.get("/jobs/:id", jobController.getJobById);

// Personalized Job Actions
router.get("/jobs/saved", authenticate, jobController.getSavedJobs);
router.post("/jobs/:id/save", authenticate, jobController.toggleSaveJob);

// Administrative Recruitment Actions
router.post("/jobs", authenticate, isAuthorizedToPost, jobController.createJob);
router.put("/jobs/:id", authenticate, isAuthorizedToPost, jobController.updateJob);
router.delete("/jobs/:id", authenticate, isAdmin, jobController.deleteJob);

/**
 * ==========================================
 * 5. EDUCATIONAL RESOURCES (CRUD)
 * ==========================================
 */
// Syllabus Management
router.get("/syllabus", contentController.getSyllabus);
router.post("/syllabus", authenticate, isAdmin, contentController.createSyllabus);
router.put("/syllabus/:id", authenticate, isAdmin, contentController.updateSyllabus);
router.delete("/syllabus/:id", authenticate, isAdmin, contentController.deleteSyllabus);

// Previous Year Papers Management
router.get("/previous-papers", contentController.getPreviousPapers);
router.post("/previous-papers", authenticate, isAdmin, contentController.createPreviousPaper);
router.put("/previous-papers/:id", authenticate, isAdmin, contentController.updatePreviousPaper); // FIXED: Changed from create to update
router.delete("/previous-papers/:id", authenticate, isAdmin, contentController.deletePreviousPaper);

// Study Materials Management
router.get("/study-materials", contentController.getStudyMaterials);
router.post("/study-materials", authenticate, isAdmin, contentController.createStudyMaterial);
router.put("/study-materials/:id", authenticate, isAdmin, contentController.updateStudyMaterial); // FIXED: Changed from create to update
router.delete("/study-materials/:id", authenticate, isAdmin, contentController.deleteStudyMaterial);

/**
 * ==========================================
 * 6. LIVE NOTIFICATIONS (CRUD)
 * ==========================================
 */
// Admit Cards
router.get("/admit-cards", notificationController.getAdmitCards);
router.post("/admit-cards", authenticate, isAuthorizedToPost, notificationController.createAdmitCard);
// Optional: Added delete if needed for cleaning up old data
router.delete("/admit-cards/:id", authenticate, isAdmin, notificationController.deleteAdmitCard); 

// Exam Results
router.get("/results", notificationController.getResults);
router.post("/results", authenticate, isAuthorizedToPost, notificationController.createResult);
router.delete("/results/:id", authenticate, isAdmin, notificationController.deleteResult);

// Official Answer Keys
router.get("/answer-keys", notificationController.getAnswerKeys);
router.post("/answer-keys", authenticate, isAuthorizedToPost, notificationController.createAnswerKey);
router.delete("/answer-keys/:id", authenticate, isAdmin, notificationController.deleteAnswerKey);

/**
 * ==========================================
 * 7. MISCELLANEOUS & MARKETING
 * ==========================================
 */
router.get("/categories", miscController.getCategories);
router.post("/subscribe", miscController.subscribe);

export default router;