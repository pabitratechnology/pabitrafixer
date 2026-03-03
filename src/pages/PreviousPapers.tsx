import React, { useEffect, useState, useMemo } from "react";
import api from "../lib/api";
import { 
  FileText, Search, Download, Loader2, 
  Briefcase, ChevronRight, History, Calendar, 
  Sparkles, ShieldCheck, Database, Filter,
  ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../lib/utils";

export const PreviousPapers = () => {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/previous-papers");
        // Ensure res.data is an array to prevent crashes
        setPapers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Archive Fetch Error:", err);
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);

  const filteredPapers = useMemo(() => {
    return papers.filter(p => 
      (p.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (p.organization?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  }, [papers, searchTerm]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      
      {/* 1. Impactful Hero Header */}
      <section className="relative bg-slate-900 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Database size={14} /> Official Archive Access
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none"
          >
            EXAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-black italic">VAULT</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Sharpen your strategy with our curated collection of original previous year question papers.
          </motion.p>
        </div>
      </section>

      {/* 2. Floating Search Command */}
      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative group shadow-2xl"
        >
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by exam, board, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-6 bg-white border-none rounded-[32px] shadow-2xl outline-none text-lg font-bold text-slate-900 transition-all focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-300"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:block">
            {filteredPapers.length} Records Found
          </div>
        </motion.div>
      </div>

      {/* 3. Main Archive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading" 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 bg-white border border-slate-100 rounded-[40px] animate-pulse" />
              ))}
            </motion.div>
          ) : filteredPapers.length > 0 ? (
            <motion.div 
              key="grid"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPapers.map((item) => (
                <motion.div
                  key={item._id || item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group relative overflow-hidden"
                >
                  {/* Subtle Background Icon */}
                  <History size={120} className="absolute -right-8 -bottom-8 text-slate-50 -rotate-12 group-hover:text-indigo-50 transition-colors" />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="h-14 w-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                        <FileText size={24} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {item.year && (
                          <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                            Year {item.year}
                          </span>
                        )}
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                           ID: {String(item._id || item.id).slice(-6)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-tight">
                        <Briefcase size={14} className="text-indigo-400" />
                        {item.organization}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Index Date</span>
                        <span className="text-xs font-bold text-slate-500">{formatDate(item.created_at)}</span>
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 w-12 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-sm"
                      >
                        <Download size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 bg-white rounded-[50px] border-2 border-dashed border-slate-200"
            >
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-slate-200" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">No Archive Matched</h3>
              <p className="text-slate-400 font-medium mt-2 max-w-sm mx-auto">We couldn't locate any papers matching your query. Try broaden your search parameters.</p>
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-8 px-10 py-4 bg-indigo-50 text-indigo-600 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-indigo-100 transition-all"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Support Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="bg-slate-900 rounded-[50px] p-10 lg:p-16 text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:bg-indigo-600/20 transition-colors duration-1000"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} /> Community Driven
              </div>
              <h4 className="text-4xl font-black italic tracking-tighter leading-none">Missing a paper?</h4>
              <p className="text-slate-400 font-medium text-lg">
                Help other candidates by contributing original question papers from your recent examinations.
              </p>
            </div>
            <button className="px-10 py-5 bg-indigo-600 text-white font-black rounded-[24px] text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 active:scale-95">
              Upload Resources <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};