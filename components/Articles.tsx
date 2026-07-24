"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  X, Clock, User, ArrowRight, BookOpen, Heart, Brain,
  Baby, ChevronRight, PlayCircle
} from "lucide-react";

/* ─── PREVIEW ARTICLE ─────────────────────────────── */
const PREVIEW_ARTICLE = {
  id: 1,
  category: "Cardiology",
  catColor: "text-red-600",
  catBg: "bg-red-50",
  catBorder: "border-red-100",
  Icon: Heart,
  title: "Understanding Heart Disease: Early Warning Signs You Shouldn't Ignore",
  excerpt: "Cardiovascular disease is the world's leading cause of death. Knowing the subtle warning signs can save your life.",
  author: "Dr. Rajesh Sharma",
  authorRole: "Senior Cardiologist",
  date: "June 15, 2026",
  readTime: "6 min read",
  tag: "Must Read",
  image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=900&q=80",
  content: `
    <h2>What is Heart Disease?</h2>
    <p>Heart disease describes a range of conditions that affect your heart — from coronary artery disease and arrhythmias to congenital defects.</p>
    <h2>Early Warning Signs</h2>
    <ul>
      <li><strong>Chest discomfort:</strong> Persistent pressure, squeezing, or pain in the centre of the chest.</li>
      <li><strong>Shortness of breath:</strong> Occurring with or without chest discomfort.</li>
      <li><strong>Pain radiating to arms, back, neck, or jaw.</strong></li>
      <li><strong>Cold sweats, nausea, or lightheadedness.</strong></li>
      <li><strong>Unusual fatigue,</strong> especially in women.</li>
    </ul>
    <h2>Prevention</h2>
    <p>Heart disease can often be prevented with lifestyle choices: a heart-healthy diet, regular physical activity, maintaining a healthy weight, quality sleep, and regular health screenings.</p>
  `,
};

/* ─── PREVIEW VIDEOS ────────────────────────────────── */
const PREVIEW_VIDEOS = [
  {
    id: 1,
    category: "Paediatrics",
    catColor: "text-green-600",
    catBg: "bg-green-50",
    catBorder: "border-green-100",
    title: "Newborn Sleep Tips: Establishing Healthy Habits",
    excerpt: "Dr. Rohit Agarwal shares evidence-based newborn sleep tips drawn from years of medical experience. Learn about wake windows, the 5 S techniques, and preventing day-night confusion.",
    author: "Dr. Rohit Agarwal",
    authorRole: "Director & Child Specialist",
    youtubeId: "https://youtu.be/yRtVL-XbWZc", // PASTE YOUR YOUTUBE URL OR ID HERE!
    tag: "Parenting Guide",
  },
  {
    id: 2,
    category: "Gynecology",
    catColor: "text-pink-600",
    catBg: "bg-pink-50",
    catBorder: "border-pink-100",
    title: "Common Pregnancy Myths Busted",
    excerpt: "Dr. Tripti Mishra debunks the most common myths expecting mothers hear from relatives.",
    author: "Dr. Tripti Mishra",
    authorRole: "Senior Gynecologist",
    youtubeId: "https://youtu.be/QNa7juOSI28", // PASTE YOUR YOUTUBE URL OR ID HERE!
    tag: "Trending",
  },
];

// Helper to extract just the video ID from ANY YouTube link
export function extractYouTubeId(urlOrId: string) {
  if (!urlOrId) return "";
  const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : urlOrId;
}

/* ─── Mini article reader modal ────────────────────────────── */
function ArticleModal({ article, onClose }: { article: typeof PREVIEW_ARTICLE; onClose: () => void }) {
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
          <h1 className="font-bold text-gray-900 leading-snug mb-6 text-xl sm:text-2xl" style={{ fontFamily: "var(--font-display, serif)" }}>
            {article.title}
          </h1>
          <div
            className="text-gray-600 text-sm leading-relaxed space-y-3 [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:text-base [&_h2]:mt-6 [&_h2]:mb-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_strong]:text-primary [&_strong]:font-semibold [&_p]:mb-2"
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
  const [selectedArticle, setSelectedArticle] = useState<typeof PREVIEW_ARTICLE | null>(null);
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
          <div className="w-14 h-14 rounded-full bg-red-600 border-[3px] border-white flex items-center justify-center group-hover:bg-red-500 transition-all shadow-lg group-hover:scale-110">
            <PlayCircle className="w-6 h-6 text-white ml-0.5" />
          </div>
        </div>

        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${video.catBg} ${video.catColor} ${video.catBorder}`}>
            {video.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-gray-600 shadow-sm flex items-center gap-1">
            <PlayCircle size={10} /> Video
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

          {/* Hybrid 3-Card Grid: Left=Video, Middle=Article, Right=Video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 1. Left Video */}
            {renderVideoCard(PREVIEW_VIDEOS[0])}

            {/* 2. Middle Article */}
            <div
              onClick={() => setSelectedArticle(PREVIEW_ARTICLE)}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={PREVIEW_ARTICLE.image} alt={PREVIEW_ARTICLE.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${PREVIEW_ARTICLE.catBg} ${PREVIEW_ARTICLE.catColor} ${PREVIEW_ARTICLE.catBorder}`}>
                    {PREVIEW_ARTICLE.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-gray-600 shadow-sm">
                    {PREVIEW_ARTICLE.tag}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow gap-3">
                <h3 className="font-bold text-gray-900 leading-snug text-[15px]" style={{ fontFamily: "var(--font-display, serif)" }}>
                  {PREVIEW_ARTICLE.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-grow line-clamp-2">
                  {PREVIEW_ARTICLE.excerpt}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-1">
                  <div className="text-[11px] text-gray-400">
                    <p className="font-bold text-gray-800 flex items-center gap-1 mb-0.5">
                      <User size={10} /> {PREVIEW_ARTICLE.author}
                    </p>
                    <p className="flex items-center gap-1">
                      <Clock size={9} /> {PREVIEW_ARTICLE.readTime}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-primary text-[11px] font-bold group-hover:gap-2 transition-all">
                    Read Article <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Right Video */}
            {renderVideoCard(PREVIEW_VIDEOS[1])}

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
