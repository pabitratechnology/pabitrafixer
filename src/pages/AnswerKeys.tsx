import React, { useEffect, useState, useMemo } from "react";
import api from "../lib/api";
import { 
  FileCheck, Search, Building2, Calendar, 
  Download, Info, Sparkles, Loader2, 
  ChevronRight, ArrowUpRight, Filter,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../lib/utils";

export const AnswerKeys = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/answer-keys");
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Extract unique organizations for filtering
  const orgs = useMemo(() => {
    const list = data.map(item => item.organization);
    return ["All", ...Array.from(new Set(list))].slice(0, 6);
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = (item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                            (item.organization?.toLowerCase() || "").includes(searchQuery.toLowerCase());
      const matchesOrg = selectedOrg === "All" || item.organization === selectedOrg;
      return matchesSearch && matchesOrg;
    });
  }, [data, searchQuery, selectedOrg]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      
      {/* 1. Dynamic Header Section */}
      <div className="relative mb-16">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live Updates Active
              </div>
              <div className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} className="inline mr-1" /> Verified Sources
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
              ANSWER <span className="text-indigo-600">KEYS</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Review your performance. Access official set-wise answer sheets and challenge response sheets instantly.
            </p>
          </div>

          {/* Quick Filter Counters */}
          {!loading && (
            <div className="flex gap-4">
               <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center min-w-[140px]">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Available</p>
                  <p className="text-3xl font-black text-slate-900">{data.length}</p>
               </div>
               <div className="bg-slate-900 p-6 rounded-3xl text-center min-w-[140px] shadow-xl shadow-slate-200">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Filtered</p>
                  <p className="text-3xl font-black text-white">{filteredData.length}</p>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Advanced Control Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Search Input */}
        <div className="lg:col-span-2 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by exam name, department, or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[28px] focus:ring-4 focus:ring-indigo-500/5 outline-none font-bold text-slate-900 transition-all shadow-sm text-lg"
          />
        </div>

        {/* Org Filter Desktop */}
        <div className="bg-slate-100 p-1.5 rounded-[28px] flex items-center overflow-hidden">
           <div className="flex-1 flex overflow-x-auto no-scrollbar gap-1">
              {orgs.map(org => (
                <button
                  key={org}
                  onClick={() => setSelectedOrg(org)}
                  className={`px-6 py-3 rounded-[22px] text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    selectedOrg === org 
                    ? "bg-white text-indigo-600 shadow-sm scale-105" 
                    : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {org}
                </button>
              ))}
           </div>
           <div className="px-4 text-slate-300">
             <Filter size={18} />
           </div>
        </div>
      </div>

      {/* 3. Result Content Area */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" className="grid grid-cols-1 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-white border border-slate-100 animate-pulse rounded-[32px]" />
              ))}
            </motion.div>
          ) : filteredData.length > 0 ? (
            <motion.div 
              key="list" 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="grid grid-cols-1 gap-5"
            >
              {filteredData.map((item) => (
                <motion.div
                  key={item._id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)" }}
                  className="group bg-white border border-slate-100 p-8 rounded-[40px] transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden"
                >
                  {/* Decorative Subtle Icon Background */}
                  <FileCheck size={120} className="absolute -right-10 -bottom-10 text-slate-50/50 -rotate-12 group-hover:text-indigo-50 transition-colors" />

                  <div className="flex items-center gap-8 relative z-10">
                    <div className="h-20 w-20 bg-indigo-50 rounded-[28px] flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                      <FileCheck size={32} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                          Official Key
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                          <History size={12} /> Recent Release
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-tight text-slate-400">
                        <span className="flex items-center gap-2">
                          <Building2 size={16} className="text-indigo-400" />
                          {item.organization}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar size={16} className="text-indigo-400" />
                          Published: {formatDate(item.release_date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 relative z-10">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 group/btn"
                    >
                      DOWNLOAD PDF
                      <Download size={18} className="group-hover/btn:translate-y-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 bg-white rounded-[48px] border-2 border-dashed border-slate-100"
            >
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={40} className="text-slate-200" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">No Match Found</h3>
              <p className="text-slate-400 font-medium max-w-sm mx-auto">We couldn't find any answer keys matching your current search criteria.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedOrg("All"); }}
                className="mt-8 px-10 py-4 bg-indigo-50 text-indigo-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-100 transition-all"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Objection/Help Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 bg-slate-900 rounded-[50px] p-10 lg:p-16 text-white relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:bg-indigo-600/20 transition-colors duration-1000"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left space-y-4 max-w-xl">
            <h4 className="text-4xl font-black italic tracking-tighter leading-none">Raising Objections?</h4>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              If you find discrepancies in the official keys, most recruitment boards provide a 48 to 72-hour window to file challenges.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none px-10 py-5 bg-indigo-600 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2">
              Help Guide <ChevronRight size={18} />
            </button>
            <button className="flex-1 lg:flex-none px-10 py-5 bg-white/5 border border-white/10 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Contact Board <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>

    </div>
  );
};