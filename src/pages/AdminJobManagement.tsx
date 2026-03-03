import React, { useEffect, useState, useCallback } from "react";
import api from "../lib/api";
import { 
  Search, Edit3, Trash2, Plus, Loader2, 
  ChevronLeft, ChevronRight, CheckCircle2, 
  XCircle, AlertCircle, RefreshCcw, Briefcase, 
  BarChart3, Globe, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";

export const AdminJobManagement = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "10");
      params.append("admin", "true");
      if (searchTerm) params.append("search", searchTerm);
      if (filterType) params.append("type", filterType);
      
      const res = await api.get(`/jobs?${params.toString()}`);
      setJobs(res.data.jobs || []);
      setTotalPages(res.data.pages || 1);
      setTotalJobs(res.data.total || 0);
    } catch (err) {
      console.error("Management fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [page, filterType, searchTerm]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await api.delete(`/jobs/${deleteId}`);
      setJobs(jobs.filter(j => (j._id || j.id) !== deleteId));
      setDeleteId(null);
    } catch (err) {
      alert("System failed to purge record.");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleStatus = async (job: any) => {
    const targetId = job._id || job.id;
    try {
      const updatedStatus = !job.is_active;
      await api.put(`/jobs/${targetId}`, { is_active: updatedStatus });
      setJobs(jobs.map(j => (j._id || j.id) === targetId ? { ...j, is_active: updatedStatus } : j));
    } catch (err) {
      alert("Failed to toggle status.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 1. Header & Quick Stats */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] tracking-widest uppercase">
            <ShieldCheck size={14} /> Security Clearance: Admin
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Job Registry</h1>
          <p className="text-slate-500 font-medium">Global management of all published career opportunities.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <BarChart3 size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Total</p>
              <p className="text-xl font-black text-slate-900 leading-none">{totalJobs}</p>
            </div>
          </div>
          <Link to="/jobs/post" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
            <Plus size={18} /> Publish New
          </Link>
        </div>
      </div>

      {/* 2. Control Bar */}
      <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Filter by title, org, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select
            value={filterType}
            onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
            className="px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-xs uppercase tracking-widest text-slate-600 appearance-none min-w-[160px] text-center"
          >
            <option value="">All Sectors</option>
            <option value="Govt">Govt</option>
            <option value="Private">Private</option>
            <option value="Internship">Internship</option>
          </select>
          <button onClick={() => { setSearchTerm(""); setFilterType(""); setPage(1); }} className="p-4 bg-slate-100 text-slate-400 hover:bg-slate-200 rounded-2xl transition-all">
            <RefreshCcw size={20} />
          </button>
        </div>
      </div>

      {/* 3. Registry Board (Table) */}
      <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Listing Details</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Metadata</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timestamp</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <Loader2 className="h-10 w-10 text-indigo-600 animate-spin mx-auto" />
                    <p className="mt-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Querying database...</p>
                  </td>
                </tr>
              ) : jobs.length > 0 ? (
                jobs.map((job, idx) => {
                  const id = job._id || job.id;
                  return (
                    <motion.tr 
                      key={id} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="font-black text-slate-900 text-base leading-tight group-hover:text-indigo-600 transition-colors">{job.title}</div>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                             <Globe size={12}/> {job.organization}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-2">
                          <span className={`w-fit px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
                            job.type === 'Govt' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                          }`}>
                            {job.type}
                          </span>
                          <div className="text-[10px] font-bold text-slate-400 ml-1">{job.category_name || "General"}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <button
                          onClick={() => toggleStatus(job)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                            job.is_active 
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100" 
                              : "bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200"
                          }`}
                        >
                          {job.is_active ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                          {job.is_active ? "Live" : "Draft"}
                        </button>
                      </td>
                      <td className="px-8 py-6">
                         <div className="text-xs font-black text-slate-900 leading-none mb-1 italic">
                           {formatDate(job.created_at)}
                         </div>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Post Date</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => navigate(`/jobs/edit/${id}`)} className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:shadow-lg rounded-xl transition-all">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => setDeleteId(id)} className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-red-600 hover:shadow-lg rounded-xl transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <AlertCircle className="h-12 w-12 text-slate-200 mx-auto" />
                      <h3 className="text-xl font-black text-slate-900">NO RECORDS FOUND</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Adjust your search parameters and try again.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Smart Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 disabled:opacity-20 transition-all">
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-[20px]">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (pageNum === 1 || pageNum === totalPages || (pageNum >= page - 1 && pageNum <= page + 1)) {
                return (
                  <button key={pageNum} onClick={() => setPage(pageNum)} className={`h-10 w-10 rounded-xl font-black text-xs transition-all ${page === pageNum ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-110" : "text-slate-400 hover:text-slate-900"}`}>
                    {pageNum}
                  </button>
                );
              } else if (pageNum === page - 2 || pageNum === page + 2) {
                return <span key={pageNum} className="text-slate-300 font-bold px-1">...</span>;
              }
              return null;
            })}
          </div>

          <button disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 disabled:opacity-20 transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* 5. Advanced Deletion Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteId(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl space-y-8 border border-slate-100">
              <div className="h-20 w-20 bg-red-50 rounded-[30px] flex items-center justify-center mx-auto text-red-600 border border-red-100">
                <Trash2 size={32} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Purge Entry?</h3>
                <p className="text-slate-500 font-medium">This action is irreversible. The job listing and its history will be deleted from the mainframe.</p>
              </div>
              <div className="flex gap-4 pt-2">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-black rounded-3xl text-xs uppercase tracking-widest transition-all">Abort</button>
                <button onClick={handleDelete} disabled={isDeleting} className="flex-1 py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-3xl text-xs uppercase tracking-widest shadow-2xl shadow-red-200 transition-all flex items-center justify-center">
                  {isDeleting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirm Purge"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};