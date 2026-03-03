import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, Clock, Calendar, ArrowRight, 
  Tag, ChevronRight, BookOpen, TrendingUp,
  Sparkles, Filter, Newspaper, GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";

const GlassCard = ({ children, className = "" }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Exam Tips", "Success Stories", "Notifications", "Study Guides"];

  const posts = [
    {
      id: 1,
      category: "Exam Tips",
      title: "How to Crack SSC CGL 2026 in 90 Days: A Complete Roadmap",
      excerpt: "The ultimate guide for aspirants looking to streamline their preparation and master the new exam pattern.",
      author: "Rahul Sharma",
      date: "Mar 02, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      featured: true
    },
    {
      id: 2,
      category: "Notifications",
      title: "Upcoming Railway RRB Vacancies: Everything You Need to Know",
      excerpt: "Major recruitment drive expected in Q3 2026. Here are the expected eligibility criteria.",
      author: "Priya Singh",
      date: "Feb 28, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1474487056217-76fe4d03973c?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      category: "Study Guides",
      title: "Current Affairs 2026: Monthly Compilation for UPSC & Banking",
      excerpt: "Download our free PDF compilation of the most important national and international events.",
      author: "Admin",
      date: "Feb 25, 2026",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      category: "Success Stories",
      title: "From Village to IAS: The Inspiring Journey of Anjali Patel",
      excerpt: "Anjali shares her preparation strategy and how she managed to clear UPSC without expensive coaching.",
      author: "Editor",
      date: "Feb 20, 2026",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen pt-20 pb-20 selection:bg-indigo-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400 mb-8"
          >
            <BookOpen size={14} /> <span>Career Insights & Guides</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8">
            The <span className="text-indigo-500">Aspirant's</span> <br />
            Journal.
          </h1>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center max-w-4xl">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search articles, guides, or tips..." 
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-4 rounded-2xl whitespace-nowrap font-bold text-sm transition-all border ${
                    activeCategory === cat 
                    ? "bg-indigo-600 border-indigo-500 text-white" 
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED POST */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        {posts.filter(p => p.featured).map(post => (
          <GlassCard key={post.id} className="relative group cursor-pointer border-indigo-500/20">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-[300px] lg:h-[500px] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-10 lg:p-16 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest">Featured</span>
                  <span className="text-indigo-400 text-xs font-bold uppercase">{post.category}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{post.author}</p>
                      <p className="text-slate-500 text-xs">{post.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-400 font-bold group-hover:gap-4 transition-all">
                    Read More <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </section>

      {/* 3. BLOG GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.filter(p => !p.featured).map((post) => (
            <GlassCard key={post.id} className="group">
              <div className="h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tighter text-indigo-400">
                  <Tag size={12} /> {post.category}
                </div>
                <h3 className="text-xl font-bold text-white leading-snug group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/5 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 4. NEWSLETTER CTA */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <GlassCard className="bg-gradient-to-br from-indigo-600 to-purple-700 border-none p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10"><Sparkles size={300} /></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic">Get the Edge.</h2>
            <p className="text-indigo-100 text-lg">
              Join 100,000+ subscribers who get our weekly strategy teardowns and notification alerts.
            </p>
            <div className="flex flex-col md:flex-row gap-3 pt-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all">
                Subscribe Now
              </button>
            </div>
            <p className="text-indigo-200/50 text-xs">Zero spam. Only high-value preparation content.</p>
          </div>
        </GlassCard>
      </section>

    </div>
  );
};