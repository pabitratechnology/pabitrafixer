import React from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, Mail, Phone, MapPin, 
  Twitter, Facebook, Instagram, Linkedin, 
  ArrowUpRight, ShieldCheck, Heart,
  Globe, Award, Clock, Sparkles,
  ChevronRight, ExternalLink, Code2,
  Cpu, Zap, Github
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Company information
  const companyInfo = {
    name: "Pabitra Technology",
    url: "https://pabitratechnology.com",
    role: "Product Development & Digital Innovation",
    established: "2020",
    email: "analyticspabitratech@gmail.com",
    phone: "+919876543210",
    phoneDisplay: "+91 98765 43210",
    address: "Bhubaneswar, Odisha, India"
  };

  const footerLinks = {
    quickLinks: [
      { name: "Latest Jobs", href: "/jobs", count: "150+" },
      { name: "Admit Cards", href: "/admit-cards", count: "45+" },
      { name: "Exam Results", href: "/results", count: "78+" },
      { name: "Answer Keys", href: "/answer-keys", count: "92+" },
    ],
    resources: [
      { name: "Syllabus", href: "/syllabus", icon: "📚" },
      { name: "Previous Papers", href: "/previous-papers", icon: "📝" },
      { name: "Selection Process", href: "/process", icon: "⚡" },
      { name: "Study Materials", href: "/study-materials", icon: "📖" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers", badge: "Hiring" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    legal: [
      { name: "Privacy Policy", href: "https://pabitratechnology.com/privacy.html" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Disclaimer", href: "/disclaimer" },
      { name: "Cookie Policy", href: "/cookies" },
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "https://pabitratechnology.com", label: "Twitter", color: "hover:bg-blue-400" },
    { icon: Facebook, href: "https://www.facebook.com/pabitra.technology.2025", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Instagram, href: "https://www.instagram.com/pabitratechnology/", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Linkedin, href: "https://pabitratechnology.com", label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: Github, href: "https://pabitratechnology.com", label: "GitHub", color: "hover:bg-gray-700" },
  ];

  const techStack = [
    "React 18", "TypeScript", "Node.js", "MongoDB", 
    "TailwindCSS", "Express", "Redux", "AWS"
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-20 pb-10 border-t border-white/5 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          
          {/* Column 1: Brand & About - Wider */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tighter">
                  JOB<span className="text-indigo-500">PORTAL</span>
                </span>
                <span className="block text-[10px] font-medium text-indigo-400/60 tracking-widest uppercase">
                  by Pabitra Technology
                </span>
              </div>
            </Link>
            
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              India's most trusted career guidance platform, delivering real-time updates for 
              Central & State Government jobs, Admit cards, and Results since 2020.
              <span className="block mt-2 font-medium text-indigo-400">Powered by Pabitra Technology</span>
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-xs font-medium text-slate-300">Govt Verified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Clock size={14} className="text-blue-500" />
                <span className="text-xs font-medium text-slate-300">Real-time Updates</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Award size={14} className="text-amber-500" />
                <span className="text-xs font-medium text-slate-300">ISO Certified</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={i} 
                    href={social.href} 
                    className={`p-2.5 rounded-xl bg-white/5 hover:scale-110 transition-all duration-300 ${social.color} hover:text-white border border-white/10`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="w-6 h-px bg-gradient-to-r from-indigo-500 to-transparent"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="group flex items-center justify-between text-sm hover:text-indigo-400 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                      {link.name}
                    </span>
                    {link.count && (
                      <span className="text-[10px] font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20">
                        {link.count}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="w-6 h-px bg-gradient-to-r from-indigo-500 to-transparent"></span>
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="group flex items-center gap-2 text-sm hover:text-indigo-400 transition-colors"
                  >
                    <span className="text-base">{link.icon}</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="w-6 h-px bg-gradient-to-r from-indigo-500 to-transparent"></span>
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="group flex items-center justify-between text-sm hover:text-indigo-400 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>{link.name}</span>
                    </span>
                    {link.badge && (
                      <span className="text-[9px] font-black bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info Summary - Clickable */}
            <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
              <a 
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-400 transition-colors group"
              >
                <Mail size={12} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                <span>{companyInfo.email}</span>
              </a>
              
              <a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-400 transition-colors group"
              >
                <Phone size={12} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                <span>{companyInfo.phoneDisplay}</span>
              </a>
              
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin size={12} className="text-indigo-500" />
                <span>{companyInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Development & Ownership Section - Enhanced Pabitra Technology Credit */}
        <div className="relative mb-12 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-xl"></div>
          
          <div className="relative bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Left: Development Credit */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-600/30">
                    <Code2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
                      Developed & Maintained By
                    </span>
                    <a 
                      href={companyInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
                        {companyInfo.name}
                      </h3>
                    </a>
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  <span className="text-indigo-400 font-semibold">{companyInfo.role}</span> • 
                  Established {companyInfo.established} • Creating innovative digital solutions 
                  that empower millions of career seekers across India.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2.5 py-1 bg-white/5 text-xs font-medium text-slate-300 rounded-full border border-white/10 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Visit Website CTA */}
              <div className="lg:text-right space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <Globe size={14} className="text-indigo-400" />
                  <span className="text-xs font-medium text-slate-300">Official Website</span>
                </div>
                
                <a 
                  href={companyInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-indigo-600/20 group"
                >
                  <span className="text-lg">Visit Pabitra Technology</span>
                  <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                <p className="text-xs text-slate-500 flex items-center justify-center lg:justify-end gap-1">
                  © {currentYear} All rights reserved • 
                  Crafted with <Heart size={12} className="text-red-500 fill-red-500 mx-1" /> 
                  in India by <a href={companyInfo.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Pabitra Technology</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            {footerLinks.legal.map(link => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="hover:text-indigo-400 transition-colors hover:underline underline-offset-4"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <Zap size={12} className="fill-emerald-500 text-emerald-500" />
              <span className="font-medium text-emerald-400">LIVE 24/7</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Sparkles size={12} className="text-indigo-500" />
              <span>v2.0.0</span>
            </div>
          </div>
        </div>

        {/* Trust Badge Strip */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-[10px] text-slate-600">
          <span className="flex items-center gap-1">🔒 256-bit SSL Encryption</span>
          <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
          <span className="flex items-center gap-1">🛡️ ISO 27001 Certified</span>
          <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
          <span className="flex items-center gap-1">⚡ 99.9% Uptime</span>
          <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
          <span className="flex items-center gap-1">🌐 WCAG 2.1 Compliant</span>
        </div>

        {/* Additional Pabitra Technology Credit Line */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-slate-700">
            <span className="opacity-50">_________________________________</span><br />
            A product of <a href={companyInfo.url} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-400 font-medium hover:underline">Pabitra Technology</a> • 
            Innovating for a Digital India 🇮🇳<br />
            <span className="opacity-50">_________________________________</span>
          </p>
        </div>
      </div>
    </footer>
  );
};