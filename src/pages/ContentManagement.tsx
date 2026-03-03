import React, { useEffect, useState, useCallback } from "react";
import api from "../lib/api";
import { 
  Plus, Trash2, Edit3, Loader2, Search, BookOpen, History,
  Book, X, Save, AlertCircle, RefreshCcw, FileText, 
  Layers, Database, Sparkles, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../lib/utils";

type ContentType = "syllabus" | "papers" | "materials";

export const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState<ContentType>("syllabus");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<any>({
    title: "",
    organization: "",
    content: "",
    pdf_link: "",
    year: "",
    link: "",
    subject: "",
    description: ""
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === "syllabus" ? "/syllabus" : 
                       activeTab === "papers" ? "/previous-papers" : 
                       "/study-materials";
      const res = await api.get(endpoint);
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Content fetch error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: "", organization: "", content: "", pdf_link: "",
        year: "", link: "", subject: "", description: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const endpoint = activeTab === "syllabus" ? "/syllabus" : 
                       activeTab === "papers" ? "/previous-papers" : 
                       "/study-materials";
      
      const id = editingItem?._id || editingItem?.id;
      if (editingItem) {
        await api.put(`${endpoint}/${id}`, formData);
      } else {
        await api.post(endpoint, formData);
      }
      
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert("System Error: Failed to save content block.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Purge this content from the mainframe?")) return;
    try {
      const endpoint = activeTab === "syllabus" ? "/syllabus" : 
                       activeTab === "papers" ? "/previous-papers" : 
                       "/study-materials";
      await api.delete(`${endpoint}/${id}`);
      setData(data.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      alert("Action failed: Record is protected or connection lost.");
    }
  };

  const filteredData = data.filter(item => 
    (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.organization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.subject || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 1. Page Header & Real-time Stats */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] tracking-widest uppercase">
            <Database size={14} /> Content Architecture
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Resource <span className="text-indigo-600">Manager</span>
          </h1>
          <p className="text-slate-500 font-medium">Control syllabus data, exam archives, and study assets.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Layers size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Total</p>
              <p className="text-xl font-black text-slate-900 leading-none">{data.length}</p>
            </div>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            <Plus size={18} /> Add New Entry
          </button>
        </div>
      </div>

      {/* 2. Sliding Navigation Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-[24px] w-fit mb-10 overflow-x-auto no-scrollbar">
        {[
          { id: "syllabus", label: "Syllabus", icon: <BookOpen size={16}/> },
          { id: "papers", label: "Previous Papers", icon: <History size={16}/> },
          { id: "materials", label: "Materials", icon: <Book size={16}/> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`relative flex items-center gap-2 px-8 py-3.5 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all z-10 ${
              activeTab === tab.id ? "text-indigo-600" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div layoutId="content-tab" className="absolute inset-0 bg-white rounded-[20px] shadow-sm -z-10" />
            )}
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Control Console */}
      <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder={`Search across ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
          />
        </div>
        <button onClick={fetchData} className="p-4 bg-slate-100 text-slate-400 hover:bg-slate-200 rounded-2xl transition-all">
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* 4. Registry Registry (Table) */}
      <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Listing Identity</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Organization / Scope</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Modified</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <Loader2 className="h-10 w-10 text-indigo-600 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <motion.tr 
                    key={item._id || idx}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                           {activeTab === 'syllabus' ? <BookOpen size={18}/> : activeTab === 'papers' ? <History size={18}/> : <Book size={18}/>}
                        </div>
                        <div className="font-black text-slate-900 text-base leading-tight group-hover:text-indigo-600 transition-colors">{item.title}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-tight">
                         {activeTab === "materials" ? (item.subject || 'Standard') : (item.organization || 'Global')}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="text-xs font-black text-slate-900 leading-none mb-1 italic">
                         {formatDate(item.created_at)}
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Audit Timestamp</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(item)} className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:shadow-lg rounded-xl transition-all">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDelete(item._id || item.id)} className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-red-600 hover:shadow-lg rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <AlertCircle className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Database Empty</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Comprehensive Resource Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[40px] p-10 max-w-2xl w-full shadow-2xl space-y-8 border border-slate-100 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-cyan-500"></div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Sparkles size={20}/></div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                    {editingItem ? "Update" : "Publish"} {activeTab}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-50 rounded-xl hover:bg-slate-200 transition-all">
                  <X className="h-6 w-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Display Title</label>
                  <input
                    type="text" required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:bg-white focus:ring-2 ring-indigo-500/20 outline-none font-bold text-slate-900 transition-all shadow-inner"
                    placeholder={`Name this ${activeTab} entry...`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                      {activeTab === "materials" ? "Subject Matter" : "Official Body"}
                    </label>
                    <input
                      type="text" required
                      value={activeTab === "materials" ? formData.subject : formData.organization}
                      onChange={(e) => setFormData({ ...formData, [activeTab === "materials" ? 'subject' : 'organization']: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:bg-white focus:ring-2 ring-indigo-500/20 outline-none font-bold text-slate-900 transition-all shadow-inner"
                      placeholder="e.g. Quantitative Aptitude / UPSC"
                    />
                  </div>

                  {activeTab === "papers" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Examination Year</label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:bg-white focus:ring-2 ring-indigo-500/20 outline-none font-bold text-slate-900 transition-all shadow-inner"
                        placeholder="2026"
                      />
                    </div>
                  )}
                </div>

                {activeTab === "syllabus" && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Content Payload (Markdown)</label>
                    <textarea
                      required rows={5}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:bg-white focus:ring-2 ring-indigo-500/20 outline-none font-bold text-slate-900 transition-all shadow-inner resize-none"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Resource URL (Link)</label>
                  <input
                    type="url" required
                    value={activeTab === "syllabus" ? formData.pdf_link : formData.link}
                    onChange={(e) => setFormData({ ...formData, [activeTab === "syllabus" ? 'pdf_link' : 'link']: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:bg-white focus:ring-2 ring-indigo-500/20 outline-none font-bold text-slate-900 transition-all shadow-inner"
                    placeholder="https://cdn.official.gov/document.pdf"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-3xl shadow-2xl shadow-indigo-500/30 transition-all flex items-center justify-center disabled:opacity-50 gap-3 active:scale-95 text-xs tracking-widest uppercase"
                >
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save size={18} /> Commit to Registry</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};