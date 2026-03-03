import React from "react";
import { motion } from "framer-motion";
import { 
  Users, Target, ShieldCheck, Zap, 
  Globe, Award, Heart, Coffee,
  ArrowRight, Sparkles, CheckCircle2
} from "lucide-react";

// Local GlassCard component for the modern SaaS look
const GlassCard = ({ children, className = "" }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

// Changed to 'export const Aboutus' to fix the import error in App.tsx
export const Aboutus = () => {
  const values = [
    {
      icon: <ShieldCheck className="text-emerald-400" />,
      title: "Radical Transparency",
      desc: "No clickbait, no fake news. We source directly from official government gazettes."
    },
    {
      icon: <Zap className="text-indigo-400" />,
      title: "Speed of Light",
      desc: "Our automated scrapers ensure you see a notification within 15 minutes of it going live."
    },
    {
      icon: <Target className="text-rose-400" />,
      title: "Focus on Success",
      desc: "We don't just list jobs; we provide the syllabus, papers, and tools to help you crack them."
    }
  ];

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen pt-20 pb-20 selection:bg-indigo-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400 mb-6"
          >
            <Heart size={14} className="fill-indigo-400" /> <span>Built by aspirants, for aspirants</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-8"
          >
            We’re on a Mission to <br />
            <span className="text-indigo-500">Simplify Public Service.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            In a world of cluttered job portals and misinformation, we built a sanctuary for government job seekers. 
            Clean, fast, and 100% verified notifications.
          </motion.p>
        </div>
      </section>

      {/* 2. THE PROBLEM & SOLUTION */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard className="p-10 border-rose-500/20 bg-rose-500/[0.02]">
            <h3 className="text-rose-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
              <span className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-xs">!</span>
              The Problem
            </h3>
            <p className="text-xl text-white font-medium leading-relaxed">
              Most job portals are built for clicks, not candidates. Aspirants waste thousands of hours navigating 
              broken links, outdated notifications, and confusing eligibility criteria.
            </p>
          </GlassCard>

          <GlassCard className="p-10 border-emerald-500/20 bg-emerald-500/[0.02]">
            <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
              <CheckCircle2 size={20} />
              Our Solution
            </h3>
            <p className="text-xl text-white font-medium leading-relaxed">
              A centralized intelligence hub. We use advanced web-crawling technology to bring every 
              notification, admit card, and result into one sleek, searchable dashboard.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Our Core Philosophy</h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, i) => (
            <GlassCard key={i} className="p-8 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {val.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{val.title}</h4>
              <p className="text-slate-500 leading-relaxed text-sm">{val.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 4. THE TECH STATS */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: "Official Sources", val: "500+", icon: <Globe size={20} /> },
            { label: "Daily Updates", val: "100+", icon: <Zap size={20} /> },
            { label: "Active Aspirants", val: "500k+", icon: <Users size={20} /> },
            { label: "Data Accuracy", val: "99.9%", icon: <Award size={20} /> },
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={i} 
              className="space-y-2"
            >
              <div className="flex justify-center text-indigo-500 mb-4">{stat.icon}</div>
              <div className="text-4xl font-black text-white italic tracking-tighter">{stat.val}</div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. TEAM PHILOSOPHY */}
      <section className="py-24 max-w-5xl mx-auto px-4 text-center">
        <div className="mb-12">
          <Coffee className="mx-auto text-indigo-400 mb-4" size={40} />
          <h2 className="text-3xl font-bold text-white mb-4">Built with Purpose</h2>
          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
            We are a dedicated team of engineers and former aspirants who believe that easy access 
            to information is the first step toward a successful career. Our platform is built using 
            Modern React, Framer Motion, and a lot of passion.
          </p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white text-black font-black rounded-2xl flex items-center gap-2 mx-auto hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5"
        >
          Explore Careers <ArrowRight size={18} />
        </motion.button>
      </section>

      {/* 6. BOTTOM DECORATION */}
      <div className="flex justify-center opacity-20 py-10">
        <Sparkles className="text-indigo-500 animate-pulse" size={48} />
      </div>
    </div>
  );
};