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
  { label: "Videos", color: "text-red-600", bg: "bg-red-50" },
  { label: "Paediatrics", color: "text-green-600", bg: "bg-green-50" },
  { label: "Gynaecology", color: "text-pink-600", bg: "bg-pink-50" },
  { label: "Orthopaedics", color: "text-orange-600", bg: "bg-orange-50" },
  { label: "General Medicine", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "General Surgery", color: "text-purple-600", bg: "bg-purple-50" },
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
    excerpt: "Dr. Rohit Agarwal, premier pediatrician in Kidwai Nagar, South Kanpur, shares evidence-based newborn child care tips. Learn about wake windows and preventing day-night confusion near Barra and Naubasta.",
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
    catColor: "text-pink-600", catBg: "bg-pink-50", catBorder: "border-pink-100",
    title: "Common Pregnancy Myths Busted",
    excerpt: "Dr. Tripti Mishra, leading gynae and pregnancy delivery specialist near Barra and Naubasta, debunks the most common myths expecting mothers hear from relatives in Kanpur.",
    author: "Dr. Tripti Mishra",
    authorRole: "Senior Gynecologist",
    youtubeId: "https://youtu.be/QNa7juOSI28",
    tag: "Trending",
    date: "June 18, 2026",
    readTime: "5 min watch"
  },
  {
    id: "v3",
    type: "video" as const,
    category: "Videos",
    subCategory: "Paediatrics",
    catColor: "text-green-600", catBg: "bg-green-50", catBorder: "border-green-100",
    title: "5 Superfoods to Boost Brain Power in Kids",
    excerpt: "Dr. Rohit Agarwal shares the top 5 brain-boosting foods that help improve brain development, concentration, and memory power in growing kids aged 1 to 10 years.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Director & Child Specialist",
    youtubeId: "https://www.youtube.com/watch?v=p2WDh4_Jt0w",
    tag: "Child Nutrition",
    date: "June 25, 2026",
    readTime: "8 min watch"
  },
  {
    id: "v4",
    type: "video" as const,
    category: "Videos",
    subCategory: "Paediatrics",
    catColor: "text-green-600", catBg: "bg-green-50", catBorder: "border-green-100",
    title: "How to Calm a Crying Baby: Baby Crying Decoded",
    excerpt: "When a baby is crying continuously, parents start to fear for their little one. Dr. Rohit Agarwal decodes baby crying language to help you figure out what your baby is trying to say.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Director & Child Specialist",
    youtubeId: "https://www.youtube.com/watch?v=_dYu7rxhd3I",
    tag: "Newborn Care",
    date: "June 28, 2026",
    readTime: "10 min watch"
  },
  {
    id: "v5",
    type: "video" as const,
    category: "Videos",
    subCategory: "Gynaecology",
    catColor: "text-pink-600", catBg: "bg-pink-50", catBorder: "border-pink-100",
    title: "Cervical Cancer Screening: HPV Prevention & Treatment",
    excerpt: "Dr. Tripti Mishra discusses cervical cancer, its connection to HPV, screening methods, symptoms, and why it is critical for women to have regular gynecologic checkups.",
    author: "Dr. Tripti Mishra",
    authorRole: "Senior Gynecologist",
    youtubeId: "https://www.youtube.com/watch?v=4kAvlNpgpJA",
    tag: "Women's Health",
    date: "July 2, 2026",
    readTime: "12 min watch"
  },
  {
    id: "v6",
    type: "video" as const,
    category: "Videos",
    subCategory: "Gynaecology",
    catColor: "text-pink-600", catBg: "bg-pink-50", catBorder: "border-pink-100",
    title: "PCOS, Hormones, and Irregular Periods Explained",
    excerpt: "Irregular periods, PCOS, hormonal imbalances, and delayed pregnancy are increasingly common. Dr. Tripti Mishra explains real causes like insulin resistance, stress, diet, and lifestyle remedies.",
    author: "Dr. Tripti Mishra",
    authorRole: "Senior Gynecologist",
    youtubeId: "https://www.youtube.com/watch?v=x_A2JiAx8lc",
    tag: "Hormonal Health",
    date: "July 5, 2026",
    readTime: "15 min watch"
  },
  {
    id: "v7",
    type: "video" as const,
    category: "Videos",
    subCategory: "Paediatrics",
    catColor: "text-green-600", catBg: "bg-green-50", catBorder: "border-green-100",
    title: "Baby Care Tips, Vaccines, and Feeding Mistakes Explained",
    excerpt: "Pediatrician Dr. Rohit Agarwal answers common newborn and child care questions about breastfeeding, formula, Cerelac, vaccinations, baby massage, and screen time.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Director & Child Specialist",
    youtubeId: "https://www.youtube.com/watch?v=RvkBOXafK8w",
    tag: "Parenting Guide",
    date: "July 8, 2026",
    readTime: "18 min watch"
  },

  // --- ARTICLES ---
  {
    id: "a1",
    type: "article" as const,
    category: "Orthopaedics",
    catColor: "text-orange-600", catBg: "bg-orange-50", catBorder: "border-orange-100", iconBg: "bg-orange-100",
    Icon: Bone, iconColor: "text-orange-500",
    title: "Advanced Joint & Spine Care: Restoring Mobility in South Kanpur",
    excerpt: "From joint replacements to advanced spine surgery, learn how our specialized orthopedic wing treats joint pain, fractures, and spinal disorders near Barra and Naubasta.",
    author: "Dr. Vishal Sethiya", authorRole: "Orthopedic Surgeon",
    date: "June 15, 2026", readTime: "6 min read", tag: "Must Read", featured: true,
    image: "/ortho-article.png",
    content: `
      <h2>Orthopedic & Spine Excellence</h2>
      <p>Spinal disorders, fractures, and severe arthritis can significantly restrict your daily mobility. At Lakshya Hospital, Kanpur's leading healthcare facility, we provide super-specialist orthopedic care focusing on both conservative therapies and advanced surgical interventions.</p>
      <h2>Comprehensive Orthopedic Services</h2>
      <ul>
        <li><strong>Spine & Joint Surgery:</strong> Advanced spine surgery, disc therapy, and knee/hip joint replacements.</li>
        <li><strong>Trauma & Fracture Care:</strong> 24/7 emergency fracture restoration and keyhole surgical procedures.</li>
        <li><strong>Pediatric Orthopedics:</strong> Specialist bone and joint alignment therapies for children.</li>
      </ul>
      <h2>Modern Facilities near You</h2>
      <p>Equipped with state-of-the-art modular operating theatres and digital diagnostic systems, our orthopedics department provides world-class bone and joint care for residents of Kidwai Nagar, Barra, Naubasta, and South Kanpur.</p>
    `,
  },
  {
    id: "a2",
    type: "article" as const,
    category: "General Medicine",
    catColor: "text-blue-600", catBg: "bg-blue-50", catBorder: "border-blue-100", iconBg: "bg-blue-100",
    Icon: Stethoscope, iconColor: "text-blue-500",
    title: "Emergency Medicine & Intensive Critical Care: When Minutes Matter",
    excerpt: "Learn the crucial symptoms of respiratory, cardiac, and pediatric emergencies, and explore our 24/7 ICU & critical care services in Kidwai Nagar.",
    author: "Dr. Rohit Agarwal", authorRole: "Founder & Director",
    date: "June 22, 2026", readTime: "5 min read", tag: "Popular", featured: false,
    image: "medicine-article.jpg",
    content: `
      <h2>Lakshya's 13-Year Legacy</h2>
      <p>Founded in 2013 by renowned pediatrician Dr. Rohit Agarwal, Lakshya Hospital has grown into one of Kanpur's leading healthcare facilities. Over the last 13 years, we have transitioned from a single-focus clinic into a comprehensive 30-bed multi-speciality hospital.</p>
      <h2>12 Core Specialties Under One Roof</h2>
      <p>Guided by our mission to deliver world-class yet affordable care, our campus is at the forefront of major medical programs:</p>
      <ul>
        <li>General Medicine & Critical Care (ICU/NICU)</li>
        <li>Obstetrics & Gynecology (Dr. Tripti Mishra)</li>
        <li>Pediatrics & Pediatric Surgery (Dr. Rohit Agarwal)</li>
        <li>Orthopedics, Neuro Surgery, & Spine Surgery</li>
        <li>Uro Surgery, ENT Care, and Plastic Surgery</li>
      </ul>
      <h2>Empanelled for Ayushman & State Schemes</h2>
      <p>We believe in accessibility. We are fully empanelled for the Ayushman Bharat PM-JAY scheme and state government DDUP schemes, accepting cashless insurances for patients in Kidwai Nagar, Barra, Naubasta, and Kanpur.</p>
    `,
  },
  {
    id: "a3",
    type: "article" as const,
    category: "Paediatrics",
    catColor: "text-green-600", catBg: "bg-green-50", catBorder: "border-green-100", iconBg: "bg-green-100",
    Icon: Baby, iconColor: "text-green-500",
    title: "Your Child's Health & Immunization Checklist: A Pediatrician's Roadmap",
    excerpt: "Childhood immunizations and developmental tracking are key to robust growth. Get evidence-based checkup guidelines from Kanpur's renowned pediatrician Dr. Rohit Agarwal.",
    author: "Dr. Rohit Agarwal", authorRole: "Founder & Child Specialist",
    date: "June 5, 2026", readTime: "8 min read", tag: "Essential", featured: false,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80",
    content: `
      <h2>Comprehensive Child Care & Development</h2>
      <p>Vaccination is critical to protect your child from life-threatening diseases. Under the supervision of renowned pediatrician Dr. Rohit Agarwal at Lakshya Hospital in South Kanpur, we offer pediatric care programs and child immunization schedules in line with IAP guidelines, serving families across Barra, Naubasta, and Kidwai Nagar.</p>
      <h2>Key Childhood Milestones to Watch</h2>
      <ul>
        <li><strong>Physical Growth:</strong> Regular weight and height tracking to ensure appropriate development.</li>
        <li><strong>Immunization Timelines:</strong> Keeping on track with essential vaccine doses during the first 2 years.</li>
        <li><strong>Cognitive Milestones:</strong> Tracking speech, social, and motor development relative to age benchmarks.</li>
      </ul>
    `,
  },
  {
    id: "a4",
    type: "article" as const,
    category: "Gynaecology",
    catColor: "text-pink-600", catBg: "bg-pink-50", catBorder: "border-pink-100", iconBg: "bg-pink-100",
    Icon: Heart, iconColor: "text-pink-500",
    title: "Obstetric Wellness & Safe Pregnancy Delivery: What Every Mother Should Know",
    excerpt: "Explore crucial prenatal checkups, delivery preparations, and advanced neonatal support services available under one roof at our South Kanpur campus.",
    author: "Dr. Tripti Mishra", authorRole: "Co-Founder & Senior Gynecologist",
    date: "May 28, 2026", readTime: "7 min read", tag: "Trending", featured: false,
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200&q=80",
    content: `
      <h2>Prenatal Checkups & Safe Delivery</h2>
      <p>A safe pregnancy journey requires consistent, specialized obstetric monitoring. Led by co-founder Dr. Tripti Mishra, the gynecology department at Lakshya Hospital features dedicated prenatal consultation clinics, high-risk pregnancy monitoring, and comfortable delivery suites in Kanpur.</p>
      <h2>Maternity & Delivery Preparations</h2>
      <ul>
        <li><strong>Regular Prenatal Visits:</strong> Checking maternal vitals, fetal growth, and conducting routine screenings.</li>
        <li><strong>Emergency Support:</strong> 24/7 emergency labor care, supported by our advanced neonatal ICU (NICU) incubators.</li>
        <li><strong>Post-Natal Guidance:</strong> Complete support for infant care, lactation counseling, and maternal recovery.</li>
      </ul>
    `,
  },
  {
    id: "a5",
    type: "article" as const,
    category: "General Surgery",
    catColor: "text-purple-600", catBg: "bg-purple-50", catBorder: "border-purple-100", iconBg: "bg-purple-100",
    Icon: Activity, iconColor: "text-purple-500",
    title: "Minimally Invasive Laparoscopy & General Surgery: Faster Healing and Recovery",
    excerpt: "From appendectomy to gallbladder stone removal, discover how keyhole laparoscopic surgeries reduce postoperative pain and accelerate recovery times.",
    author: "Dr. Kuldeep Kumar", authorRole: "General Surgeon",
    date: "May 15, 2026", readTime: "6 min read", tag: "New", featured: false,
    image: "/Laprascopic_Surgery.jpg",
    content: `
      <h2>Benefits of Laparoscopic Surgery</h2>
      <p>Laparoscopic (minimally invasive or keyhole) surgery has revolutionized general surgery. At Lakshya Hospital in South Kanpur, we utilize advanced laparoscopic instruments to perform keyhole operations for appendicitis, gallstones, hernias, and gynecological procedures.</p>
      <h2>Why Choose Laparoscopy?</h2>
      <ul>
        <li><strong>Minimal Scarring:</strong> Performed through tiny incisions instead of large open cuts.</li>
        <li><strong>Reduced Postoperative Pain:</strong> Significantly less damage to abdominal muscles leads to a comfortable recovery.</li>
        <li><strong>Rapid Recovery:</strong> Most patients are discharged within 24–48 hours and return to normal activity much sooner.</li>
      </ul>
      <h2>Round-the-Clock Surgical Coverage</h2>
      <p>Our operation theatres are backed by 24/7 emergency services, ready for emergency appendectomies, trauma surgery, and pediatric surgeries for residents in Kidwai Nagar, Barra, and Naubasta.</p>
    `,
  }
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

          <h1 className="font-extrabold text-gray-900 leading-snug mb-7 text-2xl sm:text-3xl font-sans">
            {article.title}
          </h1>

          <div
            className="text-slate-700 text-base md:text-md leading-relaxed space-y-4 font-sans [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:text-lg [&_h2]:font-sans [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:text-slate-750 [&_strong]:text-primary [&_strong]:font-bold [&_p]:mb-4"
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
        className="group grid md:grid-cols-12 rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
      >
        <div className="md:col-span-5 relative overflow-hidden h-60 md:h-full">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 md:to-black/0" />
        </div>
        <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-center gap-4 relative overflow-hidden">
          {/* Background icon decoration */}
          {item.Icon && (
            <item.Icon className="absolute -right-8 -bottom-8 w-56 h-56 text-slate-100/60 group-hover:scale-105 group-hover:-rotate-6 transition-all duration-500 pointer-events-none -z-10" />
          )}
          <div className="relative z-10">
            <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${item.catBg} ${item.catColor} ${item.catBorder} mb-2`}>
              {item.category}
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-2 font-display max-w-2xl">
              {item.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xl mb-3">{item.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
              <span className="flex items-center gap-1.5 font-semibold text-gray-700">
                <User size={11} className="text-gray-400" />
                {item.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-gray-400" />
                {item.readTime}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
              Read Full Article <ArrowRight size={14} />
            </span>
          </div>
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
              <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center shadow-md shadow-red-950/30 group-hover:bg-red-500 transition-all duration-300 group-hover:scale-110 relative animate-pulse group-hover:animate-none">
                <span className="absolute inset-0 rounded-full bg-red-600/20 animate-ping group-hover:animate-none" />
                <Play size={14} fill="white" className="text-white relative z-10 translate-x-0.5" />
              </div>
            </div>
          </>
        ) : (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
        )}

        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.catBg} ${item.catColor} ${item.catBorder}`}>
            {item.type === "video" ? item.subCategory : item.category}
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

  // Newsletter states
  const [newsEmail, setNewsEmail] = useState("");
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsStatus, setNewsStatus] = useState<"idle" | "success" | "error">("idle");
  const [newsErrorMsg, setNewsErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;

    setNewsLoading(true);
    setNewsStatus("idle");
    setNewsErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsEmail })
      });

      if (res.ok) {
        setNewsStatus("success");
        setNewsEmail("");
      } else {
        const data = await res.json();
        setNewsStatus("error");
        setNewsErrorMsg(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("Newsletter submission error:", err);
      setNewsStatus("error");
      setNewsErrorMsg("Network error. Please try again later.");
    } finally {
      setNewsLoading(false);
    }
  };

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
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white pt-24 pb-20">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="hero-anim flex items-center gap-2 text-indigo-200/70 text-xs mb-8">
              <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft size={12} /> Home
              </a>
              <span className="text-indigo-300/30">/</span>
              <span className="text-white font-medium">Health Library</span>
            </div>

            <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-20 items-center">

              {/* LEFT SIDE */}
              <div>
                <div className="hero-anim hero-anim-d1 flex items-center gap-2 mb-4">
                  <BookOpen size={14} className="text-cyan-400" />
                  <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">
                    Lakshya Health Library
                  </span>
                </div>

                <h1
                  className="hero-anim hero-anim-d2 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 font-display"
                >
                  Expert Insights &
                  <br />
                  <span className="text-cyan-400">
                    Health Videos
                  </span>
                </h1>

                <p className="hero-anim hero-anim-d3 text-slate-350 text-base md:text-lg leading-relaxed max-w-xl">
                  Evidence-based articles, educational videos and expert medical guidance
                  reviewed by qualified healthcare professionals.
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="px-5.5 py-3 rounded-xl bg-white text-indigo-950 font-semibold shadow-lg hover:scale-105 transition-all">
                    Explore Articles
                  </button>

                  <button className="px-5.5 py-3 rounded-xl border border-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/5 transition-all">
                    Watch Videos
                  </button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-white/5">
                  {[
                    { value: `${CONTENT.length}+`, label: "Articles & Videos" },
                    { value: "12+", label: "Super Specialties" },
                    { value: "6+", label: "Expert Authors" },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 backdrop-blur-md min-w-[125px]">
                      <div className="text-2xl md:text-3xl font-bold text-white leading-none font-display">
                        {value}
                      </div>
                      <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1.5">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Strip */}
                <div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4.5 max-w-lg">
                  <div className="flex items-center gap-3.5">
                    <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        Doctor Reviewed Content
                      </h4>
                      <p className="text-slate-400 text-xs mt-0.5">
                        Every article and video is reviewed by qualified healthcare
                        professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="relative w-full">
                <div className="absolute inset-0 flex justify-end items-center pointer-events-none">
                  <div className="w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-w-[430px] ml-auto w-full">

                  {/* Video Thumbnail */}
                  <a
                    href="https://youtu.be/yRtVL-XbWZc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group aspect-video overflow-hidden"
                  >
                    <img
                      src="https://img.youtube.com/vi/yRtVL-XbWZc/maxresdefault.jpg"
                      alt="Newborn Sleep Tips"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:bg-red-500 transition-all duration-300 group-hover:scale-110 relative">
                        <span className="absolute inset-0 rounded-full bg-red-600/20 animate-ping group-hover:animate-none" />
                        <Play
                          fill="white"
                          className="text-white relative z-10 translate-x-0.5"
                          size={14}
                        />
                      </div>
                    </div>
                  </a>

                  <div className="p-6">

                    {/* Featured Label */}
                    <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                      <PlayCircle size={13} />
                      Featured Video
                    </div>

                    {/* Doctor Reviewed Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold mt-4 border border-green-500/20">
                      <ShieldCheck size={13} />
                      Doctor Reviewed
                    </div>

                    <h3 className="text-xl font-bold text-white mt-4 font-display">
                      Newborn Sleep Tips for Parents
                    </h3>

                    <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                      Expert advice from Dr. Rohit Agarwal on newborn sleep patterns,
                      feeding schedules and healthy sleep habits for newborn babies.
                    </p>

                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-800">

                      <div>
                        <p className="font-bold text-white text-sm">
                          Dr. Rohit Agarwal
                        </p>

                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                          Pediatric Specialist
                        </p>
                      </div>

                      <a
                        href="https://youtu.be/yRtVL-XbWZc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 font-bold text-xs hover:underline flex items-center gap-1"
                      >
                        Watch Video →
                      </a>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ── FILTER & SEARCH BAR ─────────────────────────────── */}
        <div className="relative z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
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
            <div className="flex items-center justify-end mb-7">
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
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <form className="flex gap-3 w-full md:w-auto" onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      disabled={newsLoading}
                      className="flex-1 md:w-64 px-4 py-3 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-70"
                    />
                    <button
                      type="submit"
                      disabled={newsLoading}
                      className="px-5 py-3 rounded-full bg-white text-primary font-bold text-sm hover:bg-gray-50 transition-colors shrink-0 shadow-md disabled:opacity-75 flex items-center justify-center min-w-[100px]"
                    >
                      {newsLoading ? "Subscribing..." : "Subscribe"}
                    </button>
                  </form>
                  {newsStatus === "success" && (
                    <p className="text-emerald-300 text-xs font-bold mt-1">✓ Thank you for subscribing! We have registered your email.</p>
                  )}
                  {newsStatus === "error" && (
                    <p className="text-red-300 text-xs font-bold mt-1">✗ {newsErrorMsg || "Failed to subscribe. Please try again."}</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
