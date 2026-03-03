import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { 
  User as UserIcon, Briefcase, Bookmark, ArrowRight, Plus, 
  Bell, Users, Trash2, Settings, ShieldCheck, Mail, Phone, 
  Lock, Eye, EyeOff, Save, Loader2, LayoutDashboard, 
  CheckCircle2, ChevronRight, Sparkles, Database, FileText,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../lib/api";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";

export const Dashboard = () => {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "shortlist" | "security">("overview");
  
  // Data States
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  // Form States
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || ""
  });
  const [passForm, setPassForm] = useState({ old: "", new: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const savedRes = await api.get("/jobs/saved");
        setSavedJobs(Array.isArray(savedRes.data) ? savedRes.data : []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchDashboardData();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await api.put("/auth/profile", profileForm);
      if (setUser) setUser({ ...user, ...res.data.user });
      setStatusMsg({ type: "success", text: "IDENTITY UPDATED" });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.response?.data?.error || "UPDATE FAILED" });
    } finally { setIsUpdating(false); }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.new !== passForm.confirm) return setStatusMsg({ type: "error", text: "PASSWORDS MISMATCH" });
    setIsUpdating(true);
    try {
      await api.put("/auth/change-password", { oldPassword: passForm.old, newPassword: passForm.new });
      setStatusMsg({ type: "success", text: "SECURITY KEY UPDATED" });
      setPassForm({ old: "", new: "", confirm: "" });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "INVALID CURRENT PASSWORD" });
    } finally { setIsUpdating(false); }
  };

  if (!user) return <div className="py-20 text-center font-black text-slate-400 tracking-tighter">ACCESS DENIED</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      
      {/* 1. Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] tracking-[0.2em] uppercase">
            <ShieldCheck size={14} /> Encrypted Workspace
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium">Manage your career trajectory and security credentials.</p>
        </div>

        {/* Advanced Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-[24px] overflow-x-auto no-scrollbar">
          {[
            { id: "overview", label: "Overview", icon: <LayoutDashboard size={16}/> },
            { id: "shortlist", label: "Shortlist", icon: <Bookmark size={16}/> },
            { id: "security", label: "Security", icon: <Lock size={16}/> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setStatusMsg({type:"", text:""}); }}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id 
                ? "bg-white text-indigo-600 shadow-xl shadow-indigo-500/10 scale-105" 
                : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* 2. Sidebar Identity Card */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="bg-white rounded-[40px] border border-slate-100 p-10 text-center shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-1000"></div>
            
            <div className="relative inline-block mb-6">
              <div className="h-24 w-24 bg-indigo-50 rounded-[32px] flex items-center justify-center mx-auto border-4 border-white shadow-2xl">
                <UserIcon size={44} className="text-indigo-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 size={14} className="text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{user.name}</h3>
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{user.role} Member</span>
              <span className="text-indigo-600 text-[11px] font-bold">{user.email}</span>
            </div>

            {/* Quick Management Links (Admin Only) */}
            {user.role === "admin" && (
              <div className="mt-8 pt-8 border-t border-slate-50 space-y-2">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Administration</p>
                <Link to="/admin/jobs" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl transition-all group/link">
                  <span className="text-xs font-bold text-slate-600 group-hover/link:text-indigo-600">Manage Board</span>
                  <Settings size={14} className="text-slate-300 group-hover/link:text-indigo-600"/>
                </Link>
                <Link to="/admin/users" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl transition-all group/link">
                  <span className="text-xs font-bold text-slate-600 group-hover/link:text-indigo-600">User Registry</span>
                  <Users size={14} className="text-slate-300 group-hover/link:text-indigo-600"/>
                </Link>
                <Link to="/admin/content" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl transition-all group/link">
                  <span className="text-xs font-bold text-slate-600 group-hover/link:text-indigo-600">Content Hub</span>
                  <FileText size={14} className="text-slate-300 group-hover/link:text-indigo-600"/>
                </Link>
              </div>
            )}
          </motion.div>

          <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
            <Sparkles className="absolute -right-4 -top-4 text-white/10 w-24 h-24 -rotate-12" />
            <h4 className="text-xl font-black italic tracking-tighter">Premium Access</h4>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">Unlock instant SMS alerts for district-level government openings.</p>
            <button className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-indigo-600/20">Upgrade Now</button>
          </div>
        </div>

        {/* 3. Main Display Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div key="ov" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-8 group hover:border-indigo-100 transition-colors">
                    <div className="h-20 w-20 bg-emerald-50 rounded-[24px] flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shadow-inner"><Briefcase size={32}/></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pinned Vacancies</p>
                      <p className="text-5xl font-black text-slate-900 leading-none">{savedJobs.length}</p>
                    </div>
                  </div>
                  {user.role === 'admin' && (
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-8 group hover:border-purple-100 transition-colors">
                      <div className="h-20 w-20 bg-purple-50 rounded-[24px] flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform shadow-inner"><Users size={32}/></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Talents</p>
                        <p className="text-5xl font-black text-slate-900 leading-none">248</p> {/* Dynamic data point */}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 flex items-center gap-3">
                     <Plus className="text-indigo-600" /> Rapid Actions
                   </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Link to="/jobs/post" className="flex items-center justify-between p-6 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-3xl transition-all group">
                        <div className="font-bold">Broadcast New Job</div>
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
                     </Link>
                     <Link to="/notifications/post" className="flex items-center justify-between p-6 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-3xl transition-all group">
                        <div className="font-bold">Post Exam Alert</div>
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
                     </Link>
                   </div>
                </div>
              </motion.div>
            )}

            {/* SHORTLIST TAB */}
            {activeTab === "shortlist" && (
              <motion.div key="sl" initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-1 gap-5">
                {loading ? (
                   [1,2,3].map(i => <div key={i} className="h-32 bg-slate-50 animate-pulse rounded-[32px]"/>)
                ) : savedJobs.length > 0 ? (
                  savedJobs.map((job) => (
                    <Link key={job.id} to={`/jobs/${job.id}`} className="group bg-white p-8 rounded-[40px] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <div className="h-16 w-16 bg-slate-50 rounded-[20px] flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors border border-slate-100">
                          <Briefcase size={24}/>
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-xl leading-none mb-2 group-hover:text-indigo-600 transition-colors">{job.title}</h4>
                          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span className="flex items-center gap-1.5"><Database size={12}/> {job.organization}</span>
                            <span className="text-red-500">Expires: {formatDate(job.last_date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ChevronRight size={24}/>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-32 bg-white rounded-[50px] border-2 border-dashed border-slate-100">
                     <Bookmark size={48} className="mx-auto text-slate-100 mb-6"/>
                     <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">Archive Empty</p>
                     <Link to="/jobs" className="mt-6 inline-block px-8 py-3 bg-indigo-50 text-indigo-600 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-indigo-100">Discover Jobs</Link>
                  </div>
                )}
              </motion.div>
            )}

            {/* SECURITY & IDENTITY TAB */}
            {activeTab === "security" && (
              <motion.div key="sec" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-10">
                
                {/* 3a. Personal Identity Form */}
                <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <UserIcon className="text-indigo-600" size={24} /> Identity Profile
                  </h3>
                  <form onSubmit={handleUpdateProfile} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Legal Name</label>
                        <input 
                          type="text" value={profileForm.name} 
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full px-6 py-5 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Verified Mobile</label>
                        <div className="relative">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            type="text" value={profileForm.phone} 
                            onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">System Email (Locked)</label>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            type="email" value={profileForm.email} readOnly
                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-3xl outline-none font-bold text-slate-400 cursor-not-allowed italic"
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" disabled={isUpdating} className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-2xl shadow-slate-200">
                       {isUpdating ? <Loader2 className="animate-spin" size={20}/> : <><Save size={20}/> Commit Updates</>}
                    </button>
                  </form>
                </div>

                {/* 3b. Security Cryptography Form */}
                <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <Lock className="text-indigo-600" size={24} /> Authentication Key
                  </h3>
                  <form onSubmit={handleUpdatePassword} className="space-y-8">
                    <div className="relative group">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                      <input 
                        type={showPass ? "text" : "password"} 
                        placeholder="Verify Current Key"
                        value={passForm.old}
                        onChange={(e) => setPassForm({...passForm, old: e.target.value})}
                        className="w-full pl-14 pr-16 py-5 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-slate-900 shadow-inner"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                        {showPass ? <EyeOff size={22}/> : <Eye size={22}/>}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <input 
                        type="password" placeholder="Define New Key"
                        value={passForm.new}
                        onChange={(e) => setPassForm({...passForm, new: e.target.value})}
                        className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-slate-900 shadow-inner"
                      />
                      <input 
                        type="password" placeholder="Confirm New Key"
                        value={passForm.confirm}
                        onChange={(e) => setPassForm({...passForm, confirm: e.target.value})}
                        className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-slate-900 shadow-inner"
                      />
                    </div>
                    <button type="submit" disabled={isUpdating} className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/20 active:scale-95">
                      Update Security Key
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Persistent Status Toast */}
      <AnimatePresence>
        {statusMsg.text && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className={`fixed bottom-10 right-10 px-8 py-5 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-4 font-black text-xs uppercase tracking-[0.2em] z-[100] border backdrop-blur-md ${
              statusMsg.type === 'success' ? 'bg-slate-900/90 text-emerald-400 border-emerald-500/20' : 'bg-slate-900/90 text-red-400 border-red-500/20'
            }`}
          >
            {statusMsg.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
            {statusMsg.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};