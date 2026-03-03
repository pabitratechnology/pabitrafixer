import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../lib/api";
import { 
  Mail, Lock, Loader2, ArrowRight, 
  ShieldCheck, Eye, EyeOff, Sparkles, 
  Fingerprint, KeyRound 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Clean data before sending (matches backend logic)
      const res = await api.post("/auth/login", { 
        email: email.toLowerCase().trim(), 
        password 
      });
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Authentication failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden bg-[#f8fafc]">
      
      {/* 1. Modern Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative"
      >
        {/* 2. Premium Login Card */}
        <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 p-10 lg:p-12 overflow-hidden relative">
          
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 to-cyan-500"></div>

          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-indigo-50 rounded-[28px] mb-2 text-indigo-600 shadow-inner">
              <ShieldCheck size={40} />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                RESTORE <br /> <span className="text-indigo-600">SESSION</span>
              </h1>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Authorized Personnel Only</p>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-red-50 text-red-600 p-4 rounded-2xl text-[11px] font-black uppercase tracking-tight border border-red-100 mb-8 flex items-center gap-3"
              >
                <Fingerprint size={18} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Access Identifier (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                  placeholder="name@official.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Key</label>
                <Link 
                  to="/forgot-password" 
                  className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-16 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-slate-900 text-white font-black rounded-[24px] shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center disabled:opacity-50 group active:scale-95 text-xs tracking-widest uppercase mt-4"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Authorize & Sign In
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* 3. Footer Links */}
          <div className="mt-10 text-center space-y-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
              New to the mainframe?{" "}
              <Link to="/register" className="text-indigo-600 font-black hover:underline underline-offset-4 decoration-2">
                Apply for Access
              </Link>
            </p>
            <div className="flex items-center justify-center gap-2 pt-4 opacity-30">
               <div className="h-[1px] w-8 bg-slate-900"></div>
               <Sparkles size={14} className="text-slate-900" />
               <div className="h-[1px] w-8 bg-slate-900"></div>
            </div>
          </div>
        </div>

        {/* Global Security Subtext */}
        <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
          <KeyRound size={12} /> End-to-End Encrypted Identity
        </p>
      </motion.div>
    </div>
  );
};