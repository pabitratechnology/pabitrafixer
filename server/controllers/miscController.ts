import { Category, AdmitCard, Result, Subscriber } from "../models/index";

export const getCategories = async (req: any, res: any) => {
  try {
    const categories = await Category.find();
    res.json(categories.map(c => ({ ...c.toObject(), id: c._id })));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdmitCards = async (req: any, res: any) => {
  try {
    const cards = await AdmitCard.find().sort({ created_at: -1 }).limit(20);
    res.json(cards);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getResults = async (req: any, res: any) => {
  try {
    const results = await Result.find().sort({ created_at: -1 }).limit(20);
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const subscribe = async (req: any, res: any) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  try {
    await Subscriber.create({ email });
    res.json({ message: "Subscribed successfully" });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already subscribed" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
