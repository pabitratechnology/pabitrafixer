import { Syllabus, PreviousPaper, StudyMaterial, Category } from "../models/index";

// ==========================================
// 1. SYLLABUS MANAGEMENT
// ==========================================

// Renamed from getSyllabusList to getSyllabus to match your Routes
export const getSyllabus = async (req: any, res: any) => {
  try {
    const list = await Syllabus.find()
      .populate("category", "name slug")
      .sort({ created_at: -1 });
    
    res.json(list.map(s => ({ ...s.toObject(), id: s._id })));
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch syllabus list" });
  }
};

export const getSyllabusById = async (req: any, res: any) => {
  try {
    const item = await Syllabus.findById(req.params.id).populate("category");
    if (!item) return res.status(404).json({ error: "Syllabus not found" });
    res.json({ ...item.toObject(), id: item._id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createSyllabus = async (req: any, res: any) => {
  try {
    const syllabus = await Syllabus.create(req.body);
    res.status(201).json({ id: syllabus._id, message: "Syllabus published" });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed: " + err.message });
  }
};

export const updateSyllabus = async (req: any, res: any) => {
  try {
    const syllabus = await Syllabus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!syllabus) return res.status(404).json({ error: "Item not found" });
    res.json(syllabus);
  } catch (err: any) {
    res.status(400).json({ error: "Update failed" });
  }
};

export const deleteSyllabus = async (req: any, res: any) => {
  try {
    const deleted = await Syllabus.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Item already removed" });
    res.json({ message: "Syllabus purged successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// 2. PREVIOUS PAPERS
// ==========================================

export const getPreviousPapers = async (req: any, res: any) => {
  try {
    const papers = await PreviousPaper.find().sort({ year: -1, created_at: -1 });
    res.json(papers.map(p => ({ ...p.toObject(), id: p._id })));
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch papers" });
  }
};

export const createPreviousPaper = async (req: any, res: any) => {
  try {
    const paper = await PreviousPaper.create(req.body);
    res.status(201).json({ id: paper._id, message: "Paper uploaded" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Added Update functionality for Previous Papers
export const updatePreviousPaper = async (req: any, res: any) => {
  try {
    const paper = await PreviousPaper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paper) return res.status(404).json({ error: "Paper not found" });
    res.json(paper);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePreviousPaper = async (req: any, res: any) => {
  try {
    await PreviousPaper.findByIdAndDelete(req.params.id);
    res.json({ message: "Paper removed" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// 3. STUDY MATERIALS
// ==========================================

export const getStudyMaterials = async (req: any, res: any) => {
  try {
    const materials = await StudyMaterial.find().sort({ created_at: -1 });
    res.json(materials.map(m => ({ ...m.toObject(), id: m._id })));
  } catch (err: any) {
    res.status(500).json({ error: "Failed to load materials" });
  }
};

export const createStudyMaterial = async (req: any, res: any) => {
  try {
    const material = await StudyMaterial.create(req.body);
    res.status(201).json({ id: material._id, message: "Material added" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Added Update functionality for Study Materials
export const updateStudyMaterial = async (req: any, res: any) => {
  try {
    const material = await StudyMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!material) return res.status(404).json({ error: "Material not found" });
    res.json(material);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteStudyMaterial = async (req: any, res: any) => {
  try {
    await StudyMaterial.findByIdAndDelete(req.params.id);
    res.json({ message: "Material deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};