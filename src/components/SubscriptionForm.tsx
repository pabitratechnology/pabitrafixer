import React, { useState } from "react";
import api from "../lib/api";
import { Mail, Loader2, CheckCircle2, Sparkles, Send, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    try {
      // Note: Ensure your backend endpoint matches "/api/subscribe"
      await api.post("/subscribe", { email });
      setStatus("success");
      setMessage("Success! Welcome to the inner circle.");
      setEmail("");
      setTimeout(() => setStatus("idle"), 8000);
    } catch (err: any) {
      setStatus("error");
      const errorMsg = err.response?.data?.error || "Connection error. Try again?";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      {/* Background Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[40px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-[#0f172a] rounded-[38px] p-8 md:p-16 text-white overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Animated Abstract Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-black uppercase tracking-widest">
              <Sparkles size={14} className="animate-pulse" />
              <span>Smart Job Alerts</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              Stay Ahead of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                The Competition
              </span>
            </h2>
            
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto">
              Join 50,000+ job seekers getting verified government and private job alerts daily.
            </p>
          </motion.div>

          {/* Form / Success State */}
          <div className="min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-white">{message}</h3>
                    <p className="text-slate-400 text-sm">Check your inbox for a confirmation email.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-lg space-y-6"
                >
                  <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        placeholder="yourname@email.com"
                        className={`w-full pl-14 pr-6 py-5 bg-white/5 border rounded-2xl text-white placeholder-slate-500 outline-none transition-all focus:bg-white/10 ${
                          status === "error" 
                            ? "border-red-500/50 ring-4 ring-red-500/10" 
                            : "border-white/10 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        }`}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 flex items-center justify-center gap-2 group/btn active:scale-95 whitespace-nowrap"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <span>GET STARTED</span>
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Error Feedback */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 text-red-400 text-sm font-bold bg-red-500/10 py-2 rounded-xl border border-red-500/20"
                      >
                        <AlertCircle size={14} />
                        {message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 opacity-40">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={14} /> No Spam, Ever
            </div>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              One-Click Unsubscribe
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};