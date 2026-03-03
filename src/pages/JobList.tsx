import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../lib/api";
import { 
  Search, Filter, MapPin, Calendar, Briefcase, 
  Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, 
  X, SlidersHorizontal, Info, Globe, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../lib/utils";
import { useAuth } from "../hooks/useAuth";

export const JobList = () => {
  const { user, toggleSaveJob } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<any[]>([]);

  // Local filter state initialized from URL
  const [filters, setFilters] = useState({
    type: queryParams.get("type") || "",
    category: queryParams.get("category") || "",
    search: queryParams.get("search") || "",
    location: queryParams.get("location") || "",
    experience: queryParams.get("experience") || "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Categories fetch error:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.type) params.append("type", filters.type);
        if (filters.category) params.append("category", filters.category);
        if (filters.search) params.append("search", filters.search);
        if (filters.location) params.append("location", filters.location);
        if (filters.experience) params.append("experience", filters.experience);
        params.append("page", page.toString());
        params.append("limit", "10");
        
        const res = await api.get(`/jobs?${params.toString()}`);
        setJobs(res.data.jobs || []);
        setTotalPages(res.data.pages || 1);
        setTotalResults(res.data.total || 0);
      } catch (err) {
        console.error("Jobs fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filters, page]);

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPage(1);
    
    // Sync URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.append(k, v as string);
    });
    navigate(`/jobs?${params.toString()}`, { replace: true });
  };

  const resetFilters = () => {
    const empty = { type: "", category: "", search: "", location: "", experience: "" };
    setFilters(empty);
    setPage(1);
    navigate("/jobs");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] tracking-widest uppercase">
            <Sparkles size={14} /> 
            Discover Opportunities
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Job Board
          </h1>
          <p className="text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">{totalResults}</span> active positions
          </p>
        </div>

        {/* Search Bar Integration */}
        <div className="flex flex-wrap gap-3">
          <div className="relative group w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600" />
            <input
              type="text"
              placeholder="Job title or keywords..."
              value={filters.search}
              onChange={(e) => updateFilters("search", e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none font-medium transition-all"
            />
          </div>
          <div className="relative group w-full sm:w-48">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600" />
            <input
              type="text"
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => updateFilters("location", e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none font-medium transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* 2. Advanced Filters Sidebar (Sticky) */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <SlidersHorizontal size={16} className="text-indigo-600" />
                  Filters
                </h3>
                <button 
                  onClick={resetFilters}
                  className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-tighter"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Job Type */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Sector</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Govt", "Private", "Internship", "Remote"].map((t) => (
                      <button
                        key={t}
                        onClick={() => updateFilters("type", filters.type === t ? "" : t)}
                        className={`px-4 py-2 text-left rounded-xl text-xs font-bold transition-all border ${
                          filters.type === t 
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100" 
                            : "bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry Category */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry</label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilters("category", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold text-slate-700"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Experience Level */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</label>
                  <select
                    value={filters.experience}
                    onChange={(e) => updateFilters("experience", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-600 outline-none text-xs font-bold text-slate-700"
                  >
                    <option value="">Any Level</option>
                    <option value="Entry">Freshers / Entry</option>
                    <option value="Mid">Mid Level (2-5 yrs)</option>
                    <option value="Senior">Senior Level (5+ yrs)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* 3. Job Listings Area */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-40 bg-slate-50 animate-pulse rounded-[32px] border border-slate-100" />
                ))}
              </motion.div>
            ) : jobs.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                {jobs.map((job) => (
                  <motion.div
                    key={job._id}
                    layout
                    whileHover={{ y: -4 }}
                    className="bg-white border border-slate-100 rounded-[32px] p-8 transition-all hover:border-indigo-100 hover:shadow-2xl hover:shadow-slate-200/50 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            job.type === 'Govt' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}>
                            {job.type}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                            {job.category?.name || job.category_name || "General"}
                          </span>
                        </div>
                        
                        <Link to={`/jobs/${job._id}`}>
                          <h2 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                            {job.title}
                          </h2>
                        </Link>

                        <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-slate-500 font-bold">
                          <div className="flex items-center gap-2">
                            <Globe size={16} className="text-slate-300" />
                            {job.organization}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-slate-300" />
                            {job.location || 'India'}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-slate-300" />
                            {formatDate(job.created_at)}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-50 pt-6 md:pt-0 md:pl-8">
                        <div className="text-left md:text-right">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Last Date</p>
                          <p className="text-sm font-black text-red-600">{formatDate(job.last_date)}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {user && (
                            <button
                              onClick={() => toggleSaveJob(job._id)}
                              className="p-3 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition-all"
                            >
                              {user.saved_jobs?.includes(job._id) ? (
                                <BookmarkCheck className="h-5 w-5 text-indigo-600 fill-indigo-600" />
                              ) : (
                                <Bookmark className="h-5 w-5 text-slate-400" />
                              )}
                            </button>
                          )}
                          <Link
                            to={`/jobs/${job._id}`}
                            className="px-6 py-3.5 bg-slate-900 text-white text-xs font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
                          >
                            DETAILS
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-slate-100"
              >
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No Matching Jobs</h3>
                <p className="text-slate-500 font-medium mb-8">We couldn't find any positions matching your current filters.</p>
                <button 
                  onClick={resetFilters}
                  className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100"
                >
                  Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. Polished Pagination System */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-12">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="p-3 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Only show current, first, last, and immediate neighbors
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`h-10 w-10 rounded-xl font-black text-xs transition-all ${
                          page === pageNum
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110"
                            : "text-slate-400 hover:text-slate-900"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return <span key={pageNum} className="text-slate-300 px-1">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="p-3 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};