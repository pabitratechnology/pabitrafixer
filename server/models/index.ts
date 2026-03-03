import mongoose from "mongoose";

// --- REUSABLE OPTIONS ---
const timestampOption = { 
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
};

// ==========================================
// 1. USER MODEL (Advanced)
// ==========================================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["user", "recruiter", "admin"], 
    default: "user" 
  },
  phone: { type: String, default: "" },
  bio: { type: String, maxLength: 500 },
  profile_image: { type: String, default: "" },
  saved_jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  
  // Security for "Regain Access"
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  is_verified: { type: Boolean, default: false }
}, timestampOption);

export const User = mongoose.model("User", userSchema);

// ==========================================
// 2. CATEGORY MODEL
// ==========================================
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  icon: String // Store Lucide icon name or emoji
});

export const Category = mongoose.model("Category", categorySchema);

// ==========================================
// 3. JOB MODEL (Detailed & Search Optimized)
// ==========================================
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  organization: { type: String, required: true, index: true },
  type: { 
    type: String, 
    required: true, 
    enum: ["Govt", "Private", "Internship", "Remote", "Contract", "Part-time"] 
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  
  // Compensation & Details
  qualification: { type: String, required: true },
  age_limit: String,
  salary: String,
  salary_numeric: Number, 
  vacancies: { type: Number, default: 0 },
  
  // Location Intelligence
  state: { type: String, index: true },
  district: String,
  location: String,
  
  // Dates
  start_date: Date,
  last_date: { type: Date, required: true, index: true },
  
  // Links
  official_website: String,
  apply_link: { type: String, required: true },
  notification_pdf: String,
  
  // Rich Content
  experience_level: { 
    type: String, 
    enum: ["Entry", "Mid", "Senior", "Expert", "Not Specified"],
    default: "Entry"
  },
  selection_process: String,
  syllabus_overview: String,
  description: { type: String, required: true },
  tags: [String], 
  
  // Management
  is_active: { type: Boolean, default: true },
  posted_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  views: { type: Number, default: 0 }
}, timestampOption);

jobSchema.index({ title: 'text', organization: 'text', description: 'text' });

export const Job = mongoose.model("Job", jobSchema);

// ==========================================
// 4. NOTIFICATION MODELS (Admit, Result, Keys)
// ==========================================

const baseNotification = {
  title: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  link: { type: String, required: true },
  release_date: { type: Date, default: Date.now },
};

const admitCardSchema = new mongoose.Schema(baseNotification, timestampOption);
export const AdmitCard = mongoose.model("AdmitCard", admitCardSchema);

const resultSchema = new mongoose.Schema(baseNotification, timestampOption);
export const Result = mongoose.model("Result", resultSchema);

const answerKeySchema = new mongoose.Schema(baseNotification, timestampOption);
export const AnswerKey = mongoose.model("AnswerKey", answerKeySchema);

// ==========================================
// 5. EDUCATIONAL RESOURCES
// ==========================================
const syllabusSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  content: { type: String, required: true }, 
  pdf_link: String,
}, timestampOption);

export const Syllabus = mongoose.model("Syllabus", syllabusSchema);

const previousPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  year: { type: Number, required: true },
  link: { type: String, required: true },
}, timestampOption);

export const PreviousPaper = mongoose.model("PreviousPaper", previousPaperSchema);

// --- NEWLY ADDED: STUDY MATERIAL MODEL ---
const studyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String },
  link: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
}, timestampOption);

export const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);

// ==========================================
// 6. MARKETING & ALERTS
// ==========================================
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  is_active: { type: Boolean, default: true }
}, timestampOption);

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);