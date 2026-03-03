import React from "react";
import { motion } from "framer-motion";
import { 
  Newspaper, Download, Share2, ExternalLink, 
  Mail, MessageSquare, Award, TrendingUp, 
  FileText, Camera, ShieldCheck, Zap,
  Users
} from "lucide-react";

const GlassCard = ({ children, className = "" }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

export const Press = () => {
  const pressReleases = [
    {
      date: "March 01, 2026",
      title: "Platform Reaches 500,000 Active Monthly Users Across India",
      source: "TechDaily",
      link: "#"
    },
    {
      date: "February 15, 2026",
      title: "New AI Engine Launched to Predict Exam Result Dates with 95% Accuracy",
      source: "Business Standard",
      link: "#"
    },
    {
      date: "January 20, 2026",
      title: "Strategic Partnership Announced with National Education Board",
      source: "The Economic Times",
      link: "#"
    }
  ];

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen pt-20 pb-20 selection:bg-indigo-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400 mb-6"
          >
            <Newspaper size={14} /> <span>Official Newsroom</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8">
            Our Story in the <br />
            <span className="text-indigo-500 italic">Headlines.</span>
          </h1>

          <div className="flex flex-wrap gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             {/* Replace with actual partner/news logos */}
             <span className="text-2xl font-black tracking-tighter">TECH TIMES</span>
             <span className="text-2xl font-black tracking-tighter">CAREER HUB</span>
             <span className="text-2xl font-black tracking-tighter">INDIA TODAY</span>
             <span className="text-2xl font-black tracking-tighter">FORBES INDIA</span>
          </div>
        </div>
      </section>

      {/* 2. PRESS RELEASES */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
          <Zap className="text-indigo-500" /> Recent Coverage
        </h2>
        
        <div className="grid gap-4">
          {pressReleases.map((news, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 group cursor-pointer hover:border-indigo-500/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                      <span>{news.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span>{news.source}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {news.title}
                    </h3>
                  </div>
                  <button className="flex items-center gap-2 text-slate-400 group-hover:text-white transition-colors">
                    Read Story <ExternalLink size={16} />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. BRAND KIT (Media Assets) */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Media Assets</h2>
              <p className="text-slate-500">Official logos and photography for media use.</p>
            </div>
            <button className="px-6 py-3 rounded-2xl bg-white text-black font-bold flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all">
              <Download size={18} /> Download Full Press Kit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="p-10 text-center">
              <div className="w-full aspect-video bg-white/5 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-indigo-500 font-black text-2xl">LOGOTYPE</span>
              </div>
              <h4 className="text-white font-bold mb-1">Standard Logo</h4>
              <p className="text-slate-500 text-xs mb-4">SVG, PNG, EPS</p>
              <button className="text-indigo-400 text-sm font-bold flex items-center gap-2 mx-auto">
                Download <Download size={14} />
              </button>
            </GlassCard>

            <GlassCard className="p-10 text-center">
              <div className="w-full aspect-video bg-white/5 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <Users className="text-indigo-500/20 w-24 h-24" />
              </div>
              <h4 className="text-white font-bold mb-1">Founder Photos</h4>
              <p className="text-slate-500 text-xs mb-4">High-res portraits</p>
              <button className="text-indigo-400 text-sm font-bold flex items-center gap-2 mx-auto">
                Download <Download size={14} />
              </button>
            </GlassCard>

            <GlassCard className="p-10 text-center">
              <div className="w-full aspect-video bg-white/5 rounded-2xl mb-6 flex items-center justify-center">
                <ShieldCheck className="text-indigo-500" size={48} />
              </div>
              <h4 className="text-white font-bold mb-1">Platform Stats</h4>
              <p className="text-slate-500 text-xs mb-4">Q1 2026 Fact Sheet</p>
              <button className="text-indigo-400 text-sm font-bold flex items-center gap-2 mx-auto">
                Download <Download size={14} />
              </button>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. MEDIA CONTACT */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="text-center space-y-8">
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto text-indigo-500">
            <Mail size={32} />
          </div>
          <h2 className="text-4xl font-bold text-white">Media Inquiries</h2>
          <p className="text-slate-400">
            For interview requests, expert commentary, or data-driven reports on the Indian 
            job market, please contact our communications team.
          </p>
          <div className="pt-8">
            <a 
              href="mailto:press@yourdomain.com" 
              className="text-2xl font-black text-indigo-400 hover:text-white transition-colors"
            >
              press@yourdomain.com
            </a>
            <p className="text-slate-600 text-sm mt-4 italic">Response time: Usually within 4 hours</p>
          </div>
        </div>
      </section>

    </div>
  );
};