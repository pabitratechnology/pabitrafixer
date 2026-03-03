import { Job, Category, User } from "../models/index";

/**
 * GET JOBS: Professional filtering, searching, and pagination
 */
export const getJobs = async (req: any, res: any) => {
  const { 
    type, category, search, location, experience, 
    state, district, page = 1, limit = 10, admin = false 
  } = req.query;
  
  const skip = (Number(page) - 1) * Number(limit);
  
  try {
    let filter: any = {};

    // 1. Visibility Logic
    if (admin !== "true") {
      filter.is_active = true;
      // Optionally only show jobs where the deadline hasn't passed:
      // filter.last_date = { $gte: new Date() };
    }
    
    // 2. Exact Match Filters
    if (type) filter.type = type;
    if (state) filter.state = state;
    if (district) filter.district = district;
    if (experience) filter.experience_level = experience;

    // 3. Category Logic (via Slug)
    if (category) {
      const foundCategory = await Category.findOne({ slug: category }).lean();
      if (foundCategory) filter.category = foundCategory._id;
    }

    // 4. Regex Search Filters (Case Insensitive)
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // 5. Global Text/Keywords Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { organization: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } } // Added description search
      ];
    }

    const total = await Job.countDocuments(filter);
    
    const jobs = await Job.find(filter)
      .populate("category", "name slug") // Only fetch needed fields
      .populate("posted_by", "name")     // Show who posted it
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(); // Lean makes the query much faster

    // Map _id to id for frontend compatibility
    const mappedJobs = jobs.map(j => ({
      ...j,
      id: j._id,
      category_name: (j.category as any)?.name
    }));

    res.json({
      jobs: mappedJobs,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve job database." });
  }
};

/**
 * GET JOB BY ID: Includes View Counting
 */
export const getJobById = async (req: any, res: any) => {
  try {
    // Increment view counter automatically on every visit
    const job = await Job.findByIdAndUpdate(
      req.params.id, 
      { $inc: { views: 1 } }, 
      { new: true }
    ).populate("category").populate("posted_by", "name");

    if (!job) return res.status(404).json({ error: "Job posting not found" });

    res.json({
      ...job.toObject(),
      id: job._id,
      category_name: (job.category as any)?.name
    });
  } catch (err: any) {
    res.status(500).json({ error: "Error fetching job details." });
  }
};

/**
 * CREATE JOB: Associates with current Admin/Recruiter
 */
export const createJob = async (req: any, res: any) => {
  try {
    // Inject the current user ID as the author
    const jobData = {
      ...req.body,
      posted_by: req.user.id 
    };

    const job = await Job.create(jobData);
    res.status(201).json({ id: job._id, message: "Job published successfully" });
  } catch (err: any) {
    res.status(400).json({ error: "Creation failed: " + err.message });
  }
};

/**
 * UPDATE JOB
 */
export const updateJob = async (req: any, res: any) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err: any) {
    res.status(400).json({ error: "Update failed" });
  }
};

/**
 * DELETE JOB
 */
export const deleteJob = async (req: any, res: any) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: "Delete operation failed" });
  }
};

/**
 * TOGGLE SAVE JOB: Optimized for performance
 */
export const toggleSaveJob = async (req: any, res: any) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // FIX Line 158: Cast to any to access array methods
    const jobIndex = (user as any).saved_jobs.indexOf(id);
    
    let isSaved = false;
    if (jobIndex > -1) {
      // FIX Line 162: Use splice to remove
      (user as any).saved_jobs.splice(jobIndex, 1);
      isSaved = false;
    } else {
      // FIX Line 165: Use push to add
      (user as any).saved_jobs.push(id);
      isSaved = true;
    }

    await user.save();
    res.json({ saved: isSaved });
  } catch (err: any) {
    res.status(500).json({ error: "Action failed" });
  }
};

/**
 * GET SAVED JOBS: Returns detailed objects for the user shortlist
 */
export const getSavedJobs = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "saved_jobs",
      populate: { path: "category" }
    }).lean();

    if (!user) return res.status(404).json({ error: "User not found" });
    
    const mappedJobs = user.saved_jobs.map((j: any) => ({
      ...j,
      id: j._id,
      category_name: j.category?.name
    }));

    res.json(mappedJobs);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to load your shortlist." });
  }
};