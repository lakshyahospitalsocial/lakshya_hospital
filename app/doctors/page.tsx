"use client";
import React, { useState, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  CalendarHeart, Clock, Award, Phone, Search, X, Check, Globe,
  MapPin, Grid, List, AlertCircle, Heart, User, ShieldCheck, Star,
  SlidersHorizontal, ChevronRight, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Enriched doctors data array
interface Doctor {
  name: string;
  initials: string;
  role: string;
  department: string;
  qual: string;
  exp: string;
  badge: string | null;
  gender: 'male' | 'female';
  rating: number;
  reviewsCount: number;
  languages: string[];
  education: string;
  clinicalFocus: string[];
  empanelments: string[];
  avail: string[];
  color: string;
  light: string;
  availToday: boolean;
  img?: string | null;
}

const doctorsList: Doctor[] = [
  {
    name: "Dr. Rohit Agrawal",
    initials: "RA",
    role: "Director & Senior Pediatrician",
    department: "Pediatrics",
    qual: "MBBS, MD Pediatrics",
    exp: "16+ Years",
    badge: "Director",
    gender: "male",
    rating: 4.9,
    reviewsCount: 184,
    languages: ["Hindi", "English"],
    education: "MD Pediatrics, GSVM Medical College, Kanpur",
    clinicalFocus: ["Neonatal ICU (NICU) Care", "Pediatric Emergencies", "Asthma & Allergy", "Child Growth & Vaccination"],
    empanelments: ["Ayushman Bharat", "DDUS", "Star Health", "HDFC Ergo"],
    avail: [
      "Mon–Sun: 11:00 AM – 4:00 PM",
      "Mon–Sat: 8:00 PM – 9:00 PM"
    ],
    color: "from-blue-500 to-blue-700",
    light: "bg-blue-50 text-blue-700 border-blue-100",
    availToday: true,
    img: "/rohit_agrawal_director.png"
  },
  {
    name: "Dr. Tripti Mishra",
    initials: "TM",
    role: "Director & Senior OB/GYN",
    department: "Obstetrics & Gynecology",
    qual: "MBBS, MS OB/GYN",
    exp: "16+ Years",
    badge: "Director",
    gender: "female",
    rating: 4.9,
    reviewsCount: 162,
    languages: ["Hindi", "English"],
    education: "MS OB/GYN, BRD Medical College, Gorakhpur",
    clinicalFocus: ["High-Risk Pregnancy Care", "Laparoscopic Gynecology", "Infertility Management", "PCOD & Menopause Care"],
    empanelments: ["Ayushman Bharat", "DDUS", "Niva Bupa", "Care Health"],
    avail: [
      "Mon–Fri: 11:00 AM – 1:00 PM",
      "Mon–Fri: 6:00 PM – 7:00 PM"
    ],
    color: "from-pink-500 to-rose-600",
    light: "bg-pink-50 text-pink-700 border-pink-100",
    availToday: true,
    img: "/tripti_mishra.png"
  },
  {
    name: "Dr. Ashish Dwivedi",
    initials: "AD",
    role: "General Physician",
    department: "General Medicine",
    qual: "MBBS, MD Medicine",
    exp: "10+ Years",
    badge: null,
    gender: "male",
    rating: 4.8,
    reviewsCount: 92,
    languages: ["Hindi", "English"],
    education: "MD Medicine, MLN Medical College, Allahabad",
    clinicalFocus: ["Diabetes Management", "Hypertension & Heart Care", "Infectious Diseases", "Geriatric Medicine"],
    empanelments: ["Ayushman Bharat", "DDUS"],
    avail: ["Mon–Sat: 6:00 PM – 7:00 PM"],
    color: "from-teal-500 to-emerald-600",
    light: "bg-teal-50 text-teal-700 border-teal-100",
    availToday: true,
    img: "/dr_ashish_lakshya.png"
  },
  {
    name: "Dr. NS Chauhan",
    initials: "NC",
    role: "Senior General Surgeon",
    department: "General Surgery",
    qual: "MBBS, MS Surgeon",
    exp: "35+ Years",
    badge: "Senior",
    gender: "male",
    rating: 4.9,
    reviewsCount: 245,
    languages: ["Hindi", "English"],
    education: "MS General Surgery, King George's Medical University (KGMU), Lucknow",
    clinicalFocus: ["Abdominal & Hernia Surgery", "Trauma & Emergency Care", "Gallbladder Stones Surgery", "Thyroid & Breast Tumors"],
    empanelments: ["Ayushman Bharat", "DDUS"],
    avail: ["Mon & Sun: 12:00 PM – 1:00 PM"],
    color: "from-indigo-500 to-indigo-700",
    light: "bg-indigo-50 text-indigo-700 border-indigo-100",
    availToday: false,
    img: "/dr-ns_chauhan_laskshya.png"
  },
  {
    name: "Dr. Kuldeep",
    initials: "KD",
    role: "General Surgeon",
    department: "General Surgery",
    qual: "MBBS, MS Surgeon",
    exp: "10+ Years",
    badge: null,
    gender: "male",
    rating: 4.7,
    reviewsCount: 76,
    languages: ["Hindi", "English"],
    education: "MS General Surgery, LLRM Medical College, Meerut",
    clinicalFocus: ["Laparoscopic Appendectomy", "Hernia Repair Procedures", "Piles, Fissure & Fistula Care", "Minor Surgical Excisions"],
    empanelments: ["Ayushman Bharat", "DDUS"],
    avail: ["Mon–Sat: 1:00 PM – 2:00 PM"],
    color: "from-violet-500 to-violet-700",
    light: "bg-violet-50 text-violet-700 border-violet-100",
    availToday: true,
    img: "/dr_kuldeep_lakshya.png"
  },
  {
    name: "Dr. Vishal Sethiya",
    initials: "VS",
    role: "Orthopedic Surgeon",
    department: "Orthopedics",
    qual: "MBBS, D-Ortho",
    exp: "16+ Years",
    badge: null,
    gender: "male",
    rating: 4.8,
    reviewsCount: 143,
    languages: ["Hindi", "English"],
    education: "D-Ortho, Sancheti Institute of Orthopaedics, Pune",
    clinicalFocus: ["Joint Replacement Surgery", "Fracture & Complex Trauma Care", "Arthroscopy & Sports Injuries", "Chronic Back Pain & Sciatica"],
    empanelments: ["Ayushman Bharat", "DDUS", "Star Health"],
    avail: ["Mon–Sat: 1:00 PM – 2:00 PM"],
    color: "from-orange-500 to-amber-600",
    light: "bg-orange-50 text-orange-700 border-orange-100",
    availToday: true,
    img: "/dr_vishal_sethiya_lakshya.png"
  },
  {
    name: "Dr. Tripti Sengar",
    initials: "TS",
    role: "ENT Specialist",
    department: "ENT Care",
    qual: "MBBS, DLO",
    exp: "16+ Years",
    badge: null,
    gender: "female",
    rating: 4.8,
    reviewsCount: 115,
    languages: ["Hindi", "English"],
    education: "DLO (ENT), GSVM Medical College, Kanpur",
    clinicalFocus: ["Micro Ear Surgery", "Functional Endoscopic Sinus Surgery (FESS)", "Tonsillectomy & Adenoidectomy", "Hearing Loss & Vertigo Treatment"],
    empanelments: ["Ayushman Bharat", "DDUS"],
    avail: ["Mon–Sat: 12:00 PM – 1:00 PM"],
    color: "from-cyan-500 to-sky-600",
    light: "bg-cyan-50 text-cyan-700 border-cyan-100",
    availToday: true,
    img: "/dr_tripti_sengar_lakshya.png"
  },
  {
    name: "Dr. SG Verma",
    initials: "SV",
    role: "Neuro & Spine Surgeon",
    department: "Neuro + Spine Surgery",
    qual: "MBBS, MS, MCH NeuroSurgery",
    exp: "12+ Years",
    badge: null,
    gender: "male",
    rating: 4.9,
    reviewsCount: 128,
    languages: ["Hindi", "English"],
    education: "MCh Neurosurgery, PGIMER, Chandigarh",
    clinicalFocus: ["Brain Tumors & Hematomas", "Spinal Fusion & Disc Surgery", "Microdiscectomy", "Head Injury & Neuro-Trauma"],
    empanelments: ["Ayushman Bharat", "DDUS", "ICICI Lombard"],
    avail: ["By Appointment / On Call"],
    color: "from-purple-500 to-purple-700",
    light: "bg-purple-50 text-purple-700 border-purple-100",
    availToday: false,
    img: "/dr_sg_lakshya.png"
  },
  {
    name: "Dr. Manish Kumar",
    initials: "MK",
    role: "Uro Surgeon",
    department: "Urosurgery",
    qual: "MBBS, MS, MCH Uro Surgery",
    exp: "14+ Years",
    badge: null,
    gender: "male",
    rating: 4.9,
    reviewsCount: 96,
    languages: ["Hindi", "English"],
    education: "MCh Urology, SGPGIMS, Lucknow",
    clinicalFocus: ["Kidney Stones (Laser Treatment)", "Prostate Resection (TURP)", "Urological Cancers", "Reconstructive Urology"],
    empanelments: ["Ayushman Bharat", "Star Health"],
    avail: ["By Appointment / On Call"],
    color: "from-sky-500 to-blue-600",
    light: "bg-sky-50 text-sky-700 border-sky-100",
    availToday: false,
    img: "/dr_manish_lakshya.png"
  },
  {
    name: "Dr. Shushant Luthra",
    initials: "SL",
    role: "Plastic Surgeon",
    department: "Plastic Surgery",
    qual: "MBBS, MS, MCH Plastic Surgery",
    exp: "18+ Years",
    badge: null,
    gender: "male",
    rating: 5.0,
    reviewsCount: 154,
    languages: ["Hindi", "English"],
    education: "MCh Plastic Surgery, Safdarjung Hospital, New Delhi",
    clinicalFocus: ["Reconstructive Microsurgery", "Post-Burn Reconstruction", "Cleft Lip & Palate Surgery", "Cosmetic & Maxillofacial Trauma"],
    empanelments: ["Private Insurances"],
    avail: ["By Appointment / On Call"],
    color: "from-rose-500 to-pink-600",
    light: "bg-rose-50 text-rose-700 border-rose-100",
    availToday: false,
    img: "/dr_sushant_lakshya.png"
  },
  {
    name: "Dr. Rakesh Tripathi",
    initials: "RT",
    role: "Pediatric Surgeon",
    department: "Pediatric Surgery",
    qual: "MBBS, MS, MCH Pediatric Surgery",
    exp: "18+ Years",
    badge: null,
    gender: "male",
    rating: 4.9,
    reviewsCount: 138,
    languages: ["Hindi", "English"],
    education: "MCh Pediatric Surgery, Banaras Hindu University (BHU), Varanasi",
    clinicalFocus: ["Congenital Anomaly Repair", "Pediatric Laparoscopy & Urology", "Childhood Hernias & Hydroceles", "Neonatal Surgery"],
    empanelments: ["Ayushman Bharat", "DDUS"],
    avail: ["By Appointment / On Call"],
    color: "from-green-500 to-emerald-600",
    light: "bg-green-50 text-green-700 border-green-100",
    availToday: false,
    img: "/dr_rakesh_lakshya.png"

  }
];

const departments = [
  "All",
  "Pediatrics",
  "Obstetrics & Gynecology",
  "General Medicine",
  "General Surgery",
  "Orthopedics",
  "ENT Care",
  "Neuro + Spine Surgery",
  "Urosurgery",
  "Plastic Surgery",
  "Pediatric Surgery"
];

// Interactive and error-resilient Doctor Hero Image component
function DoctorHeroImage() {
  const [imgSrc, setImgSrc] = useState("/founder_lakshya.png");
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc === "/founder_lakshya.png") {
      setImgSrc("/doctors.hero.png");
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center h-full w-full bg-gradient-to-br from-slate-900 to-slate-950 text-slate-400">
        <User className="w-16 h-16 text-slate-600 mb-3 animate-pulse" />
        <p className="text-sm font-bold text-slate-300 font-display">Lakshya Specialist Doctors</p>
        <p className="text-[11px] text-slate-500 mt-1 max-w-[200px] leading-normal">
          Add your <code>doctors.hero.png</code> image to the public folder to display it here.
        </p>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt="Lakshya Hospital Doctors Team"
      className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
      onError={handleError}
    />
  );
}

