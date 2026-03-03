import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../lib/api";
import { 
  Lock, Loader2, ChevronLeft, ArrowRight, 
  ShieldCheck, AlertCircle, Eye, EyeOff, 
  CheckCircle2, Fingerprint, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ResetPassword = () => {
  // Logic: Retrieve token from the URL path /reset-password/:token
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Security token missing. Please request a new link.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Security key must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      // Hits: POST /api/auth/reset-password/:token
      await api.post(`/auth/reset-password/${token}`, { password });
      setSuccess(true);
      // Auto redirect to login after a short delay
      setTimeout(() => navigate("/login"), 4000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Authorization failed. Token may be expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden bg-[#f8fafc]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative"
      >
        {/* Modern Reset Card */}
        <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 p-10 lg:p-12 overflow-hidden relative">
          
          {/* Top Gradient Accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500"></div>

          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-indigo-50 rounded-[28px] mb-2 text-indigo-600 shadow-inner">
              <ShieldCheck size={40} />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                DEFINE <br /> <span className="text-indigo-600">NEW KEY</span>
              </h1>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Authorized Identity Override</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 text-center"
              >
                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[32px] space-y-4">
                  <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Identity Restored</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Your security key has been successfully updated. Redirecting to mainframe login...
                    </p>
                  </div>
                </div>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 w-full py-5 bg-slate-900 text-white font-black rounded-[24px] text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
                >
                  Return to Login <ArrowRight size={16} />
                </Link>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {/* Error Box */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-red-50 text-red-600 p-4 rounded-2xl text-[11px] font-black uppercase tracking-tight border border-red-100 flex items-center gap-3"
                    >
                      <ShieldAlert size={18} />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">New Security Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      disabled={!token}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-14 pr-16 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner placeholder-slate-300 disabled:opacity-50"
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

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Confirm New Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      disabled={!token}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner placeholder-slate-300 disabled:opacity-50"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || !token}
                    className="w-full py-5 bg-slate-900 text-white font-black rounded-[24px] shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center disabled:opacity-50 group active:scale-95 text-xs tracking-widest uppercase"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Commit Changes
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                {/* Secure Badge */}
                <div className="pt-6 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                  <Fingerprint size={12} /> System-Level Encryption
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center">
          <Link to="/login" className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
            <ChevronLeft size={14} /> Abort and return to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};