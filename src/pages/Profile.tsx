import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../lib/api";
import { 
  User as UserIcon, Mail, Phone, FileText, Lock, 
  Loader2, CheckCircle2, Camera, ChevronLeft, 
  Save, Sparkles, ShieldCheck, Eye, EyeOff,
  BarChart3, Bookmark, Fingerprint,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
        bio: user.bio || ""
      }));
    }
  }, [user]);

  // Calculate profile completeness %
  const completeness = [user?.name, user?.phone, user?.bio].filter(Boolean).length * 33.3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      setStatus({ type: "error", msg: "Passwords do not match" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await api.put("/auth/profile", formData);
      const token = localStorage.getItem("token");
      if (token && login) login(token, res.data.user);
      
      setStatus({ type: "success", msg: "IDENTITY UPDATED" });
      setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
      
      // Auto-clear success message
      setTimeout(() => setStatus({ type: "", msg: "" }), 5000);
    } catch (err: any) {
      setStatus({ type: "error", msg: err.response?.data?.error || "Update rejected" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 bg-[#f8fafc]">
      
      {/* 1. Page Header */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft className="h-3 w-3 mr-1" />
          Back to Command Center
        </button>
        <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
           <ShieldCheck size={14}/> Secure Identity Management
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* 2. Left Column: Identity Card */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[40px] border border-slate-100 p-10 text-center shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500"></div>
            
            <div className="relative inline-block mb-8">
              <div className="h-32 w-32 bg-indigo-50 rounded-[38px] flex items-center justify-center text-indigo-600 text-5xl font-black border-4 border-white shadow-2xl transition-transform group-hover:scale-105 duration-500">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-2 -right-2 p-3 bg-slate-900 text-white rounded-2xl border-4 border-white shadow-xl hover:bg-indigo-600 transition-all active:scale-90">
                <Camera size={18} />
              </button>
            </div>

            <div className="space-y-1 mb-8">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{user.name}</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{user.email}</p>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
              user.role === 'admin' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 
              user.role === 'recruiter' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
              'bg-slate-100 text-slate-500 border border-slate-200'
            }`}>
              <Fingerprint size={12}/> {user.role} Authorization
            </div>

            {/* Completeness Tracker */}
            <div className="mt-10 pt-10 border-t border-slate-50 text-left space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Health</span>
                <span className="text-xs font-black text-indigo-600">{Math.round(completeness)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${completeness}%` }}
                   className="h-full bg-indigo-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Submissions</p>
                <p className="text-2xl font-black text-slate-900 italic">0</p>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Shortlisted</p>
                <p className="text-2xl font-black text-slate-900 italic">{user.saved_jobs?.length || 0}</p>
             </div>
          </div>
        </div>

        {/* 3. Right Column: Configuration Area */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm space-y-12"
          >
            <section className="space-y-8">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                <Sparkles className="text-indigo-600" /> Identity Settings
              </h2>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Display Name</label>
                    <div className="relative group">
                      <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                      <input
                        type="text" name="name" required
                        value={formData.name} onChange={handleChange}
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                        placeholder="Legal name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Mobile Terminal</label>
                    <div className="relative group">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                      <input
                        type="tel" name="phone"
                        value={formData.phone} onChange={handleChange}
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Member Bio</label>
                  <div className="relative group">
                    <FileText className="absolute left-6 top-6 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <textarea
                      name="bio" rows={4}
                      value={formData.bio} onChange={handleChange}
                      className="w-full pl-14 pr-6 py-6 bg-slate-50 border-none rounded-[32px] focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-medium text-slate-600 transition-all shadow-inner resize-none"
                      placeholder="Brief overview of your qualifications..."
                    />
                  </div>
                </div>

                {/* --- Security Layer --- */}
                <div className="pt-10 border-t border-slate-50 space-y-8">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                    <Lock className="text-indigo-600" /> Security Override
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">New Security Key</label>
                      <div className="relative group">
                         <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input
                          type={showPass ? "text" : "password"}
                          name="password"
                          value={formData.password} onChange={handleChange}
                          className="w-full pl-14 pr-16 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                          placeholder="••••••••"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors">
                          {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Confirm Key</label>
                      <input
                        type={showPass ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword} onChange={handleChange}
                        className="w-full px-8 py-5 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-indigo-500/5 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center disabled:opacity-50 gap-3 active:scale-95 group text-xs tracking-widest uppercase"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Save size={18} />
                        Authorize Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </section>
          </motion.div>
        </div>
      </div>

      {/* Floating Status Toast */}
      <AnimatePresence>
        {status.msg && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className={`fixed bottom-10 right-10 px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-4 font-black text-xs uppercase tracking-[0.2em] z-[100] border backdrop-blur-md ${
              status.type === 'success' ? 'bg-slate-900 text-emerald-400 border-emerald-500/20' : 'bg-slate-900 text-red-400 border-red-500/20'
            }`}
          >
            {status.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
            {status.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};