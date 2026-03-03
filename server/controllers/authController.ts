import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/index";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

/**
 * REGISTER: Creates a new user with extended profile support
 */
export const register = async (req: any, res: any) => {
  const { name, email, password, phone, bio } = req.body;
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password: hashedPassword,
      phone: phone || "",
      bio: bio || ""
    });

    res.status(201).json({ 
      id: user._id, 
      name: user.name, 
      email: user.email,
      message: "Account created successfully"
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * LOGIN: Secure authentication with comprehensive user payload
 */
export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    // FIX Line 48: Cast user.password to string to satisfy bcrypt
    if (!user || !(await bcrypt.compare(password, user.password as unknown as string))) {
      return res.status(401).json({ error: "Invalid email or password credentials." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: "1d" }
    );

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        phone: user.phone, 
        bio: user.bio,
        profile_image: (user as any).profile_image 
      } 
    });
  } catch (err: any) {
    res.status(500).json({ error: "Server error during login process." });
  }
};

/**
 * GET PROFILE
 */
export const getProfile = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * UPDATE PROFILE: Advanced self-service profile management
 */
export const updateProfile = async (req: any, res: any) => {
  const { name, phone, bio, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User account not found." });

    if (email && email.toLowerCase() !== (user as any).email) {
      const emailTaken = await User.findOne({ email: email.toLowerCase() });
      if (emailTaken) return res.status(400).json({ error: "This email is already taken." });
      // FIX Line 110: Cast to any to bypass NativeDate error
      (user as any).email = email.toLowerCase().trim();
    }

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;
    
    if (password) {
      // FIX Line 200: Force string assignment
      const hashed = await bcrypt.hash(password, 10);
      (user as any).password = hashed;
    }

    await user.save();

    res.json({ 
      message: "Profile updated successfully", 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        phone: user.phone, 
        bio: user.bio 
      } 
    });
  } catch (err: any) {
    res.status(400).json({ error: "Failed to update profile: " + err.message });
  }
};

/**
 * GET ALL USERS (Admin)
 */
export const getUsers = async (req: any, res: any) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ created_at: -1 });
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch user directory." });
  }
};

/**
 * UPDATE ANY USER (Admin)
 */
export const updateUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (id === req.user.id && role && role !== 'admin') {
      return res.status(400).json({ error: "Security Restriction: You cannot remove your own administrative privileges." });
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: "Management update failed." });
  }
};

/**
 * DELETE USER (Admin)
 */
export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (id === req.user.id) {
      return res.status(400).json({ error: "Security Restriction: You cannot delete your own account." });
    }
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Member successfully purged." });
  } catch (err: any) {
    res.status(500).json({ error: "Purge operation failed." });
  }
};

/**
 * FORGOT PASSWORD
 */
export const forgotPassword = async (req: any, res: any) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ error: "No account found with this email." });

    const token = crypto.randomBytes(20).toString("hex");
    (user as any).resetPasswordToken = token;
    (user as any).resetPasswordExpires = new Date(Date.now() + 3600000); 
    await user.save();

    res.json({ message: "Security reset token generated.", token, resetLink: `/reset-password/${token}` });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to generate recovery token." });
  }
};

/**
 * RESET PASSWORD
 */
export const resetPassword = async (req: any, res: any) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: "The recovery link is invalid or has expired." });
    }

    // FIX Line 231: Bypass NativeDate error
    const hashed = await bcrypt.hash(password, 10);
    (user as any).password = hashed;
    (user as any).resetPasswordToken = undefined;
    (user as any).resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful." });
  } catch (err: any) {
    res.status(500).json({ error: "Password reset operation failed." });
  }
};