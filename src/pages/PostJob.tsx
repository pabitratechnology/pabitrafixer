import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { 
  Briefcase, MapPin, Calendar, FileText, Globe, GraduationCap, 
  DollarSign, Loader2, Plus, ChevronLeft, Save, Sparkles, 
  Database, ShieldCheck, Info, Users, Clock, BookOpen, Send,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    type: "Govt",
    category: "",
    description: "",
    location: "",
    salary: "",
    qualification: "",
    experience_level: "Entry",
    start_date: "",
    last_date: "",
    official_website: "",
    apply_link: "",
    notification_pdf: "",
    age_limit: "",
    vacancies: "",
    state: "",
    district: "",
    syllabus: "",
    selection_process: "",
    tags: ""
  });

  const odishaDistricts = [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Baudh", "Cuttack", "Deogarh", 
    "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", 
    "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", 
    "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
  ];

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry"
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
        if (res.data.length > 0 && !isEdit) {
          setFormData(prev => ({ ...prev, category: res.data[0]._id }));
        }
      } catch (err) {
        console.error("Category Fetch Error:", err);
      }
    };
    fetchCategories();
  }, [isEdit]);

  useEffect(() => {
    if (isEdit) {
      const fetchJob = async () => {
        try {
          const res = await api.get(`/jobs/${id}`);
          const job = res.data;
          setFormData({
            ...job,
            category: job.category?._id || job.category || "",
            start_date: job.start_date ? new Date(job.start_date).toISOString().split('T')[0] : "",
            last_date: job.last_date ? new Date(job.last_date).toISOString().split('T')[0] : "",
            vacancies: job.vacancies?.toString() || ""
          });
        } catch (err) {
          setError("Failed to load existing listing details.");
        } finally {
          setFetching(false);
        }
      };
      fetchJob();
    }
  }, [id, isEdit]);

  if (!user || (user.role !== "admin" && user.role !== "recruiter")) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-10 text-center">
        <ShieldCheck size={48} className="text-slate-300 mb-4" />
        <h1 className="text-3xl font-black text-slate-900 uppercase">Unauthorized</h1>
        <p className="text-slate-500 font-medium">You lack the necessary credentials to modify the job registry.</p>
        <button onClick={() => navigate("/")} className="mt-6 px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all">Go Home</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isEdit) {
        await api.put(`/jobs/${id}`, formData);
      } else {
        await api.post("/jobs", formData);
      }
      setSuccess(true);
      setTimeout(() => navigate("/admin/jobs"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "System failed to save the entry.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (fetching) return <div className="h-[80vh] flex items-center justify-center"><Loader2 size={40} className="animate-spin text-indigo-600" /></div>;

  if (success) return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-6">
      <motion.div initial={{scale:0}} animate={{scale:1}} className="h-24 w-24 bg-emerald-50 rounded-[40px] flex items-center justify-center border border-emerald-100">
         <CheckCircle2 size={48} className="text-emerald-500" />
      </motion.div>
      <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Broadcasting Live...</h1>
      <p className="text-slate-400 font-medium animate-pulse">Updating registry and redirecting to board...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
        <div className="space-y-4">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft size={14} className="mr-1" />
            Discard Draft
          </button>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            {isEdit ? "Edit" : "Post"} <br /> <span className="text-indigo-600">Listing</span>
          </h1>
        </div>
        <div className="bg-slate-900 px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3 text-indigo-400 font-black text-xs uppercase tracking-widest shadow-2xl">
          <Sparkles size={16} /> Broadcaster Access
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* SECTION 1: CORE IDENTITY */}
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm space-y-10">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
             <Database className="text-indigo-600" /> Core Meta-Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Job Designation *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:bg-white focus:ring-2 ring-indigo-500/20 transition-all shadow-inner" placeholder="e.g. IAS Officer" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Organization *</label>
              <input type="text" name="organization" required value={formData.organization} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:bg-white focus:ring-2 ring-indigo-500/20 transition-all shadow-inner" placeholder="e.g. UPSC" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Sector Category *</label>
              <select name="category" required value={formData.category} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 focus:bg-white focus:ring-2 ring-indigo-500/20 transition-all shadow-inner appearance-none">
                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: GEOGRAPHY */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm space-y-10">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
             <MapPin className="text-indigo-600" /> Zone Targeting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Target State</label>
              <select name="state" value={formData.state} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 shadow-inner">
                <option value="">All India</option>
                {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {formData.state === "Odisha" && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Specific District</label>
                <select name="district" value={formData.district} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 shadow-inner">
                  <option value="">All Districts</option>
                  {odishaDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Detailed Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-900 shadow-inner" placeholder="e.g. Bhubaneswar, Odisha" />
            </div>
          </div>
        </div>

        {/* SECTION 3: LOGISTICS & COMPENSATION */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm space-y-10">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
             <Briefcase className="text-indigo-600" /> Logistics & Remuneration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Job Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold">
                  <option value="Govt">Government</option>
                  <option value="Private">Private</option>
                  <option value="Internship">Internship</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Total Vacancies</label>
                <input type="number" name="vacancies" value={formData.vacancies} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold shadow-inner" placeholder="e.g. 1500" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Salary Package</label>
                <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold shadow-inner" placeholder="e.g. 50k - 80k PM" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Experience Level</label>
                <select name="experience_level" value={formData.experience_level} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold">
                   <option value="Entry">Entry (0-2 yrs)</option>
                   <option value="Mid">Mid (3-5 yrs)</option>
                   <option value="Senior">Senior (6+ yrs)</option>
                </select>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Required Qualification</label>
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold" placeholder="e.g. B.Tech / Any Graduate" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Age Limit</label>
                <input type="text" name="age_limit" value={formData.age_limit} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold" placeholder="e.g. 18 - 32 Years" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Search Tags (Comma separated)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold" placeholder="engineer, govt, delhi" />
             </div>
          </div>
        </div>

        {/* SECTION 4: CONTENT & SYLLABUS */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm space-y-10">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
             <BookOpen className="text-indigo-600" /> Syllabus & Modality
          </h2>
          <div className="space-y-8">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Job Description *</label>
                <textarea name="description" required rows={6} value={formData.description} onChange={handleChange} className="w-full px-6 py-5 bg-slate-50 border-none rounded-3xl outline-none font-medium text-slate-600 focus:bg-white transition-all shadow-inner resize-none" placeholder="Describe the mission and responsibilities..." />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Detailed Syllabus</label>
                  <textarea name="syllabus" rows={5} value={formData.syllabus} onChange={handleChange} className="w-full px-6 py-5 bg-slate-50 border-none rounded-3xl font-medium text-slate-600 shadow-inner resize-none" placeholder="Subjects and topics covered..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Selection Modality</label>
                  <textarea name="selection_process" rows={5} value={formData.selection_process} onChange={handleChange} className="w-full px-6 py-5 bg-slate-50 border-none rounded-3xl font-medium text-slate-600 shadow-inner resize-none" placeholder="e.g. CBT, Physical Test, Interview..." />
                </div>
             </div>
          </div>
        </div>

        {/* SECTION 5: SCHEDULE & DEPLOYMENT */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm space-y-10">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
             <Send className="text-indigo-600" /> Schedule & Live Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Start Date</label>
                <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Deadline *</label>
                <input type="date" name="last_date" required value={formData.last_date} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold ring-2 ring-red-500/10 focus:ring-red-500/20" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Authorize URL</label>
                <input type="url" name="apply_link" required value={formData.apply_link} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold shadow-inner" placeholder="https://..." />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Official PDF Link</label>
                <input type="url" name="notification_pdf" value={formData.notification_pdf} onChange={handleChange} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold shadow-inner" placeholder="https://..." />
             </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-6 rounded-3xl text-sm font-black uppercase tracking-widest border border-red-100 flex items-center gap-3">
            <ShieldCheck size={24} /> {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center disabled:opacity-50 active:scale-95 group text-xs tracking-widest uppercase"
        >
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              {isEdit ? "Authorize Changes" : "Push to Production"}
              {isEdit ? <Save size={20} className="ml-3" /> : <Plus size={20} className="ml-3 group-hover:rotate-90 transition-transform" />}
            </>
          )}
        </button>
      </form>
    </div>
  );
};