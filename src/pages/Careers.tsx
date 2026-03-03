import React from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, Code, PenTool, BarChart, 
  CheckCircle2, ArrowRight, Zap, Globe, 
  Users, Rocket, Heart, Laptop
} from "lucide-react";

const GlassCard = ({ children, className = "" }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

export const Careers = () => {
  const roles = [
    {
      title: "Senior Full Stack Engineer",
      team: "Engineering",
      type: "Full-time / Remote",
      icon: <Code className="text-indigo-400" />
    },
    {
      title: "Content Specialist (Sarkari Exams)",
      team: "Content",
      type: "Full-time / Remote",
      icon: <PenTool className="text-emerald-400" />
    },
    {
      title: "Growth Marketing Manager",
      team: "Marketing",
      type: "Contract",
      icon: <BarChart className="text-rose-400" />
    }
  ];

  const perks = [
    { icon: <Globe size={20} />, title: "Remote First", desc: "Work from anywhere in India." },
    { icon: <Zap size={20} />, title: "Latest Tech", desc: "We use React, Node, and AI." },
    { icon: <Heart size={20} />, title: "Health Cover", desc: "Full medical for you and family." },
    { icon: <Laptop size={20} />, title: "Learning Budget", desc: "Books, courses, and conferences." },
  ];

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen pt-20 pb-20 selection:bg-indigo-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-400 mb-8"
          >
            <Rocket size={14} /> <span>Join the Revolution</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6">
            Help India <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Get Employed.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            We are building the smartest notification engine for 50 million aspirants. 
            Come help us make career opportunities accessible to everyone.
          </p>
        </div>
      </section>

      {/* 2. WHY JOIN US (Perks) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {perks.map((perk, i) => (
            <GlassCard key={i} className="p-8 border-white/5">
              <div className="text-indigo-500 mb-4">{perk.icon}</div>
              <h3 className="text-white font-bold mb-2">{perk.title}</h3>
              <p className="text-slate-500 text-sm">{perk.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 3. OPEN POSITIONS */}
      <section className="py-24 max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Open Roles</h2>
          <span className="px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
            {roles.length} Positions Available
          </span>
        </div>

        <div className="space-y-4">
          {roles.map((role, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 group cursor-pointer hover:bg-white/[0.05] transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {role.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Users size={14} /> {role.team}</span>
                        <span className="flex items-center gap-1"><CheckCircle2 size={14} /> {role.type}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all text-sm flex items-center gap-2">
                    Apply <ArrowRight size={16} />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. GENERAL APPLICATION */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <GlassCard className="p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <h2 className="text-3xl font-bold text-white mb-4">Don't see a perfect fit?</h2>
          <p className="text-slate-400 mb-8">
            We are always looking for talented individuals who are passionate about education and tech. 
            Send us your resume for future opportunities.
          </p>
          <a 
            href="mailto:careers@yourdomain.com" 
            className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-white transition-colors"
          >
            General Application <ArrowRight size={18} />
          </a>
        </GlassCard>
      </section>

    </div>
  );
};