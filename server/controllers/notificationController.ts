import { AdmitCard, Result, AnswerKey } from "../models/index.js";

/**
 * ==========================================
 * 1. ADMIT CARDS
 * ==========================================
 */
export const getAdmitCards = async (req: any, res: any) => {
  try {
    const admitCards = await AdmitCard.find().sort({ created_at: -1 }).lean();
    res.json(admitCards.map(ac => ({ ...ac, id: ac._id })));
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch admit cards" });
  }
};

export const createAdmitCard = async (req: any, res: any) => {
  try {
    const admitCard = await AdmitCard.create(req.body);
    res.status(201).json({ id: admitCard._id, message: "Admit card published" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAdmitCard = async (req: any, res: any) => {
  try {
    const deleted = await AdmitCard.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Admit card not found" });
    res.json({ message: "Admit card deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * ==========================================
 * 2. EXAM RESULTS
 * ==========================================
 */
export const getResults = async (req: any, res: any) => {
  try {
    const results = await Result.find().sort({ created_at: -1 }).lean();
    res.json(results.map(r => ({ ...r, id: r._id })));
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
};

export const createResult = async (req: any, res: any) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json({ id: result._id, message: "Result published" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteResult = async (req: any, res: any) => {
  try {
    const deleted = await Result.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Result not found" });
    res.json({ message: "Result deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * ==========================================
 * 3. ANSWER KEYS
 * ==========================================
 */
export const getAnswerKeys = async (req: any, res: any) => {
  try {
    const keys = await AnswerKey.find().sort({ release_date: -1 }).lean();
    // standardized mapping to include 'id'
    res.json(keys.map(k => ({ ...k, id: k._id })));
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch answer keys" });
  }
};

export const createAnswerKey = async (req: any, res: any) => {
  try {
    const newKey = await AnswerKey.create(req.body);
    res.status(201).json({ id: newKey._id, message: "Answer key published" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAnswerKey = async (req: any, res: any) => {
  try {
    const deleted = await AnswerKey.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Answer key not found" });
    res.json({ message: "Answer key deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};