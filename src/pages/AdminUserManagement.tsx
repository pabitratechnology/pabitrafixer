import React, { useEffect, useState, useCallback } from "react";
import api from "../lib/api";
import { 
  Search, Trash2, Loader2, User as UserIcon, ShieldCheck,
  Mail, Phone, Calendar, AlertCircle, CheckCircle2,
  X, Edit3, Save, RefreshCcw, Users, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../lib/utils";
import { useAuth } from "../hooks/useAuth";

export const AdminUserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modals State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("User fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsProcessing(true);
    try {
      await api.delete(`/users/${deleteId}`);
      setUsers(users.filter(u => u._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      alert("Security Error: Failed to purge user.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await api.put(`/users/${editingUser._id}`, editingUser);
      setUsers(users.map(u => u._id === editingUser._id ? res.data : u));
      setEditingUser(null);
    } catch (err) {
      alert("Update failed. Check administrative permissions.");
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 1. Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] tracking-widest uppercase">
            <ShieldCheck size={14} /> Global Authorization Layer
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Member Registry</h1>
          <p className="text-slate-500 font-medium">Configure permissions and manage registered identities.</p>
        </div>

        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Total Members</p>
            <p className="text-xl font-black text-slate-900 leading-none">{users.length}</p>
          </div>
        </div>
      </div>

      {/* 2. Control Bar */}
      <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by identity or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
          />
        </div>
        <button onClick={fetchUsers} className="p-4 bg-slate-100 text-slate-400 hover:bg-slate-200 rounded-2xl transition-all">
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* 3. User Table */}
      <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Member Identity</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Clearance Level</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timestamp</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <Loader2 className="h-10 w-10 text-indigo-600 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((u, idx) => (
                  <motion.tr 
                    key={u._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-slate-100 rounded-[18px] flex items-center justify-center font-black text-slate-400 uppercase border-2 border-white shadow-sm">
                          {u.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="font-black text-slate-900 text-sm leading-none mb-1.5">{u.name}</div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400 font-bold flex items-center gap-1"><Mail size={12}/> {u.email}</span>
                            {u.phone && <span className="text-xs text-slate-400 font-bold flex items-center gap-1 border-l border-slate-200 pl-3"><Phone size={12}/> {u.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                        u.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' : 
                        u.role === 'recruiter' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                        'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="text-xs font-black text-slate-900 leading-none mb-1 italic">
                         {formatDate(u.created_at)}
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Registration Date</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setEditingUser(u)}
                          className="p-2.5 text-slate-300 hover:text-indigo-600 hover:bg-white hover:shadow-lg rounded-xl transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        {currentUser?.email !== u.email && (
                          <button
                            onClick={() => setDeleteId(u._id)}
                            className="p-2.5 text-slate-300 hover:text-red-600 hover:bg-white hover:shadow-lg rounded-xl transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <AlertCircle className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-slate-900 uppercase">Registry Empty</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">No matching members found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- EDIT MEMBER MODAL --- */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingUser(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Edit Identity</h3>
                <button onClick={() => setEditingUser(null)} className="p-2 bg-slate-50 rounded-xl hover:bg-slate-200"><X size={20}/></button>
              </div>

              <form onSubmit={handleUpdateUser} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                  <input type="text" value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-slate-900 focus:bg-white focus:ring-2 ring-indigo-500/20 transition-all shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Contact Number</label>
                  <input type="text" value={editingUser.phone} onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-slate-900 focus:bg-white focus:ring-2 ring-indigo-500/20 transition-all shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Authorization Role</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['user', 'recruiter', 'admin'].map(r => (
                      <button
                        key={r} type="button"
                        onClick={() => setEditingUser({...editingUser, role: r})}
                        className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all border ${editingUser.role === r ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" disabled={isProcessing} className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl text-xs uppercase tracking-widest shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                   {isProcessing ? <Loader2 size={18} className="animate-spin"/> : <><Save size={18}/> Authorize Changes</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- PURGE CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteId(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl border border-slate-100 text-center">
              <div className="h-20 w-20 bg-red-50 rounded-[30px] flex items-center justify-center mx-auto text-red-600 mb-6">
                <ShieldAlert size={40} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-2">Purge Identity?</h3>
              <p className="text-slate-500 font-medium mb-8">This action is irreversible. All access logs and shortlisted data for this user will be deleted.</p>
              <div className="flex gap-4">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-5 bg-slate-50 text-slate-600 font-black rounded-3xl text-xs uppercase tracking-widest">Abort</button>
                <button onClick={handleDelete} disabled={isProcessing} className="flex-1 py-5 bg-red-600 text-white font-black rounded-3xl text-xs uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center">
                  {isProcessing ? <Loader2 size={18} className="animate-spin"/> : "Confirm Purge"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};