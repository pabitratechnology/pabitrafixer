import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";
import { 
  Search, MapPin, Calendar, ArrowRight, TrendingUp, 
  Award, Globe, Bookmark, BookmarkCheck, AlertCircle, 
  ChevronRight, Zap, Users, Briefcase, Building2, 
  GraduationCap, FileText, Clock, Shield, Star,
  ChevronDown, CheckCircle, Sparkles, Target,
  Newspaper, Trophy, BarChart3, Layers
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { formatDate } from "../lib/utils";
import { SubscriptionForm } from "../components/SubscriptionForm";
import { useAuth } from "../hooks/useAuth";

// Hero Images Grid Component
const HeroImages = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Government official at work",
      className: "col-span-2 row-span-2"
    },
    {
      url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Professional working on documents",
      className: "col-span-1 row-span-1"
    },
    {
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Business meeting",
      className: "col-span-1 row-span-1"
    },
    {
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Graduation ceremony",
      className: "col-span-2 row-span-1"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 h-[500px]">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + idx * 0.1 }}
          className={`relative rounded-2xl overflow-hidden shadow-2xl ${img.className} group`}
        >
          <img 
            src={img.url} 
            alt={img.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  );
};

// Stats Counter Component
const StatsCounter = ({ value, label, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
  >
    <div className="p-3 bg-indigo-500/20 rounded-xl">
      <Icon className="h-6 w-6 text-indigo-400" />
    </div>
    <div>
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  </motion.div>
);

// Featured Categories Grid
const FeaturedCategories = ({ categories }: { categories: any[] }) => {
  const icons = [Briefcase, GraduationCap, Building2, FileText];
  
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">Categories</span>
          <h2 className="text-4xl font-black text-slate-900 mt-2">Browse by Department</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Explore opportunities across various government sectors and departments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <Link to={`/jobs?category=${cat.slug}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-slate-100">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                      <Icon className="h-8 w-8 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{cat.description || 'Latest government job opportunities'}</p>
                    <span className="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Jobs <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Process Steps Section
const ProcessSteps = () => {
  const steps = [
    {
      icon: Search,
      title: "Find Your Job",
      description: "Search through thousands of government job listings with advanced filters",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FileText,
      title: "Check Eligibility",
      description: "Review requirements, age limits, and educational qualifications",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Apply Online",
      description: "Submit your application before the deadline",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Trophy,
      title: "Prepare & Succeed",
      description: "Access study materials and previous papers",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="text-4xl font-black text-slate-900 mt-2">Your Journey to Success</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Simple steps to land your dream government job
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute top-8 right-8 text-6xl font-black text-slate-100">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "SSC CGL 2024 Selected",
      content: "This portal helped me stay updated with all the latest notifications. I never missed any deadline!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108777-466d928a23cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Rahul Verma",
      role: "IBPS PO 2024",
      content: "The exam alerts and study materials are top-notch. Highly recommended for every government job aspirant.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Anjali Patel",
      role: "UPSC CDS 2024",
      content: "Best platform for government job updates. The interface is user-friendly and notifications are timely.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl font-black text-slate-900 mt-2">Success Stories</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Join thousands of successful candidates who found their dream jobs through our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl relative"
            >
              <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-2 rounded-bl-2xl rounded-tr-2xl text-sm font-bold">
                ★ {testimonial.rating}.0
              </div>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-indigo-100"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-indigo-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-600 italic">"{testimonial.content}"</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How often are new jobs posted?",
      answer: "New government job notifications are posted daily. Our team updates the portal every 30 minutes to ensure you never miss an opportunity."
    },
    {
      question: "Is this service completely free?",
      answer: "Yes! All job listings, alerts, and basic features are completely free. We believe in providing equal opportunity to all aspirants."
    },
    {
      question: "How can I get exam alerts?",
      answer: "Subscribe to our notification service and choose your preferred categories. You'll receive instant alerts for new exams and results."
    },
    {
      question: "Do you provide study materials?",
      answer: "Yes, we provide free study materials, previous year papers, and preparation guides for major competitive exams."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-4xl font-black text-slate-900 mt-2">Frequently Asked Questions</h2>
            <p className="text-slate-600 mt-4">
              Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.
            </p>
            
            <div className="mt-8 p-6 bg-indigo-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Still have questions?</h4>
                  <p className="text-slate-600 text-sm">Our support team is here to help</p>
                </div>
              </div>
              <Link 
                to="/contact" 
                className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all"
              >
                Contact Support <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-slate-500 transition-transform ${
                      openIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === idx && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main Home Component
export const Home = () => {
  const navigate = useNavigate();
  const { user, toggleSaveJob } = useAuth();
  const { scrollY } = useScroll();
  
  const [jobs, setJobs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<string>("checking...");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const healthRes = await api.get("/health");
        setDbStatus(healthRes.data.database);

        const [jobsRes, catsRes] = await Promise.all([
          api.get("/jobs?limit=6"),
          api.get("/categories"),
        ]);
        
        setJobs(jobsRes.data.jobs || []);
        setCategories(catsRes.data || []);
      } catch (err) {
        console.error("Home Data Fetch Error:", err);
        setDbStatus("error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (locationQuery) params.append("location", locationQuery);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="space-y-0 pb-20">
      {/* DB Status Indicator */}
      {dbStatus !== "connected" && (
        <div className="bg-red-600 text-white py-2 px-4 text-center text-xs font-bold flex items-center justify-center gap-2">
          <AlertCircle size={14} />
          SYSTEM: Database {dbStatus.toUpperCase()}. Live updates may be delayed.
        </div>
      )}

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#1a1f35] py-20 lg:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              style={{ opacity: heroOpacity, scale: heroScale }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm font-medium backdrop-blur-sm"
              >
                <Sparkles size={16} className="fill-indigo-300" />
                <span>Trusted by 500,000+ Government Job Aspirants</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]"
              >
                Your Gateway to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                  Government Jobs
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-400 max-w-2xl"
              >
                India's most comprehensive platform for Sarkari Naukri. Get real-time alerts, 
                exam updates, results, and preparation resources - all in one place.
              </motion.p>

              {/* Stats Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                <StatsCounter value="10K+" label="Live Jobs" icon={Briefcase} delay={0.4} />
                <StatsCounter value="500+" label="Employers" icon={Building2} delay={0.5} />
                <StatsCounter value="24/7" label="Support" icon={Shield} delay={0.6} />
              </motion.div>

              {/* Search Form */}
              <motion.form 
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="flex flex-col lg:flex-row gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="text"
                      placeholder="Job title, keywords, or organization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-slate-900 shadow-inner outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="relative flex-1 lg:max-w-[240px] group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                      type="text"
                      placeholder="Location..."
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-slate-900 shadow-inner outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    Search Jobs
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.form>

              {/* Popular Searches */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 text-sm"
              >
                <span className="text-slate-500">Popular:</span>
                <div className="flex flex-wrap gap-2">
                  {['SSC CGL', 'UPSC', 'Bank PO', 'Railway', 'Teaching'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        handleSearch();
                      }}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors border border-white/5"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:block"
            >
              <HeroImages />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-500 uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-5 w-5 text-slate-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* News Ticker */}
      <div className="bg-slate-900 border-y border-white/5 py-3 overflow-hidden sticky top-0 z-40 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg mr-6 shadow-lg shadow-red-500/20 uppercase tracking-widest whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            LIVE UPDATES
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="flex space-x-12 animate-marquee whitespace-nowrap text-slate-300 font-medium text-sm">
              <span className="hover:text-indigo-400 cursor-pointer transition-colors">🏆 SSC CGL 2026 Notification Out! 10,000+ Vacancies</span>
              <span className="hover:text-indigo-400 cursor-pointer transition-colors">📢 UPSC Civil Services Prelims Admit Card Released</span>
              <span className="hover:text-indigo-400 cursor-pointer transition-colors">💰 IBPS PO Final Result 2025 Declared - Download Now</span>
              <span className="hover:text-indigo-400 cursor-pointer transition-colors">🚂 Railway RRB Exam Calendar 2026 Released</span>
              <span className="hover:text-indigo-400 cursor-pointer transition-colors">📚 CTET 2026 Application Started - Apply Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between border-b border-slate-200 pb-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">
              <Target className="h-4 w-4" />
              <span>Latest Opportunities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Fresh Jobs
            </h2>
            <p className="text-slate-500 mt-1">Updated every 30 minutes • {jobs.length} new jobs today</p>
          </div>
          <Link 
            to="/jobs" 
            className="hidden md:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold group"
          >
            View All Jobs <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-5">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gradient-to-r from-slate-50 to-slate-100 animate-pulse rounded-2xl"></div>
            ))
          ) : jobs.length > 0 ? (
            jobs.map((job, idx) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 transition-all hover:border-indigo-200 hover:shadow-xl relative group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                        job.type === 'Govt' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {job.type}
                      </span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{job.category?.name || 'General'}</span>
                      {job.is_urgent && (
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-black rounded border border-red-100">
                          URGENT
                        </span>
                      )}
                    </div>
                    
                    <Link to={`/jobs/${job._id}`}>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-4 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Building2 size={14} className="text-slate-400" />
                        {job.organization}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-slate-400" />
                        {job.location || 'Pan India'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex flex-col text-sm bg-slate-50 px-4 py-2 rounded-xl">
                      <span className="text-slate-400 text-xs font-bold uppercase">Vacancies</span>
                      <span className="text-slate-900 font-bold">{job.vacancies || 'Multiple'}</span>
                    </div>
                    <div className="flex flex-col text-sm bg-slate-50 px-4 py-2 rounded-xl">
                      <span className="text-slate-400 text-xs font-bold uppercase">Last Date</span>
                      <span className="text-red-600 font-bold">{formatDate(job.last_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {user && (
                        <button
                          onClick={() => toggleSaveJob(job._id)}
                          className="p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl transition-colors"
                        >
                          {user.saved_jobs?.includes(job._id) ? (
                            <BookmarkCheck className="h-5 w-5 text-indigo-600 fill-indigo-600" />
                          ) : (
                            <Bookmark className="h-5 w-5 text-slate-400" />
                          )}
                        </button>
                      )}
                      <Link
                        to={`/jobs/${job._id}`}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-xl hover:from-indigo-500 hover:to-indigo-600 transition-all text-sm shadow-lg shadow-indigo-500/25"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <Search className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold">No active job listings found.</p>
            </div>
          )}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-6 text-center md:hidden">
          <Link 
            to="/jobs" 
            className="inline-flex items-center gap-2 text-indigo-600 font-bold"
          >
            View All Jobs <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Featured Categories */}
      <FeaturedCategories categories={categories} />

      {/* Process Steps */}
      <ProcessSteps />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, value: "50,000+", label: "Jobs Posted" },
              { icon: Users, value: "500K+", label: "Active Users" },
              { icon: Building2, value: "1,000+", label: "Departments" },
              { icon: Trophy, value: "25,000+", label: "Selected" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center text-white"
                >
                  <div className="inline-flex p-4 bg-white/10 rounded-2xl mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black mb-2">{stat.value}</div>
                  <div className="text-indigo-200 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider">Resources</span>
            <h2 className="text-4xl font-black text-slate-900 mt-2">Everything You Need to Succeed</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Comprehensive resources for your exam preparation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "Admit Cards", desc: "Download hall tickets", color: "from-blue-500 to-blue-600", count: "150+" },
              { icon: Trophy, title: "Exam Results", desc: "Check your results", color: "from-green-500 to-green-600", count: "200+" },
              { icon: CheckCircle, title: "Answer Keys", desc: "Verify your answers", color: "from-purple-500 to-purple-600", count: "300+" },
              { icon: GraduationCap, title: "Study Material", desc: "Free preparation guides", color: "from-orange-500 to-orange-600", count: "500+" },
            ].map((resource, idx) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/${resource.title.toLowerCase().replace(' ', '-')}`}>
                    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${resource.color} p-8 text-white shadow-xl`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                      
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                          <Icon className="h-8 w-8" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-2">{resource.title}</h3>
                        <p className="text-white/80 mb-4">{resource.desc}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                            {resource.count} Available
                          </span>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Subscription Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SubscriptionForm />
      </div>

      {/* SEO Content - Add your SEO content here */}
      <div className="hidden">
        {/* SEO content goes here */}
      </div>
    </div>
  );
};