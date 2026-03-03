import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { 
  Briefcase, User, LogOut, Menu, X, 
  Bell, Plus, Settings, ChevronDown, 
  Search, ShieldCheck, Sparkles, LayoutDashboard 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle Navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Latest Jobs", href: "/jobs" },
    { name: "Admit Cards", href: "/admit-cards" },
    { name: "Results", href: "/results" },
    { name: "Syllabus", href: "/syllabus" },
    { name: "Papers", href: "/previous-papers" },
    { name: "Study Materials", href: "/study-materials" },
  ];

  return (
    <nav 
      className={`sticky top-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-b border-white/20 py-2" 
          : "bg-white border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* 1. Brand Logo */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="bg-indigo-600 p-2 rounded-2xl shadow-lg shadow-indigo-200 group-hover:shadow-indigo-400 transition-all"
              >
                <Briefcase className="h-6 w-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                  JOB<span className="text-indigo-600">PORTAL</span>
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  Official Alerts
                </span>
              </div>
            </Link>

            {/* 2. Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 group ${
                      isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-indigo-50 rounded-xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full transition-transform duration-300 scale-0 ${isActive ? 'scale-100' : 'group-hover:scale-100'}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 3. Action Area */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                
                {/* Admin/Recruiter Special Action */}
                {(user.role === "admin" || user.role === "recruiter") && (
                  <Link
                    to="/jobs/post"
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                  >
                    <Plus size={16} />
                    POST JOB
                  </Link>
                )}

                {/* User Profile Menu */}
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 p-1 pr-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all group"
                  >
                    <div className="h-9 w-9 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:border-indigo-200 transition-colors">
                      <User size={18} className="text-indigo-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-slate-900 leading-none">{user.name}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">My Account</span>
                    </div>
                  </Link>

                  {/* Settings for Admin */}
                  {user.role === "admin" && (
                    <Link to="/admin/jobs" className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                      <Settings size={20} />
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-indigo-600"><Search size={20}/></button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Modern Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl p-4 overflow-y-auto max-h-[80vh]"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-3">Navigation</p>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-slate-700 font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                >
                  {link.name}
                  <ChevronDown size={16} className="-rotate-90 opacity-30" />
                </Link>
              ))}

              {user ? (
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-3">My Workspace</p>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-slate-50 text-slate-900 font-bold">
                    <LayoutDashboard size={18} className="text-indigo-600"/> Dashboard
                  </Link>
                  {(user.role === "admin" || user.role === "recruiter") && (
                    <Link to="/jobs/post" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-indigo-600 text-white font-black">
                      <Plus size={18}/> POST A JOB
                    </Link>
                  )}
                  <button onClick={() => { logout(); setIsOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-red-600 font-bold hover:bg-red-50 transition-all">
                    <LogOut size={18}/> Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="py-4 text-center rounded-2xl bg-slate-100 font-black text-slate-900 text-xs uppercase tracking-widest">Sign In</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="py-4 text-center rounded-2xl bg-indigo-600 font-black text-white text-xs uppercase tracking-widest shadow-lg shadow-indigo-100">Sign Up</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};