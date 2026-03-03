import React, { useState } from "react";
import api from "../lib/api";
import { 
  Mail, Loader2, ChevronLeft, ArrowRight, 
  ShieldCheck, AlertCircle, Sparkles, Send,
  Fingerprint, KeyRound, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(""); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Logic: Hits your advanced backend route
      const res = await api.post("/auth/forgot-password", { email: email.toLowerCase().trim() });
      setSuccess(true);
      // Backend returns 'resetToken' in the response for your testing
      setToken(res.data.resetToken); 
    } catch (err: any) {
      setError(err.response?.data?.error || "Identity verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden bg-[#f8fafc]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative"
      >
        {/* Main Card */}
        <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 p-10 lg:p-12 overflow-hidden">
          
          {/* Header Branding */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>
          
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-indigo-50 rounded-[28px] mb-2 text-indigo-600 shadow-inner">
              <KeyRound size={36} />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                REGAIN <br /> <span className="text-indigo-600">ACCESS</span>
              </h1>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Security Protocol 2.0</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[32px] text-center space-y-4">
                  <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Email Dispatched</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      Recovery instructions sent to <br />
                      <span className="text-emerald-600 font-bold italic">{email}</span>
                    </p>
                  </div>
                </div>
                
                {/* ADVANCED DEMO OVERRIDE LOGIC */}
                {token && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 bg-slate-900 rounded-[28px] border border-white/10 space-y-4 shadow-2xl"
                  >
                    <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                      <ShieldCheck size={14} /> System Override Key
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl font-mono text-[10px] text-indigo-200 break-all border border-white/5">
                      {token}
                    </div>
                    <Link 
                      to={`/reset-password/${token}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-500 transition-all active:scale-95"
                    >
                      GO TO RESET PORTAL <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                )}

                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft size={16} /> Return to Login
                </Link>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                {error && (
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-red-50 text-red-600 p-4 rounded-2xl text-[11px] font-black uppercase tracking-tight border border-red-100 flex items-center gap-3"
                  >
                    <AlertCircle size={18} />
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Authorized Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner placeholder-slate-300"
                      placeholder="Enter your system email"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-slate-900 text-white font-black rounded-[24px] shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center disabled:opacity-50 group active:scale-95 text-xs tracking-widest uppercase"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Request Reset Link
                        <Send size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                  
                  <Link to="/login" className="flex items-center justify-center gap-2 w-full py-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-colors">
                    <ChevronLeft size={14} /> Back to standard login
                  </Link>
                </div>

                {/* Footer Tip */}
                <div className="pt-6 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                  <Fingerprint size={12} /> Secure Identity Verification
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Support Section */}
        <p className="mt-8 text-center text-slate-400 text-xs font-medium">
          Still having trouble? <a href="#" className="text-indigo-600 font-black uppercase tracking-tighter hover:underline">Contact Support</a>
        </p>
      </motion.div>
    </div>
  );
};