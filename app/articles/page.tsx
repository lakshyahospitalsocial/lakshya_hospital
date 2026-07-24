"use client";
import React, { useState, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { VideoModal, extractYouTubeId } from "../../components/Articles";
import {
  X, Clock, User, ArrowRight, BookOpen, Heart, Brain,
  Baby, Activity, Stethoscope, Bone, TrendingUp, Search,
  ChevronRight, Tag, Calendar, ArrowLeft, PlayCircle,
  Play,
  ShieldCheck
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────── */
const CATEGORIES = [
  { label: "All", color: "text-gray-700", bg: "bg-gray-100" },
  { label: "Videos", color: "text-red-600", bg: "bg-red-50" }, // Added Videos category
  { label: "Cardiology", color: "text-red-600", bg: "bg-red-50" },
  { label: "Neurology", color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Paediatrics", color: "text-green-600", bg: "bg-green-50" },
  { label: "Orthopaedics", color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Wellness", color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Oncology", color: "text-sky-700", bg: "bg-sky-50" },
  { label: "Gynaecology", color: "text-pink-600", bg: "bg-pink-50" },
];

const CONTENT = [
  // --- VIDEOS ---
  {
    id: "v1",
    type: "video" as const,
    category: "Videos",
    subCategory: "Paediatrics",
    catColor: "text-green-600", catBg: "bg-green-50", catBorder: "border-green-100",
    title: "Newborn Sleep Tips: Establishing Healthy Habits for Your Baby",
    excerpt: "Dr. Rohit Agarwal shares practical, evidence-based sleep tips for newborns. Learn about wake windows, day-night confusion, the 5 S techniques, and how to prevent sleep deprivation.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Director & Child Specialist",
    youtubeId: "https://youtu.be/yRtVL-XbWZc",
    tag: "Parenting Guide",
    date: "June 20, 2026",
    readTime: "12 min watch"
  },
  {
    id: "v2",
    type: "video" as const,
    category: "Videos",
    subCategory: "Gynaecology",
    catColor: "text-red-600", catBg: "bg-red-50", catBorder: "border-red-100",
    title: "Common Pregnancy Myths Busted",
    excerpt: "Dr. Tripti Mishra debunks the most common myths expecting mothers hear from relatives.",
    author: "Dr. Tripti Mishra",
    authorRole: "Senior Gynecologist",
    youtubeId: "https://youtu.be/QNa7juOSI28",
    tag: "Trending",
    date: "June 18, 2026",
    readTime: "5 min watch"
  },

  // --- ARTICLES ---
  {
    id: "a1",
    type: "article" as const,
    category: "Cardiology",
    catColor: "text-red-600", catBg: "bg-red-50", catBorder: "border-red-100", iconBg: "bg-red-100",
    Icon: Heart, iconColor: "text-red-500",
    title: "Understanding Heart Disease: Early Warning Signs You Shouldn't Ignore",
    excerpt: "Cardiovascular disease is the world's leading cause of death. Knowing the subtle warning signs — from chest discomfort to unusual fatigue — can literally save your life and the lives of those you love.",
    author: "Dr. Rajesh Sharma", authorRole: "Senior Cardiologist",
    date: "June 15, 2026", readTime: "6 min read", tag: "Must Read", featured: true,
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=1200&q=80",
    content: `
      <h2>What is Heart Disease?</h2>
      <p>Heart disease describes a range of conditions that affect your heart — from coronary artery disease and arrhythmias to congenital defects.</p>
      <h2>Early Warning Signs</h2>
      <ul>
        <li><strong>Chest discomfort:</strong> Persistent pressure, squeezing, fullness, or pain in the centre of the chest lasting more than a few minutes.</li>
        <li><strong>Shortness of breath:</strong> Occurring with or without chest discomfort.</li>
        <li><strong>Pain radiating to arms, back, neck, or jaw.</strong></li>
        <li><strong>Cold sweats, nausea, or lightheadedness.</strong></li>
        <li><strong>Unusual fatigue,</strong> especially in women — this is frequently overlooked.</li>
      </ul>
      <h2>Prevention Strategies</h2>
      <p>Heart disease can often be prevented or significantly delayed with the right lifestyle choices.</p>
    `,
  },
  {
    id: "a2",
    type: "article" as const,
    category: "Neurology",
    catColor: "text-purple-600", catBg: "bg-purple-50", catBorder: "border-purple-100", iconBg: "bg-purple-100",
    Icon: Brain, iconColor: "text-purple-500",
    title: "Migraine vs. Headache: How to Tell the Difference and When to See a Doctor",
    excerpt: "Not all head pain is equal. Understanding the distinction between migraines and tension headaches is crucial for getting proper, effective treatment and avoiding unnecessary suffering.",
    author: "Dr. Priya Nair", authorRole: "Neurologist",
    date: "June 10, 2026", readTime: "5 min read", tag: "Popular", featured: false,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80",
    content: `<p>Detailed content goes here...</p>`,
  },
  {
    id: "a3",
    type: "article" as const,
    category: "Paediatrics",
    catColor: "text-green-600", catBg: "bg-green-50", catBorder: "border-green-100", iconBg: "bg-green-100",
    Icon: Baby, iconColor: "text-green-500",
    title: "Your Child's Vaccination Schedule: A Complete Guide for Parents",
    excerpt: "Vaccines are one of the most effective tools to keep your child healthy and safe. Here is everything modern parents need to know about the recommended schedule, safety, and common concerns.",
    author: "Dr. Sunita Reddy", authorRole: "Paediatric Specialist",
    date: "June 5, 2026", readTime: "8 min read", tag: "Essential", featured: false,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80",
    content: `<p>Detailed content goes here...</p>`,
  },
  {
    id: "a4",
    type: "article" as const,
    category: "Orthopaedics",
    catColor: "text-orange-600", catBg: "bg-orange-50", catBorder: "border-orange-100", iconBg: "bg-orange-100",
    Icon: Bone, iconColor: "text-orange-500",
    title: "Back Pain Relief: Evidence-Based Strategies That Actually Work",
    excerpt: "Over 80% of adults will experience significant back pain at some point in their lives. Discover what the latest science actually says about achieving long-term, lasting relief.",
    author: "Dr. Anil Kumar", authorRole: "Orthopaedic Surgeon",
    date: "May 28, 2026", readTime: "7 min read", tag: "Trending", featured: false,
    image: "https://images.unsplash.com/photo-1616279969856-759f316a5ac1?w=1200&q=80",
    content: `<p>Detailed content goes here...</p>`,
  },
];

/* ─── ARTICLE READER MODAL ─────────────────────────────────── */
function ArticleModal({ article, onClose }: { article: typeof CONTENT[0]; onClose: () => void }) {
  if (article.type !== "article") return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl my-6 animate-[modalIn_.3s_cubic-bezier(.4,0,.2,1)]">

        {/* Hero image */}
        <div className="relative h-60 sm:h-80 overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
          >
            <X size={16} />
          </button>

          {/* Badges */}
          <div className="absolute bottom-5 left-5 flex gap-2 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${article.catBg} ${article.catColor} border ${article.catBorder}`}>
              {article.category}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-sm border border-white/20">
              {article.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mb-5">
            <span className="flex items-center gap-1.5 font-semibold text-gray-700">
              {article.Icon && (
                <div className={`w-6 h-6 rounded-full ${article.iconBg} flex items-center justify-center`}>
                  <article.Icon size={11} className={article.iconColor} />
                </div>
              )}
              {article.author}
              <span className="text-gray-300 font-normal">·</span>
              <span className="italic text-gray-400 font-normal">{article.authorRole}</span>
            </span>
            <span className="flex items-center gap-1"><Calendar size={11} /> {article.date}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {article.readTime}</span>
          </div>

          <h1 className="font-bold text-gray-900 leading-snug mb-7 text-xl sm:text-2xl" style={{ fontFamily: "var(--font-display, serif)" }}>
            {article.title}
          </h1>

          <div
            className="text-gray-600 text-sm leading-relaxed space-y-3 [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:text-base [&_h2]:mt-6 [&_h2]:mb-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_li]:text-gray-600 [&_strong]:text-primary [&_strong]:font-semibold [&_p]:mb-2"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />

          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Have questions? Talk to our specialists.</p>
              <p className="text-xs text-gray-500 mt-0.5">Our team is available 24/7 for consultations.</p>
            </div>
            <a href="/book-appointment" className="shrink-0 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5 flex items-center gap-2">
              Book Consultation <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CONTENT CARD (Handles Both Video and Article) ───────────── */
function ContentCard({ item, onClick, featured = false }: {
  item: typeof CONTENT[0];
  onClick: () => void;
  featured?: boolean;
}) {
  if (featured && item.type === "article") {
    return (
      <div
        onClick={onClick}
        className="group grid md:grid-cols-5 rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
      >
        <div className="md:col-span-3 relative overflow-hidden h-60 md:h-full">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 md:to-black/0" />
        </div>
        <div className="md:col-span-2 p-7 md:p-9 flex flex-col justify-center gap-4">
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${item.catBg} ${item.catColor} ${item.catBorder}`}>
              {item.category}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-yellow-50 text-yellow-700 border border-yellow-100">
              ⭐ Featured
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug" style={{ fontFamily: "var(--font-display, serif)" }}>
            {item.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">{item.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 font-medium text-gray-600"><User size={11} />{item.author}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{item.readTime}</span>
          </div>
          <span className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
            Read Full Article <ArrowRight size={14} />
          </span>
        </div>
      </div>
    );
  }

  // Normal Card for either Video or Article
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
        {item.type === "video" ? (
          <>
            <img
              src={`https://img.youtube.com/vi/${extractYouTubeId(item.youtubeId as string)}/maxresdefault.jpg`}
              onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${extractYouTubeId(item.youtubeId as string)}/hqdefault.jpg`; }}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-red-600 border-[3px] border-white flex items-center justify-center group-hover:bg-red-500 transition-all shadow-lg group-hover:scale-110">
                <PlayCircle className="w-6 h-6 text-white ml-0.5" />
              </div>
            </div>
          </>
        ) : (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
        )}

        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.catBg} ${item.catColor} ${item.catBorder}`}>
            {item.type === "video" ? item.subCategory : item.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-gray-600 shadow-sm flex items-center gap-1">
            {item.type === "video" ? <PlayCircle size={10} /> : <TrendingUp size={9} />}
            {item.tag}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow gap-3">
        <h3 className="font-bold text-gray-900 leading-snug text-[15px]" style={{ fontFamily: "var(--font-display, serif)" }}>
          {item.title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed flex-grow line-clamp-3">{item.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="text-[11px] text-gray-400">
            <p className="font-bold text-gray-800 flex items-center gap-1 mb-0.5"><User size={10} />{item.author}</p>
            <p className="flex items-center gap-1"><Clock size={9} />{item.readTime}</p>
          </div>
          <span className="flex items-center gap-1 text-primary text-[11px] font-bold group-hover:gap-2 transition-all">
            {item.type === "video" ? "Watch Video" : "Read Article"} {item.type === "video" ? <PlayCircle size={10} /> : <ArrowRight size={10} />}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Modals state
  const [selectedArticle, setSelectedArticle] = useState<typeof CONTENT[0] | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = activeCategory === "All" ? CONTENT : CONTENT.filter((a) => a.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.type === 'video' && a.subCategory?.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, search]);

  const featuredArticle = CONTENT.find((a) => a.type === "article" && a.featured);
  const showFeatured = activeCategory === "All" && !search.trim();
  const gridItems = showFeatured ? filtered.filter((a) => a.id !== featuredArticle?.id) : filtered;

  const handleCardClick = (item: typeof CONTENT[0]) => {
    if (item.type === "video") {
      setActiveVideoId(item.youtubeId as string);
    } else {
      setSelectedArticle(item);
    }
  };

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(28px) scale(.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-anim { animation: heroFadeIn .6s ease both; }
        .hero-anim-d1 { animation-delay: .1s; }
        .hero-anim-d2 { animation-delay: .2s; }
        .hero-anim-d3 { animation-delay: .3s; }
      `}</style>

      {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      {activeVideoId && <VideoModal youtubeId={activeVideoId} onClose={() => setActiveVideoId(null)} />}

      <Header />

      <main>
        {/* ── HERO BANNER ─────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white pt-16 pb-20">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />

          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="hero-anim flex items-center gap-2 text-blue-200 text-sm mb-8">
              <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft size={14} /> Home
              </a>
              <span className="text-blue-300">/</span>
              <span className="text-white font-medium">Health Library</span>
            </div>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">

              {/* LEFT SIDE */}
              <div>
                <div className="hero-anim hero-anim-d1 flex items-center gap-2 mb-4">
                  <BookOpen size={15} className="text-cyan-300" />
                  <span className="text-cyan-300 font-bold text-xs uppercase tracking-widest">
                    Lakshya Health Library
                  </span>
                </div>

                <h1
                  className="hero-anim hero-anim-d2 text-4xl md:text-6xl font-bold leading-tight mb-5"
                  style={{ fontFamily: "var(--font-display, serif)" }}
                >
                  Expert Insights &
                  <br />
                  <span className="text-cyan-300">
                    Health Videos
                  </span>
                </h1>

                <p className="hero-anim hero-anim-d3 text-blue-100 text-lg leading-relaxed max-w-xl">
                  Evidence-based articles, educational videos and expert medical guidance
                  reviewed by qualified healthcare professionals.
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="px-6 py-3 rounded-xl bg-white text-primary font-semibold shadow-lg hover:scale-105 transition-all">
                    Explore Articles
                  </button>

                  <button className="px-6 py-3 rounded-xl border border-white/20 backdrop-blur-md text-white font-semibold hover:bg-white/10 transition-all">
                    Watch Videos
                  </button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/15">
                  {[
                    { value: `${CONTENT.length}+`, label: "Articles & Videos" },
                    { value: "8+", label: "Specialities Covered" },
                    { value: "10+", label: "Expert Authors" },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div
                        className="text-4xl md:text-5xl font-bold text-white"
                        style={{ fontFamily: "var(--font-display, serif)" }}
                      >
                        {value}
                      </div>
                      <div className="text-blue-200 text-xs font-medium mt-1">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Strip */}
                <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-cyan-300" />
                    <div>
                      <h4 className="font-semibold text-white">
                        Doctor Reviewed Content
                      </h4>
                      <p className="text-blue-100 text-xs">
                        Every article and video is reviewed by qualified healthcare
                        professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              {/* RIGHT SIDE */}
              <div className="relative">
                <div className="absolute inset-0 flex justify-end items-center pointer-events-none">
                  <div className="w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
                </div>
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-[430px] ml-auto">

                  {/* Video Thumbnail */}
                  <a
                    href="https://youtu.be/yRtVL-XbWZc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group"
                  >
                    <img
                      src="https://img.youtube.com/vi/yRtVL-XbWZc/maxresdefault.jpg"
                      alt="Newborn Sleep Tips"
                      className="w-full aspect-video object-cover"
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl">
                        <Play
                          fill="white"
                          className="text-white ml-1"
                          size={24}
                        />
                      </div>
                    </div>
                  </a>

                  <div className="p-6">

                    {/* Featured Label */}
                    <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                      <PlayCircle size={14} />
                      Featured Video
                    </div>

                    {/* Doctor Reviewed Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold mt-4">
                      <ShieldCheck size={14} />
                      Doctor Reviewed
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mt-4">
                      Newborn Sleep Tips for Parents
                    </h3>

                    <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                      Expert advice from Dr. Rohit Agarwal on newborn sleep patterns,
                      feeding schedules and healthy sleep habits for newborn babies.
                    </p>

                    <div className="flex items-center justify-between mt-5">

                      <div>
                        <p className="font-semibold text-gray-900">
                          Dr. Rohit Agarwal
                        </p>

                        <p className="text-xs text-gray-500">
                          Pediatric Specialist
                        </p>
                      </div>

                      <a
                        href="https://youtu.be/yRtVL-XbWZc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-semibold hover:underline"
                      >
                        Watch →
                      </a>

                    </div>

                  </div>

                </div>

              </div>

            </div>
            {/* <div className="max-w-2xl">
              <div className="hero-anim hero-anim-d1 flex items-center gap-2 mb-4">
                <BookOpen size={15} className="text-cyan-300" />
                <span className="text-cyan-300 font-bold text-xs uppercase tracking-widest">Lakshya Health Library</span>
              </div>
              <h1 className="hero-anim hero-anim-d2 text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-display, serif)" }}>
                Expert Insights &amp; <br />
                <span className="text-cyan-300">Health Videos</span>
              </h1>
              <p className="hero-anim hero-anim-d3 text-blue-100 text-base leading-relaxed max-w-lg">
                Evidence-based articles and educational videos crafted by our team of specialists.
              </p>
            </div> */}

            {/* <div className="hero-anim hero-anim-d3 flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/15">
              {[
                { value: `${CONTENT.length}+`, label: "Articles & Videos" },
                { value: "8", label: "Specialities Covered" },
                { value: "10+", label: "Expert Authors" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display, serif)" }}>{value}</div>
                  <div className="text-blue-200 text-xs font-medium mt-0.5">{label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* ── FILTER & SEARCH BAR ─────────────────────────────── */}
        <div className="sticky top-[80px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map(({ label }) => (
                  <button
                    key={label}
                    onClick={() => setActiveCategory(label)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${activeCategory === label
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : `bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary`
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="relative shrink-0 w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search library…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTENT AREA ────────────────────────────────────── */}
        <div className="bg-gray-50/60 min-h-screen">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-7">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filtered.length}</span> items
                {activeCategory !== "All" && (
                  <span> in <span className="font-semibold text-primary">{activeCategory}</span></span>
                )}
                {search && (
                  <span> for "<span className="font-semibold text-gray-800">{search}</span>"</span>
                )}
              </p>
              {(activeCategory !== "All" || search) && (
                <button onClick={() => { setActiveCategory("All"); setSearch(""); }} className="text-xs text-primary hover:underline font-medium flex items-center gap-1">
                  <X size={12} /> Clear filters
                </button>
              )}
            </div>

            {/* Featured */}
            {showFeatured && featuredArticle && (
              <div className="mb-7">
                <ContentCard item={featuredArticle} onClick={() => handleCardClick(featuredArticle)} featured />
              </div>
            )}

            {/* Grid */}
            {gridItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {gridItems.map((item) => (
                  <ContentCard key={item.id} item={item} onClick={() => handleCardClick(item)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Search size={22} className="text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">No content found</h3>
                <p className="text-gray-500 text-sm">Try a different search term or select another category.</p>
                <button
                  onClick={() => { setActiveCategory("All"); setSearch(""); }}
                  className="mt-5 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
                >
                  View All Content
                </button>
              </div>
            )}

            {/* Newsletter strip */}
            <div className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-bold text-xl mb-1">Get Health Tips in Your Inbox</h3>
                  <p className="text-blue-100 text-sm">Weekly insights from our specialists, delivered straight to you.</p>
                </div>
                <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Enter your email" className="flex-1 md:w-64 px-4 py-3 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/40" />
                  <button type="submit" className="px-5 py-3 rounded-full bg-white text-primary font-bold text-sm hover:bg-gray-50 transition-colors shrink-0 shadow-md">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