export default function FindDoctorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [viewLayout, setViewLayout] = useState<"grid" | "list">("grid");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Clear all active filters
  const resetFilters = () => {
    setSearchQuery("");
    setAvailableOnly(false);
  };

  // Perform search and filtering in real-time
  const filteredDoctors = useMemo(() => {
    return doctorsList.filter(doctor => {
      // 1. Search Query filter (matches Name, Department, Clinical Focus, Qualifications, Education)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = doctor.name.toLowerCase().includes(query);
        const matchesDept = doctor.department.toLowerCase().includes(query);
        const matchesQual = doctor.qual.toLowerCase().includes(query);
        const matchesEdu = doctor.education.toLowerCase().includes(query);
        const matchesFocus = doctor.clinicalFocus.some(focus => focus.toLowerCase().includes(query));

        if (!matchesName && !matchesDept && !matchesQual && !matchesEdu && !matchesFocus) {
          return false;
        }
      }

      // 2. Availability Filter
      if (availableOnly && !doctor.availToday) {
        return false;
      }

      return true;
    });
  }, [searchQuery, availableOnly]);

  return (
    <main className="flex min-h-screen flex-col bg-slate-50/50">
      <Header />

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-br from-dark-blue to-slate-900 pt-28 pb-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Text & Information */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="inline-flex items-center gap-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full px-4.5 py-1.5 mb-5 text-sm font-bold text-blue-200">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                11 Super-Specialists at 1 Central Location
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight font-display">
                Find a <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Specialist Doctor</span>
              </h1>
              <p className="text-slate-300 max-w-2xl text-lg mb-8 leading-relaxed">
                Connect with Kidwai Nagar’s most trusted medical team. Search and filter through our core clinicians, all available under one roof at our state-of-the-art Kanpur hospital.
              </p>

              {/* Campus Info Badge */}
              <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-2xl p-4.5 text-sm backdrop-blur-sm max-w-md">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-white">Central Campus</p>
                  <p className="text-slate-400 text-xs">128/1006, Y Block, Kidwai Nagar, Kanpur</p>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Circular Frame / Image Space */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] flex items-center justify-center">
                {/* Glowing Aura Effect */}
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />

                {/* Outer concentric rings */}
                <div className="absolute inset-2 rounded-full border border-dashed border-white/10 animate-[spin_120s_linear_infinite]" />
                <div className="absolute inset-6 rounded-full border border-white/5" />
                <div className="absolute inset-10 rounded-full border border-primary/20" />

                {/* Main Circular Frame with a nice dark glass container */}
                <div className="absolute inset-14 rounded-full overflow-hidden border-4 border-slate-800/80 bg-slate-900/80 shadow-2xl flex items-center justify-center">
                  <DoctorHeroImage />
                </div>

                {/* Floating badge 1: Available 24/7 / Emergency */}
                <div className="absolute -bottom-2 -left-2 sm:bottom-2 sm:left-2 bg-slate-950/85 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <CalendarHeart className="w-4.5 h-4.5 text-secondary animate-pulse" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available 24/7</p>
                    <p className="text-[11px] font-bold text-white">Emergency OPD</p>
                  </div>
                </div>

                {/* Floating badge 2: Super Specialists */}
                <div className="absolute -top-2 -right-2 sm:top-4 sm:right-0 bg-slate-950/85 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Award className="w-4.5 h-4.5 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expert Team</p>
                    <p className="text-[11px] font-bold text-white">Super Specialists</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Controls & Results */}
      <section className="py-12 -mt-10 relative z-20 max-w-[90rem] mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Search Bar Block */}
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-xl border border-slate-100 mb-8">
          <div className="relative flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, specialty, condition, qualifications, or college..."
                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white rounded-2xl py-4.5 pl-12 pr-10 text-base text-slate-800 placeholder-slate-400 font-medium transition-all focus:outline-none focus:ring-4 focus:ring-primary/10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Real-time stats or primary actions */}
            <div className="w-full md:w-auto shrink-0 flex items-stretch gap-2.5">
              <button
                onClick={() => setAvailableOnly(!availableOnly)}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-4.5 rounded-2xl text-sm font-bold border transition-all cursor-pointer whitespace-nowrap ${availableOnly
                  ? "bg-secondary/15 border-secondary text-secondary-hover shadow-sm"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
              >
                <Clock className="w-4 h-4" />
                Available Today
              </button>

              {(searchQuery || availableOnly) && (
                <button
                  onClick={resetFilters}
                  className="px-5 py-4.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-sm font-bold transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-slate-400 flex items-center gap-1"><SlidersHorizontal className="w-3 h-3" /> Quick Search:</span>
            {[
              { label: "Child Specialist", term: "Pediatrics" },
              { label: "Pregnancy Care", term: "Obstetrics" },
              { label: "Spine Surgeon", term: "Spine" },
              { label: "Urology", term: "Uro" },
              { label: "Laparoscopy", term: "Laparoscopic" }
            ].map((s, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(s.term)}
                className="bg-slate-100 hover:bg-primary/10 hover:text-primary rounded-lg px-2.5 py-1 transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Refined Filters Row */}
        <div className="flex items-center justify-end border-b border-slate-200/80 pb-5 mb-8">
          <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
            <button
              onClick={() => setViewLayout("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewLayout === "grid" ? "bg-slate-100 text-primary" : "text-slate-400 hover:text-slate-600"
                }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewLayout("list")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewLayout === "list" ? "bg-slate-100 text-primary" : "text-slate-400 hover:text-slate-600"
                }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Doctor Grid / List Container */}
        {filteredDoctors.length > 0 ? (
          viewLayout === "grid" ? (
            /* GRID VIEW */
            <motion.div
              key="grid-layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6.5"
            >
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                  key={doctor.name}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Top card block with visual representation */}
                  <div className={`bg-gradient-to-br ${doctor.color} p-6 pb-8 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-lg" />

                    {/* Stars / Rating top badge */}
                    <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1.5">
                      <Star className="w-3 h-3 text-amber-300 fill-amber-300 shrink-0" />
                      {doctor.rating.toFixed(1)}
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Avatar container */}
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 border border-white/30 text-white font-bold text-xl relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        {doctor.img ? (
                          <img
                            src={doctor.img}
                            alt={doctor.name}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                              // If image fails, clear it to fallback to initials
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <span>{doctor.initials}</span>
                        )}
                      </div>

                      {/* Header info */}
                      <div className="text-white pr-10">
                        <h3 className="text-lg font-bold leading-snug group-hover:text-blue-50 transition-colors">{doctor.name}</h3>
                        <p className="text-white/80 text-xs font-medium mt-1 line-clamp-1">{doctor.role}</p>
                        {doctor.badge && (
                          <span className="inline-block mt-2.5 bg-white/25 border border-white/35 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider leading-none">
                            {doctor.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Body elements */}
                  <div className="p-5.5 flex flex-col justify-between flex-grow">
                    <div className="space-y-4">
                      {/* Department / Experience Row */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-xl border ${doctor.light}`}>
                          {doctor.department}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-xl border bg-amber-50 text-amber-700 border-amber-100">
                          <Award className="w-3 h-3 text-amber-500 shrink-0" />
                          {doctor.exp} Exp
                        </span>
                      </div>

                      {/* Education / Qualifications */}
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Education</p>
                        <p className="text-xs font-semibold text-slate-700 line-clamp-1">{doctor.education}</p>
                      </div>

                      {/* Accepted Schemes Info (Ayushman / DDUS) */}
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Empanelled Schemes</p>
                        <div className="flex flex-wrap gap-1">
                          {doctor.empanelments.includes("Ayushman Bharat") && (
                            <span className="text-[10px] font-bold px-2 py-1 rounded bg-green-50 border border-green-200 text-green-700">
                              Ayushman Bharat
                            </span>
                          )}
                          {doctor.empanelments.includes("DDUS") && (
                            <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700">
                              DDUS (State Govt)
                            </span>
                          )}
                          {!doctor.empanelments.includes("Ayushman Bharat") && !doctor.empanelments.includes("DDUS") && (
                            <span className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-100 text-slate-500">
                              Cashless & Private Ins.
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Availability status */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 rounded-xl px-3 py-2.5">
                          <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <p className="font-bold text-slate-700">
                              {doctor.availToday ? "Available Today" : "Next Available Slot"}
                            </p>
                            <p className="text-slate-500 font-medium mt-0.5 line-clamp-1">
                              {doctor.avail[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex gap-2 pt-5 mt-auto">
                      <button
                        onClick={() => setSelectedDoctor(doctor)}
                        className="flex-1 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-200/50 shrink-0"
                      >
                        View Profile
                      </button>
                      <Link
                        href="/book-appointment"
                        className="flex-[1.5] flex items-center justify-center gap-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl text-xs font-bold transition-all shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                      >
                        <CalendarHeart className="w-3.5 h-3.5 shrink-0" />
                        Book Online
                      </Link>
                      <a
                        href={`https://wa.me/919335605848?text=Hello%20Lakshya%20Hospital,%20I%20would%20like%20to%20book%20an%20appointment%20with%20${encodeURIComponent(doctor.name)}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer shrink-0"
                        title={`Book with ${doctor.name} via WhatsApp`}
                      >
                        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* LIST VIEW */
            <motion.div
              key="list-layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                  key={doctor.name}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    {/* Visual representation / Avatar */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${doctor.color} rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 text-white font-bold text-2xl relative overflow-hidden shadow-sm`}>
                      {doctor.img ? (
                        <img
                          src={doctor.img}
                          alt={doctor.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span>{doctor.initials}</span>
                      )}

                      {/* Sub-badge for Rating */}
                      <div className="absolute bottom-1 right-1 bg-white/95 rounded-md px-1 py-0.5 text-[9px] text-slate-800 font-extrabold flex items-center gap-0.5 shadow-sm">
                        <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500 shrink-0" />
                        {doctor.rating}
                      </div>
                    </div>

                    {/* Main details block */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900 leading-snug">{doctor.name}</h3>
                        {doctor.badge && (
                          <span className="bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {doctor.badge}
                          </span>
                        )}
                        <span className="text-slate-400 text-xs font-semibold">({doctor.reviewsCount} Patient Reviews)</span>
                      </div>

                      <p className="text-sm font-semibold text-slate-700">{doctor.role} • <span className="text-slate-400 font-medium">{doctor.qual}</span></p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg border ${doctor.light}`}>
                          {doctor.department}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg border bg-amber-50 text-amber-700 border-amber-100">
                          <Award className="w-3 h-3 text-amber-500" />
                          {doctor.exp} Exp
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg border bg-slate-50 text-slate-600 border-slate-200">
                          <Globe className="w-3 h-3 text-slate-400" />
                          {doctor.languages.join(", ")}
                        </span>
                      </div>

                      {/* Clinical Focus Badges preview */}
                      <div className="flex flex-wrap items-center gap-1 pt-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Focus areas:</span>
                        {doctor.clinicalFocus.slice(0, 3).map((f, i) => (
                          <span key={i} className="text-[10px] text-slate-600 bg-slate-100 rounded-md px-2 py-0.5 font-medium">
                            {f}
                          </span>
                        ))}
                        {doctor.clinicalFocus.length > 3 && (
                          <span className="text-[10px] text-slate-400 font-bold">+ {doctor.clinicalFocus.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Booking / Details container */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 shrink-0">
                    <div className="text-left md:text-right">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mb-1">
                        <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                        <span>{doctor.availToday ? "Available Today" : "Weekly Availability"}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold max-w-[200px] md:max-w-none truncate">
                        {doctor.avail[0]}
                      </p>
                    </div>

                    <div className="flex gap-2 w-auto">
                      <button
                        onClick={() => setSelectedDoctor(doctor)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-200/50 shrink-0"
                      >
                        Profile Details
                      </button>
                      <Link
                        href="/book-appointment"
                        className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-primary/10 cursor-pointer"
                      >
                        <CalendarHeart className="w-3.5 h-3.5 shrink-0" />
                        Book Online
                      </Link>
                      <a
                        href={`https://wa.me/919335605848?text=Hello%20Lakshya%20Hospital,%20I%20would%2520like%2520to%2520book%2520an%2520appointment%2520with%2520${encodeURIComponent(doctor.name)}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer shrink-0"
                        title={`Book with ${doctor.name} via WhatsApp`}
                      >
                        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )
        ) : (
          /* NO RESULTS STATE */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-100 rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto shadow-sm"
          >
            <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-3">No Specialists Found</h3>
            <p className="text-slate-500 text-base mb-8 max-w-md mx-auto leading-relaxed">
              We couldn't find a doctor matching your exact search terms or active filters. Lakshya Hospital features 11 core clinical consultants.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                Clear Search & Filters
              </button>

              <a
                href="tel:+919335605848"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-md shadow-primary/15 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Call Helpline (24/7)
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 text-left">
              <div className="flex items-start gap-3 bg-slate-50 rounded-2xl p-4.5">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-slate-800">Need immediate clinical consultation?</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Our general physician is always present on campus 24/7. Walk into our casualty/emergency ward anytime for immediate primary care.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Trust & Accreditations Banner */}
      <section className="bg-slate-100/60 border-t border-b border-slate-200/50 py-12">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Government Schemes & Cashless Insurance Accepted</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-xs">
              <span className="text-sm font-extrabold text-green-700">AYUSHMAN BHARAT</span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider text-center mt-0.5">PM-JAY Empanelled</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-xs">
              <span className="text-sm font-extrabold text-blue-700">DDUP STATE SCHEME</span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider text-center mt-0.5">State Govt. Employees</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-xs">
              <span className="text-sm font-extrabold text-slate-700">CASHLESS INSURANCE</span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider text-center mt-0.5">All Major TPAs Accepted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Helpline Call-out */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Not sure which specialist to choose?</h2>
          <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Our medical helpdesk will listen to your symptoms and route you to the correct senior clinical consultant immediately.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+919335605848"
              className="inline-flex items-center justify-center gap-2.5 bg-secondary hover:bg-secondary/95 text-white px-8 py-4.5 rounded-full font-bold text-base shadow-xl shadow-secondary/25 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Phone className="w-5 h-5 animate-pulse" />
              Call +91 93356 05848
            </a>
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4.5 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <CalendarHeart className="w-5 h-5 text-primary" />
              Book Appointment Online
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* PROFILE DETAILS SIDEBAR DRAWER (AnimatePresence) */}
      <AnimatePresence>
        {selectedDoctor && (
          <>
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Sidebar content container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-55 w-full sm:max-w-lg bg-white shadow-2xl border-l border-slate-100 flex flex-col h-full"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Physician Profile Detail</span>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                {/* Doctor Card Hero */}
                <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                  <div className={`w-20 h-20 bg-gradient-to-br ${selectedDoctor.color} rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 text-white font-bold text-2xl relative overflow-hidden shadow-sm`}>
                    {selectedDoctor.img ? (
                      <img
                        src={selectedDoctor.img}
                        alt={selectedDoctor.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span>{selectedDoctor.initials}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">{selectedDoctor.name}</h3>
                    <p className="text-sm font-semibold text-primary mt-0.5">{selectedDoctor.role}</p>
                    <p className="text-xs text-slate-400 font-medium mt-1">Experience: {selectedDoctor.exp}</p>

                    {/* Star Rating Info */}
                    <div className="flex items-center gap-1.5 mt-2 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md w-max border border-amber-100 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{selectedDoctor.rating.toFixed(1)}</span>
                      <span className="text-amber-600/70 font-semibold">({selectedDoctor.reviewsCount} patient reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Primary Qualifications */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-primary shrink-0" />
                    Qualifications & Degrees
                  </h4>
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4.5">
                    <p className="text-sm font-bold text-slate-800">{selectedDoctor.qual}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1.5">{selectedDoctor.education}</p>
                  </div>
                </div>

                {/* Clinical Focus / Scope of Treatment */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-red-500 shrink-0" />
                    Clinical Focus & Expertise
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDoctor.clinicalFocus.map((focus, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold"
                      >
                        <ChevronRight className="w-3 h-3 text-secondary shrink-0" />
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full Schedule Hours */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-secondary shrink-0" />
                    Consultation Hours (Central Campus)
                  </h4>
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4.5 space-y-2.5">
                    {selectedDoctor.avail.map((slot, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        <p>{slot}</p>
                      </div>
                    ))}
                    <p className="text-[10px] text-slate-400 italic mt-2 border-t border-slate-200/50 pt-2">
                      * Timings might slightly change on emergencies. Emergency services are available on call 24/7.
                    </p>
                  </div>
                </div>

                {/* Accepted Insurances & Schemes */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                    Empanelled Government Schemes & Insurance
                  </h4>
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4.5">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDoctor.empanelments.map((emp, i) => (
                        <span
                          key={i}
                          className="bg-white border border-slate-200/80 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 flex items-center gap-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 animate-pulse" />
                          {emp}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold mt-3 leading-relaxed">
                      All cashless cards and Ayushman Golden Card are accepted. Our helpdesk team coordinates the pre-auth paperwork for you.
                    </p>
                  </div>
                </div>

                {/* Additional Info (Languages / Location) */}
                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                  <div>
                    <h5 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Languages Spoken</h5>
                    <p className="text-xs font-semibold text-slate-700">{selectedDoctor.languages.join(", ")}</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Gender</h5>
                    <p className="text-xs font-semibold text-slate-700 capitalize">{selectedDoctor.gender}</p>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="p-5 border-t border-slate-100 bg-slate-50 shrink-0 flex gap-3">
                <a
                  href="tel:+919335605848"
                  className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-3.5 rounded-xl text-sm font-bold transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Call OPD
                </a>
                <Link
                  href="/book-appointment"
                  className="flex-2 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-primary/20 hover:shadow-lg cursor-pointer"
                >
                  <CalendarHeart className="w-4 h-4" />
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

