import bcrypt from "bcryptjs";
import { User, Category, Job } from "../models/index";
import mongoose from "mongoose";

export async function seedDatabase() {
  if (mongoose.connection.readyState !== 1) {
    console.log("Skipping seed: Database not connected");
    return;
  }
  try {
    // Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const categories = [
        { name: "SSC", slug: "ssc" },
        { name: "Banking", slug: "banking" },
        { name: "Railway", slug: "railway" },
        { name: "UPSC", slug: "upsc" },
        { name: "State Govt", slug: "state-govt" },
        { name: "IT Jobs", slug: "it-jobs" },
        { name: "Teaching", slug: "teaching" },
        { name: "Defense", slug: "defense" }
      ];
      await Category.insertMany(categories);
      console.log("Categories seeded");
    }

    // Admin
    const adminExists = await User.findOne({ email: "admin@myjobportal.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin",
        email: "admin@myjobportal.com",
        password: hashedPassword,
        role: "admin"
      });
      console.log("Admin user seeded");
    }

    // Dummy Jobs
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      const sscCat = await Category.findOne({ slug: "ssc" });
      const bankCat = await Category.findOne({ slug: "banking" });
      const itCat = await Category.findOne({ slug: "it-jobs" });

      const dummyJobs = [
        {
          title: "SSC CGL 2026 Recruitment",
          organization: "Staff Selection Commission",
          type: "Govt",
          category: sscCat?._id,
          qualification: "Graduate",
          age_limit: "18-32 years",
          salary: "Level 4 to Level 8",
          start_date: new Date("2026-02-01"),
          last_date: new Date("2026-03-15"),
          official_website: "https://ssc.nic.in",
          apply_link: "https://ssc.nic.in/apply",
          notification_pdf: "https://ssc.nic.in/notification.pdf",
          location: "All India",
          experience_level: "Entry",
          description: "Staff Selection Commission (SSC) has released the notification for Combined Graduate Level (CGL) Exam 2026.",
          tags: "ssc, cgl, govt job, graduate"
        },
        {
          title: "IBPS PO XI Recruitment",
          organization: "Institute of Banking Personnel Selection",
          type: "Govt",
          category: bankCat?._id,
          qualification: "Any Degree",
          age_limit: "20-30 years",
          salary: "Rs. 52,000 - 55,000",
          start_date: new Date("2026-02-10"),
          last_date: new Date("2026-03-05"),
          official_website: "https://ibps.in",
          apply_link: "https://ibps.in/apply",
          notification_pdf: "https://ibps.in/po-notification.pdf",
          location: "All India",
          experience_level: "Entry",
          description: "IBPS invites applications for the post of Probationary Officers (PO) in various participating banks.",
          tags: "banking, ibps, po, bank job"
        },
        {
          title: "Software Engineer (Frontend)",
          organization: "Tech Solutions India",
          type: "Private",
          category: itCat?._id,
          qualification: "B.Tech/BE/MCA",
          age_limit: "N/A",
          salary: "8 - 12 LPA",
          start_date: new Date("2026-02-20"),
          last_date: new Date("2026-04-01"),
          official_website: "https://techsolutions.com",
          apply_link: "https://techsolutions.com/careers",
          notification_pdf: "https://techsolutions.com/jd.pdf",
          location: "Bangalore",
          experience_level: "Mid",
          description: "Join our dynamic team as a Frontend Developer. Expertise in React and Tailwind CSS required.",
          tags: "it, software, react, bangalore"
        }
      ];
      await Job.insertMany(dummyJobs);
      console.log("Dummy jobs seeded");
    }
  } catch (err) {
    console.error("Seeding error:", err);
  }
}
