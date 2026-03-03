import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { 
  MapPin, Calendar, Briefcase, Globe, FileText, 
  ChevronLeft, Share2, Bookmark, BookmarkCheck, 
  Info, Clock, Users, CheckCircle2, Copy, ArrowUpRight, 
  Sparkles, BookOpen, GraduationCap 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../lib/utils";
import { useAuth } from "../hooks/useAuth";

export const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, toggleSaveJob } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-12">
      <div className="h-10 bg-slate-100 rounded-xl w-1/4"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 h-[600px] bg-slate-50 rounded-[40px]"></div>
        <div className="h-[400px] bg-slate-50 rounded-[40px]"></div>
      </div>
    </div>
  );

  if (!job) return (
    <div className="text-center py-32 space-y-6">
      <Info size={48} className="mx-auto text-slate-200" />
      <h2 className="text-3xl font-black text-slate-900 uppercase">Entry Not Found</h2>
      <button onClick={() => navigate("/jobs")} className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest">Return to Board</button>
    </div>
  );

  const isSaved = user?.saved_jobs?.includes(job._id || job.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* 1. Top Navigation */}
      <div className="flex items-center justify-between mb-10">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft className="h-3 w-3 mr-1" />
          Back to Listings
        </button>
        <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
           <Sparkles size={14}/> Verified Notification
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* 2. Main Content Area */}
        <div className="lg:col-span-2 space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm space-y-10"
          >
            {/* Header Identity */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                  job.type === 'Govt' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                }`}>
                  {job.type} Sector
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-xl">
                  {job.category_name || job.category?.name || "General"}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-8 text-slate-500 font-bold">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-indigo-500 border border-slate-100">
                    <Briefcase size={20} />
                  </div>
                  {job.organization}
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-indigo-500 border border-slate-100">
                    <Globe size={20} />
                  </div>
                  {job.location || 'Pan India'}
                </div>
              </div>
            </div>

            {/* Advanced Quick Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 py-10 border-y border-slate-50">
              <div className="space-y-1">
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Remuneration</p>
                <p className="font-black text-slate-900">{job.salary || 'As per norms'}</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4 sm:pl-6">
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Total Slots</p>
                <p className="font-black text-indigo-600">{job.vacancies || 'N/A'}</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4 sm:pl-6">
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Experience</p>
                <p className="font-black text-slate-900">{job.experience_level || 'Entry'} Level</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4 sm:pl-6">
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Posted</p>
                <p className="font-black text-slate-900">{formatDate(job.start_date)}</p>
              </div>
              <div className="space-y-1 border-l border-slate-100 pl-4 sm:pl-6">
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Expiry</p>
                <p className="font-black text-red-600">{formatDate(job.last_date)}</p>
              </div>
            </div>

            {/* Geography Details (State/District) */}
            {(job.state || job.district) && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zone Mapping</h3>
                <div className="flex flex-wrap gap-2">
                  {job.state && (
                    <span className="px-5 py-2 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase flex items-center gap-2">
                      <MapPin size={14} className="text-indigo-400" /> {job.state}
                    </span>
                  )}
                  {job.district && (
                    <span className="px-5 py-2 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-2xl text-xs font-black uppercase flex items-center gap-2">
                      <MapPin size={14} /> {job.district}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Content Sections */}
            <div className="space-y-12">
              {/* Description */}
              <section className="space-y-4">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                  <FileText className="text-indigo-600" size={24} /> Brief Overview
                </h2>
                <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                  {job.description || "Refer to official notification for comprehensive description."}
                </div>
              </section>

              {/* Selection Process */}
              {job.selection_process && (
                <section className="space-y-4">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500" size={24} /> Selection Modality
                  </h2>
                  <div className="bg-emerald-50/30 p-8 rounded-[32px] border border-emerald-100 text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                    {job.selection_process}
                  </div>
                </section>
              )}

              {/* Syllabus Block */}
              {job.syllabus && (
                <section className="space-y-4">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <BookOpen className="text-indigo-600" size={24} /> Examination Syllabus
                  </h2>
                  <div className="bg-white p-8 rounded-[32px] border-2 border-dashed border-slate-200 text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                    {job.syllabus}
                  </div>
                </section>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-12 border-t border-slate-50">
              <a
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[3] inline-flex items-center justify-center px-10 py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-indigo-600 shadow-2xl shadow-slate-200 transition-all active:scale-95 group"
              >
                AUTHORIZE & APPLY ONLINE
                <ArrowUpRight size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              
              <div className="flex flex-1 gap-3">
                {user && (
                  <button
                    onClick={() => toggleSaveJob(job._id || job.id)}
                    className={`flex-1 p-5 rounded-3xl transition-all flex items-center justify-center border ${
                      isSaved ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck size={24} fill="currentColor" /> : <Bookmark size={24} />}
                  </button>
                )}
                <button 
                  onClick={handleShare}
                  className={`flex-1 p-5 rounded-3xl border transition-all flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest ${
                    copied ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {copied ? <CheckCircle2 size={24}/> : <Share2 size={24} />}
                  {copied && "Copied"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. Sticky Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-24 h-fit">
          {/* Important Links Card */}
          <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Resources</h3>
            <div className="space-y-4">
              <a
                href={job.notification_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 bg-red-50 hover:bg-red-100 text-red-700 rounded-3xl font-black transition-all border border-red-100"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} />
                  <span className="text-xs uppercase tracking-widest">Official PDF</span>
                </div>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              
              <a
                href={job.official_website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 bg-slate-900 hover:bg-indigo-600 text-white rounded-3xl font-black transition-all shadow-xl shadow-slate-200"
              >
                <div className="flex items-center gap-3">
                  <Globe size={20} />
                  <span className="text-xs uppercase tracking-widest">Govt Portal</span>
                </div>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Support Card */}
          <div className="bg-indigo-600 rounded-[40px] p-10 text-white space-y-6 shadow-2xl shadow-indigo-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black italic tracking-tighter leading-none">Application Trouble?</h3>
              <p className="text-indigo-100 text-sm font-medium leading-relaxed">
                Our team provides guidance on educational eligibility and certificate verification.
              </p>
              <button className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-50 active:scale-95">
                Contact Advisory
              </button>
            </div>
          </div>

          {/* Audit Timestamp */}
          <div className="px-6 text-center">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
              Verified: {formatDate(job.created_at)}
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
};