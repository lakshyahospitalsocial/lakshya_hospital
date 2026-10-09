"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  X, Clock, User, ArrowRight, BookOpen, Heart, Brain,
  Baby, ChevronRight, PlayCircle, Bone, Stethoscope, Play
} from "lucide-react";

/* ─── PREVIEW ARTICLES ─────────────────────────────── */
const PREVIEW_ARTICLES = [
  {
    id: 1,
    category: "Orthopaedics",
    catColor: "text-orange-600",
    catBg: "bg-orange-50",
    catBorder: "border-orange-100",
    Icon: Bone,
    title: "Advanced Joint & Spine Care: Restoring Mobility in South Kanpur",
    excerpt: "From joint replacements to advanced spine surgery, learn how our specialized orthopedic wing treats joint pain, fractures, and spinal disorders near Barra and Naubasta.",
    author: "Dr. Vishal Sethiya",
    authorRole: "Orthopedic Surgeon",
    date: "June 15, 2026",
    readTime: "6 min read",
    tag: "Must Read",
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
    id: 2,
    category: "Multi-Speciality",
    catColor: "text-blue-600",
    catBg: "bg-blue-50",
    catBorder: "border-blue-100",
    Icon: Stethoscope,
    title: "Kanpur's Healthcare Evolution: The Rise of Multi-Speciality Tertiary Care",
    excerpt: "Discover how Lakshya Hospital grew from a child clinic into a 30-bed multi-speciality tertiary care center offering surgery, urology, gynae, and critical care.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Founder & Director",
    date: "June 22, 2026",
    readTime: "5 min read",
    tag: "Popular",
    image: "/Lakshya_Hospital.png",
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
    `
  },
  {
    id: 3,
    category: "Paediatrics",
    catColor: "text-green-600",
    catBg: "bg-green-50",
    catBorder: "border-green-100",
    Icon: Baby,
    title: "Your Child's Health & Immunization Checklist: A Pediatrician's Roadmap",
    excerpt: "Childhood immunizations and developmental tracking are key to robust growth. Get evidence-based checkup guidelines from Kanpur's renowned pediatrician Dr. Rohit Agarwal.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Founder & Child Specialist",
    date: "June 5, 2026",
    readTime: "8 min read",
    tag: "Essential",
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
    id: 4,
    category: "Gynaecology",
    catColor: "text-pink-600",
    catBg: "bg-pink-50",
    catBorder: "border-pink-100",
    Icon: Heart,
    title: "10 Reasons to See a Gynecologist | When Should You Visit?",
    excerpt: "Dr. Tripti Mishra explains 10 important situations when women and girls should consult a gynecologist.",
    author: "Dr. Tripti Mishra",
    authorRole: "Obstetrician & Gynecologist",
    date: "July 18, 2026",
    readTime: "5 min read",
    tag: "Women's Health",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200&q=80",
    content: `
      <h2>When Should You Consult a Gynecologist?</h2>
      <p>In this guide, Dr. Tripti Mishra, Obstetrician & Gynecologist at Lakshya Hospital, Kanpur, explains 10 important situations when women and girls should consult a gynecologist.</p>
      
      <h2>10 Reasons to Consider a Check-Up</h2>
      <ul>
        <li>Periods start before the age of 9 or have not started by the age of 16</li>
        <li>Periods are irregular — occurring less than 21 days or more than 35 days apart, or lasting unusually long</li>
        <li>You experience very heavy bleeding or pass large blood clots during periods</li>
        <li>Period pain is severe enough to affect your daily routine</li>
        <li>You experience pain or difficulty during intimacy</li>
        <li>Vaginal discharge has an unusual colour, strong smell, itching or irritation</li>
        <li>You are planning a pregnancy and want a pre-pregnancy health check-up</li>
        <li>You have been trying to conceive for 1 year if under 30, or for 6 months if over 30</li>
        <li>You are pregnant and need regular gynecological check-ups to monitor your health and the baby's growth</li>
        <li>You want a routine gynecological check-up even when you have no obvious symptoms</li>
      </ul>

      <h2>The Importance of Regular Check-Ups</h2>
      <p>Dr. Tripti also explains why regular gynecological check-ups can be important for monitoring women's health, including appropriate screening such as Pap smear, breast examination and other investigations when recommended by your doctor. If you have any concerning symptoms or questions about your reproductive health, consult a qualified gynecologist.</p>
    `,
  },
  {
    id: 5,
    category: "Paediatrics",
    catColor: "text-green-600",
    catBg: "bg-green-50",
    catBorder: "border-green-100",
    Icon: Baby,
    title: "How to Boost Child Immunity Naturally | 7 Tips",
    excerpt: "Dr. Rohit Agarwal shares 7 important tips to build healthy daily habits to prevent cold and cough.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Child Specialist & Director",
    date: "July 20, 2026",
    readTime: "6 min read",
    tag: "Child Health",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80",
    content: `
      <h2>Building Your Child's Immunity</h2>
      <p>Does your child frequently suffer from cough, cold or infections? In this guide, Dr. Rohit Agarwal shares 7 important tips that can help parents build healthy daily habits for their children.</p>
      
      <h2>7 Tips to Prevent Cold & Cough</h2>
      <ul>
        <li><strong>Balanced Diet:</strong> Fruits and vegetables are important in a child's diet. Vitamin C-rich foods boost immunity.</li>
        <li><strong>Protein & Iron-Rich Foods:</strong> Foods such as eggs, paneer, dal, and ragi contribute to a child's growth and nutrition.</li>
        <li><strong>Outdoor Play & Sunlight:</strong> Physical activity, outdoor play, and appropriate sunlight exposure are vital for children's health.</li>
        <li><strong>Proper Sleep Routine:</strong> A regular and consistent sleep schedule is important for well-being.</li>
        <li><strong>Hydration:</strong> Children need adequate fluids. Water and healthy food choices should be preferred over packaged drinks.</li>
        <li><strong>Medical Advice:</strong> Parents should avoid giving medicines or antibiotics to children without consulting a pediatrician.</li>
        <li><strong>Gut Health:</strong> The importance of fiber, probiotic foods such as curd, and maintaining a healthy bowel routine cannot be overstated.</li>
      </ul>

      <h2>Consistency is Key</h2>
      <p>Nutrition, sleep, physical activity, hydration, hygiene, and gut health should all be considered together when supporting a child's overall health. Remember, immunity-supporting healthy habits are built over time, not overnight. Consistency is key. If your child frequently gets sick, consult a pediatrician for appropriate medical advice.</p>
    `,
  }
];

/* ─── PREVIEW VIDEOS ────────────────────────────────── */
const PREVIEW_VIDEOS = [
  {
    id: 1,
    category: "Paediatrics",
    catColor: "text-green-600",
    catBg: "bg-green-50",
    catBorder: "border-green-100",
    title: "Newborn Sleep Tips: Establishing Healthy Habits",
    excerpt: "Dr. Rohit Agarwal, premier pediatrician in Kidwai Nagar, South Kanpur, shares evidence-based newborn child care tips. Learn about wake windows and preventing day-night confusion near Barra and Naubasta.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Director & Child Specialist",
    youtubeId: "https://www.youtube.com/watch?v=yRtVL-XbWZc",
    tag: "Parenting Guide",
  },
  {
    id: 2,
    category: "Gynecology",
    catColor: "text-pink-600",
    catBg: "bg-pink-50",
    catBorder: "border-pink-100",
    title: "Common Pregnancy Myths Busted",
    excerpt: "Dr. Tripti Mishra, leading gynae and pregnancy delivery specialist near Barra and Naubasta, debunks the most common myths expecting mothers hear from relatives in Kanpur.",
    author: "Dr. Tripti Mishra",
    authorRole: "Senior Gynecologist",
    youtubeId: "https://www.youtube.com/watch?v=QNa7juOSI28",
    tag: "Trending",
  },
  {
    id: 3,
    category: "Paediatrics",
    catColor: "text-green-600",
    catBg: "bg-green-50",
    catBorder: "border-green-100",
    title: "5 Superfoods to Boost Brain Power in Kids",
    excerpt: "Dr. Rohit Agarwal shares the top 5 brain-boosting foods that help improve brain development, concentration, and memory power in growing kids aged 1 to 10 years.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Director & Child Specialist",
    youtubeId: "https://www.youtube.com/watch?v=p2WDh4_Jt0w",
    tag: "Child Nutrition",
  },
  {
    id: 4,
    category: "Paediatrics",
    catColor: "text-green-600",
    catBg: "bg-green-50",
    catBorder: "border-green-100",
    title: "How to Calm a Crying Baby: Baby Crying Decoded",
    excerpt: "When a baby is crying continuously, parents start to fear for their little one. Dr. Rohit Agarwal decodes baby crying language to help you figure out what your baby is trying to say.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Director & Child Specialist",
    youtubeId: "https://www.youtube.com/watch?v=_dYu7rxhd3I",
    tag: "Newborn Care",
  },
  {
    id: 5,
    category: "Gynaecology",
    catColor: "text-pink-600",
    catBg: "bg-pink-50",
    catBorder: "border-pink-100",
    title: "Cervical Cancer Screening: HPV Prevention & Treatment",
    excerpt: "Dr. Tripti Mishra discusses cervical cancer, its connection to HPV, screening methods, symptoms, and why it is critical for women to have regular gynecologic checkups.",
    author: "Dr. Tripti Mishra",
    authorRole: "Senior Gynecologist",
    youtubeId: "https://www.youtube.com/watch?v=4kAvlNpgpJA",
    tag: "Women's Health",
  },
  {
    id: 6,
    category: "Gynaecology",
    catColor: "text-pink-600",
    catBg: "bg-pink-50",
    catBorder: "border-pink-100",
    title: "PCOS, Hormones, and Irregular Periods Explained",
    excerpt: "Irregular periods, PCOS, hormonal imbalances, and delayed pregnancy are increasingly common. Dr. Tripti Mishra explains real causes like insulin resistance, stress, diet, and lifestyle remedies.",
    author: "Dr. Tripti Mishra",
    authorRole: "Senior Gynecologist",
    youtubeId: "https://www.youtube.com/watch?v=x_A2JiAx8lc",
    tag: "Hormonal Health",
  },
  {
    id: 7,
    category: "Paediatrics",
    catColor: "text-green-600",
    catBg: "bg-green-50",
    catBorder: "border-green-100",
    title: "Baby Care Tips, Vaccines, and Feeding Mistakes Explained",
    excerpt: "Pediatrician Dr. Rohit Agarwal answers common newborn and child care questions about breastfeeding, formula, Cerelac, vaccinations, baby massage, and screen time.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Director & Child Specialist",
    youtubeId: "https://www.youtube.com/watch?v=RvkBOXafK8w",
    tag: "Parenting Guide",
  },
  {
    id: 8,
    category: "Paediatrics",
    catColor: "text-green-600",
    catBg: "bg-green-50",
    catBorder: "border-green-100",
    title: "Understanding Baby Milestones",
    excerpt: "Learn what to expect in the first year of your baby's development, including physical and cognitive milestones.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Director & Child Specialist",
    youtubeId: "https://www.youtube.com/watch?v=4vG6Fl1PhJ8",
    tag: "New Video",
  },
  {
    id: 9,
    category: "Paediatrics",
    catColor: "text-green-600",
    catBg: "bg-green-50",
    catBorder: "border-green-100",
    title: "How to Boost Child Immunity Naturally | 7 Tips",
    excerpt: "Dr. Rohit Agarwal shares 7 important tips that can help parents build healthy daily habits for their children to boost immunity.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Child Specialist & Director",
    youtubeId: "https://www.youtube.com/watch?v=WKKyCIh7d3I",
    tag: "Child Health",
  },
  {
    id: 10,
    category: "Gynaecology",
    catColor: "text-pink-600",
    catBg: "bg-pink-50",
    catBorder: "border-pink-100",
    title: "10 Reasons to See a Gynecologist | When Should You Visit?",
    excerpt: "Dr. Tripti Mishra explains 10 important situations when women and girls should consult a gynecologist, including irregular periods and pregnancy planning.",
    author: "Dr. Tripti Mishra",
    authorRole: "Obstetrician & Gynecologist",
    youtubeId: "https://www.youtube.com/watch?v=hkd20ywHTKs",
    tag: "Women's Health",
  },
];

// Helper to extract just the video ID from ANY YouTube link
export function extractYouTubeId(urlOrId: string) {
  if (!urlOrId) return "";
  const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : urlOrId;
}

/* ─── Mini article reader modal ────────────────────────────── */
function ArticleModal({ article, onClose }: { article: typeof PREVIEW_ARTICLES[0]; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl mt-4 mb-8 animate-[modalSlide_.3s_ease]">
        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-5 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${article.catBg} ${article.catColor} border ${article.catBorder}`}>
              {article.category}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-sm">
              {article.tag}
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mb-5">
            <span className="flex items-center gap-1.5 font-semibold text-gray-700">
              <User size={12} /> {article.author}
              <span className="text-gray-300 font-normal">·</span>
              <span className="italic text-gray-400 font-normal">{article.authorRole}</span>
            </span>
            <span>{article.date}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {article.readTime}</span>
          </div>
          <h1 className="font-extrabold text-gray-900 leading-snug mb-6 text-2xl sm:text-3xl font-sans">
            {article.title}
          </h1>
          <div
            className="text-slate-700 text-base md:text-md leading-relaxed space-y-4 font-sans [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:text-lg [&_h2]:font-sans [&_h2]:mt-6 [&_h2]:mb-3 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_strong]:text-primary [&_strong]:font-bold [&_p]:mb-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          {/* Bottom CTA */}
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

/* ─── Video Modal ────────────────────────────────────────────── */
export function VideoModal({ youtubeId, onClose }: { youtubeId: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-black rounded-2xl shadow-2xl aspect-video animate-[modalSlide_.3s_ease]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/20">
          <X size={20} />
        </button>
        <iframe
          className="w-full h-full rounded-2xl bg-black"
          src={`https://www.youtube.com/embed/${extractYouTubeId(youtubeId)}?autoplay=1&rel=0`}
          title="Doctor Explainer Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}


/* ─── HOME PAGE SECTION ─────────────────────────────────────── */
export default function HealthLibrary() {
  const [selectedArticle, setSelectedArticle] = useState<typeof PREVIEW_ARTICLES[0] | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Render a single video card
  const renderVideoCard = (video: typeof PREVIEW_VIDEOS[0]) => (
    <div
      key={video.id}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      <div
        className="relative h-48 cursor-pointer overflow-hidden shrink-0 bg-gray-100"
        onClick={() => setActiveVideoId(video.youtubeId)}
      >
        <img
          src={`https://img.youtube.com/vi/${extractYouTubeId(video.youtubeId)}/maxresdefault.jpg`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${extractYouTubeId(video.youtubeId)}/hqdefault.jpg`;
          }}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center shadow-md shadow-red-950/30 group-hover:bg-red-500 transition-all duration-300 group-hover:scale-110 relative">
            <span className="absolute inset-0 rounded-full bg-red-600/20 animate-ping group-hover:animate-none" />
            <Play size={14} fill="white" className="text-white relative z-10 translate-x-0.5" />
          </div>
        </div>

        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${video.catBg} ${video.catColor} ${video.catBorder}`}>
            {video.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow gap-3">
        <h3 className="font-bold text-gray-900 leading-snug text-[15px]" style={{ fontFamily: "var(--font-display, serif)" }}>
          {video.title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed flex-grow line-clamp-2">
          {video.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold shrink-0">
              {video.author.charAt(4)}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-[11px]">{video.author}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveVideoId(video.youtubeId)}
            className="text-primary text-[11px] font-bold hover:underline flex items-center gap-1"
          >
            Watch <PlayCircle size={10} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes modalSlide {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      {activeVideoId && <VideoModal youtubeId={activeVideoId} onClose={() => setActiveVideoId(null)} />}

      <section id="health-library" className="py-8 md:py-14 bg-white border-y border-gray-50">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header row — title left, link right */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 md:mb-10">
            <div>
              <p className="text-secondary font-bold tracking-wider text-xs uppercase mb-2 flex items-center gap-2">
                <BookOpen size={13} /> Health Library
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Expert Insights &amp; <span className="text-primary">Videos</span>
              </h2>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-[1px] bg-gray-300" />
                <Heart className="w-3 h-3 text-primary fill-primary" />
                <div className="w-8 h-[1px] bg-gray-300" />
              </div>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all shrink-0 group"
            >
              View complete library
              <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight size={13} />
              </span>
            </Link>
          </div>

          {/* Hybrid 4-Card Grid: Alternating Video and Article */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* 1. Left Video */}
            {renderVideoCard(PREVIEW_VIDEOS[8])}

            {/* 2. Middle Left Article */}
            <div
              onClick={() => setSelectedArticle(PREVIEW_ARTICLES[4])}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={PREVIEW_ARTICLES[4].image} alt={PREVIEW_ARTICLES[4].title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${PREVIEW_ARTICLES[4].catBg} ${PREVIEW_ARTICLES[4].catColor} ${PREVIEW_ARTICLES[4].catBorder}`}>
                    {PREVIEW_ARTICLES[4].category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow gap-3">
                <h3 className="font-bold text-gray-900 leading-snug text-[15px]" style={{ fontFamily: "var(--font-display, serif)" }}>
                  {PREVIEW_ARTICLES[4].title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-grow line-clamp-2">
                  {PREVIEW_ARTICLES[4].excerpt}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-1">
                  <div className="text-[11px] text-gray-400">
                    <p className="font-bold text-gray-800 flex items-center gap-1 mb-0.5">
                      <User size={10} /> {PREVIEW_ARTICLES[4].author}
                    </p>
                    <p className="flex items-center gap-1">
                      <Clock size={9} /> {PREVIEW_ARTICLES[4].readTime}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-primary text-[11px] font-bold group-hover:gap-2 transition-all">
                    Read Article <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Middle Right Video */}
            {renderVideoCard(PREVIEW_VIDEOS[9])}

            {/* 4. Right Article */}
            <div
              onClick={() => setSelectedArticle(PREVIEW_ARTICLES[3])}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={PREVIEW_ARTICLES[3].image} alt={PREVIEW_ARTICLES[3].title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${PREVIEW_ARTICLES[3].catBg} ${PREVIEW_ARTICLES[3].catColor} ${PREVIEW_ARTICLES[3].catBorder}`}>
                    {PREVIEW_ARTICLES[3].category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow gap-3">
                <h3 className="font-bold text-gray-900 leading-snug text-[15px]" style={{ fontFamily: "var(--font-display, serif)" }}>
                  {PREVIEW_ARTICLES[3].title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-grow line-clamp-2">
                  {PREVIEW_ARTICLES[3].excerpt}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-1">
                  <div className="text-[11px] text-gray-400">
                    <p className="font-bold text-gray-800 flex items-center gap-1 mb-0.5">
                      <User size={10} /> {PREVIEW_ARTICLES[3].author}
                    </p>
                    <p className="flex items-center gap-1">
                      <Clock size={9} /> {PREVIEW_ARTICLES[3].readTime}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-primary text-[11px] font-bold group-hover:gap-2 transition-all">
                    Read Article <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom CTA button */}
          <div className="text-center mt-10 hidden sm:block">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
            >
              <BookOpen size={15} /> Explore All Articles & Videos
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
