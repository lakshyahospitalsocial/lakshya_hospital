'use client';
import React, { useState, useRef } from 'react';
import Script from 'next/script';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  Baby, Stethoscope, HeartPulse, Bone, Brain, Ear, Zap, Droplets,
  Scissors, ShieldPlus, Ambulance, FlaskConical, ScanLine, Activity,
  ShoppingBag, Users, Heart, CheckCircle2, ArrowRight, Phone, Plus,
  Minus, HelpCircle, ShieldCheck, HeartHandshake, Sparkles, Clock,
  Calendar, Check, MoreHorizontal, ShieldAlert, Award, Building2,
  PlayCircle
} from 'lucide-react';
import Link from 'next/link';

// Detailed services array matching core medical services
const services = [
  {
    icon: <Stethoscope className="w-7 h-7" />,
    title: "General Medicine",
    description: "Comprehensive diagnosis and treatment of common and complex medical conditions by experienced physicians.",
    color: "from-teal-500 to-emerald-600",
    light: "bg-teal-50",
    iconColor: "text-teal-600",
    border: "border-teal-100",
    doctor: "Dr. Ashish Dwivedi",
    highlights: ["Fever & Infections", "Diabetes Management", "Hypertension Care", "Preventive Health Check-ups"]
  },
  {
    icon: <ShieldPlus className="w-7 h-7" />,
    title: "General Surgery",
    description: "Advanced surgical procedures performed by highly experienced surgeons with 35+ years of combined expertise.",
    color: "from-indigo-500 to-violet-600",
    light: "bg-indigo-50",
    iconColor: "text-indigo-600",
    border: "border-indigo-100",
    doctor: "Dr. NS Chauhan & Dr. Kuldeep",
    highlights: ["Appendix Surgery", "Hernia Repair", "Gallbladder Surgery", "Wound Management"]
  },
  {
    icon: <HeartPulse className="w-7 h-7" />,
    title: "Obstetrics & Gynecology",
    description: "Expert care for women's health — from prenatal care and safe deliveries to complex gynecological surgeries.",
    color: "from-pink-500 to-rose-600",
    light: "bg-pink-50",
    iconColor: "text-pink-600",
    border: "border-pink-100",
    doctor: "Dr. Tripti Mishra",
    highlights: ["Safe Deliveries (Normal & C-Section)", "High-Risk Pregnancy", "PCOS & Endometriosis", "Laparoscopic Surgery"]
  },
  {
    icon: <Baby className="w-7 h-7" />,
    title: "Pediatrics",
    description: "Specialized child healthcare from newborns to adolescents, with a focus on growth, development, and well-being.",
    color: "from-blue-500 to-sky-600",
    light: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
    doctor: "Dr. Rohit Agrawal",
    highlights: ["Newborn Care & NICU", "Vaccinations", "Growth Monitoring", "Childhood Illness Management"]
  },
  {
    icon: <Bone className="w-7 h-7" />,
    title: "Orthopedics",
    description: "Expert treatment for bone, joint, ligament, and muscle conditions using the latest techniques and implants.",
    color: "from-orange-500 to-amber-600",
    light: "bg-orange-50",
    iconColor: "text-orange-600",
    border: "border-orange-100",
    doctor: "Dr. Vishal Setia",
    highlights: ["Fracture Care", "Joint Replacement", "Sports Injuries", "Spine Disorders"]
  },
  {
    icon: <Ear className="w-7 h-7" />,
    title: "ENT Care",
    description: "Comprehensive ear, nose, and throat treatments by a specialist with 16+ years of clinical experience.",
    color: "from-cyan-500 to-sky-600",
    light: "bg-cyan-50",
    iconColor: "text-cyan-600",
    border: "border-cyan-100",
    doctor: "Dr. Tripti Sengar",
    highlights: ["Hearing Loss", "Sinusitis", "Tonsillitis Surgery", "Nasal Reconstruction"]
  },
  {
    icon: <Brain className="w-7 h-7" />,
    title: "Neuro & Spine Surgery",
    description: "Advanced brain, spine, and nervous system surgeries by a super-specialist with MCH NeuroSurgery training.",
    color: "from-purple-500 to-violet-600",
    light: "bg-purple-50",
    iconColor: "text-purple-600",
    border: "border-purple-100",
    doctor: "Dr. SG Verma",
    highlights: ["Brain Tumour Surgery", "Disc Herniation", "Spinal Fusion", "Head Injury Management"]
  },
  {
    icon: <Droplets className="w-7 h-7" />,
    title: "Urosurgery",
    description: "Expert urological surgical care covering kidney, bladder, and urinary tract disorders with minimal invasive options.",
    color: "from-sky-500 to-blue-600",
    light: "bg-sky-50",
    iconColor: "text-sky-600",
    border: "border-sky-100",
    doctor: "Dr. Manish Kumar",
    highlights: ["Kidney Stones (PCNL/URS)", "Prostate Surgery", "Bladder Tumour", "Urinary Incontinence"]
  },
  {
    icon: <Scissors className="w-7 h-7" />,
    title: "Plastic Surgery",
    description: "Reconstructive and aesthetic surgical procedures performed by a highly trained plastic surgery super-specialist.",
    color: "from-rose-500 to-pink-600",
    light: "bg-rose-50",
    iconColor: "text-rose-600",
    border: "border-rose-100",
    doctor: "Dr. Shushant Luthra",
    highlights: ["Burn Reconstruction", "Skin Grafting", "Cleft Lip/Palate", "Scar Revision"]
  },
  {
    icon: <Baby className="w-7 h-7" />,
    title: "Pediatric Surgery",
    description: "Specialized surgical care for infants, children, and adolescents requiring complex surgical intervention.",
    color: "from-green-500 to-emerald-600",
    light: "bg-green-50",
    iconColor: "text-green-600",
    border: "border-green-100",
    doctor: "Dr. Rakesh Tripathi",
    highlights: ["Congenital Defect Surgery", "Pediatric Hernia", "Intussusception", "Appendectomy in Children"]
  },
  {
    icon: <Activity className="w-7 h-7" />,
    title: "Critical Care (ICU)",
    description: "State-of-the-art Intensive Care Unit with 24/7 monitoring and life-saving interventions for critically ill patients.",
    color: "from-red-500 to-rose-600",
    light: "bg-red-50",
    iconColor: "text-red-600",
    border: "border-red-100",
    doctor: "Dedicated ICU Team",
    highlights: ["24/7 Monitoring", "Ventilator Support", "Multi-organ Management", "Post-operative ICU Care"]
  },
];

const facilities = [
  { icon: <Activity className="w-6 h-6" />, name: "ICU & NICU", desc: "Advanced intensive care for adults and newborns with 24/7 specialist oversight.", color: "text-red-500 bg-red-50" },
  { icon: <FlaskConical className="w-6 h-6" />, name: "Pathology Lab", desc: "Full-spectrum diagnostic lab services with rapid result turnaround.", color: "text-purple-500 bg-purple-50" },
  { icon: <ScanLine className="w-6 h-6" />, name: "Ultrasound", desc: "High-resolution ultrasound imaging for abdomen, obstetrics, and more.", color: "text-blue-500 bg-blue-50" },
  { icon: <Zap className="w-6 h-6" />, name: "X-Ray", desc: "Digital X-ray facility for instant, high-quality diagnostic imaging.", color: "text-amber-500 bg-amber-50" },
  { icon: <ShoppingBag className="w-6 h-6" />, name: "Medical Store", desc: "In-house pharmacy with all essential medicines available around the clock.", color: "text-green-500 bg-green-50" },
  { icon: <Ambulance className="w-6 h-6" />, name: "Ambulance", desc: "24/7 emergency ambulance service for prompt patient transport.", color: "text-orange-500 bg-orange-50" },
  { icon: <Users className="w-6 h-6" />, name: "Ayushman Bharat (TPA)", desc: "Cashless treatment facility for government scheme beneficiaries.", color: "text-teal-500 bg-teal-50" },
  { icon: <ShieldPlus className="w-6 h-6" />, name: "DDUS Scheme", desc: "Deen Dayal Upadhyay Swasthya Seva Yojana empanelled hospital.", color: "text-indigo-500 bg-indigo-50" },
];

// Helper sub-component for Diamond shapes
const DiamondCollageImage = ({
  src, alt, fallbackIcon: Icon, gradient
}: { src: string; alt: string; fallbackIcon: any; gradient: string }) => {
  return (
    <div className="w-full h-full relative group">
      {/* Background Gradient & Icon (Fallback before user uploads actual photos) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-white p-4`}>
        <Icon className="w-10 h-10 mb-2 opacity-90 stroke-[1.25]" />
        <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest text-center leading-none">{alt}</span>
      </div>

      {/* Actual Image Tag */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLElement).style.display = "none";
        }}
      />
    </div>
  );
};

export default function ServicesPage() {
  const scrollToServices = () => {
    const grid = document.getElementById("services-grid");
    grid?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-50/50">
      <Header />

      {/* Redesigned Collage Hero Block (Layout Grid matching mockup) */}
      <section className="bg-gradient-to-tr from-slate-50 via-blue-50/20 to-white pt-16 pb-14 relative overflow-hidden">
        {/* Background Blur Accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200/85 rounded-full px-4 py-1.5 text-xs font-bold text-green-700">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                12 Speciality Departments
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight font-display">
                World-Class Care,<br />
                <span className="text-primary flex items-center gap-2">
                  Close to Home
                  <Heart className="w-8 h-8 text-secondary fill-secondary/10 shrink-0 animate-pulse hidden sm:inline-block" />
                </span>
              </h1>

              <p className="text-slate-605 leading-relaxed text-sm sm:text-base font-medium max-w-xl">
                At Lakshya Hospital, we combine advanced technology, experienced specialists, and compassionate care to deliver the best outcomes for you and your family.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4.5 pt-2">
                <button
                  onClick={scrollToServices}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-7 py-4.5 rounded-2xl shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Explore Our Services
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold px-7 py-4.5 rounded-2xl shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  <PlayCircle className="w-4.5 h-4.5 text-primary shrink-0" />
                  Watch Our Care in Action
                </Link>
              </div>
            </div>

            {/* Right Diagonal/Rhombus Image Collage Column */}
            <div className="lg:col-span-6 relative h-[420px] sm:h-[480px] w-full max-w-[500px] lg:max-w-none mx-auto overflow-visible pointer-events-none sm:pointer-events-auto">

              {/* Solid Accent Diamond - Blue (top/left) */}
              <div className="absolute left-[8%] top-[18%] -translate-y-1/2 w-8 h-8 bg-blue-500/10 rotate-45 rounded-lg z-5" />

              {/* 1. Surgeons Diamond (Main Center) */}
              <div
                className="absolute left-[38%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 shadow-xl border-4 border-white bg-slate-50 overflow-hidden z-15 group cursor-pointer"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              >
                <DiamondCollageImage
                  src="/operation_theatre.png"
                  alt="Surgeons OT Room"
                  fallbackIcon={ShieldPlus}
                  gradient="from-indigo-600 to-blue-700"
                />
              </div>

              {/* 2. Beds Diamond (Top Right) */}
              <div
                className="absolute left-[78%] top-[30%] -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-42 sm:h-42 shadow-lg border-4 border-white bg-slate-50 overflow-hidden z-10 group cursor-pointer"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              >
                <DiamondCollageImage
                  src="/icu_web.png"
                  alt="Modern ICU Wards"
                  fallbackIcon={Building2}
                  gradient="from-teal-600 to-emerald-700"
                />
              </div>

              {/* 3. NICU Baby Diamond (Middle Right) */}
              <div
                className="absolute left-[92%] top-[65%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 shadow-md border-4 border-white bg-slate-50 overflow-hidden z-10 group cursor-pointer"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              >
                <DiamondCollageImage
                  src="/nicu_baby.png"
                  alt="NICU Incubator Baby"
                  fallbackIcon={Baby}
                  gradient="from-blue-600 to-sky-700"
                />
              </div>

              {/* 4. Doctor Consultation Diamond (Bottom Center/Right) */}
              <div
                className="absolute left-[64%] top-[72%] -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-40 sm:h-40 shadow-lg border-4 border-white bg-slate-50 overflow-hidden z-20 group cursor-pointer"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              >
                <DiamondCollageImage
                  src="/doctor_opd_clinic.png"
                  alt="Doctor OPD Clinic"
                  fallbackIcon={Stethoscope}
                  gradient="from-purple-600 to-pink-700"
                />
              </div>

              {/* Compassionate Care Badge (Rhombus/Diamond Style Overlay) */}
              <div
                className="absolute left-[12%] top-[65%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-2xl shadow-xl z-25 flex items-center justify-center rotate-45 border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                title="Compassionate Patient Care"
              >
                <div className="-rotate-45 text-white text-center p-1.5 space-y-1">
                  <HeartHandshake className="w-5 h-5 mx-auto text-secondary" />
                  <p className="text-[9px] font-black tracking-wider leading-tight">Compassionate Care</p>
                </div>
              </div>

              {/* Advanced Technology Badge (Rhombus/Diamond Style Overlay) */}
              <div
                className="absolute left-[54%] top-[22%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-secondary rounded-2xl shadow-xl z-25 flex items-center justify-center rotate-45 border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                title="Advanced Medical Technology"
              >
                <div className="-rotate-45 text-white text-center p-1.5 space-y-1">
                  <Zap className="w-5 h-5 mx-auto text-yellow-300" />
                  <p className="text-[9px] font-black tracking-wider leading-tight">Advanced Technology</p>
                </div>
              </div>

              {/* Solid Accent Diamonds */}
              <div className="absolute left-[68%] top-[94%] w-6 h-6 bg-blue-500 rotate-45 rounded shadow-sm z-25 pointer-events-none" />
              <div className="absolute left-[95%] top-[45%] w-6 h-6 bg-green-500 rotate-45 rounded shadow-sm z-25 pointer-events-none" />

            </div>
          </div>

          {/* Stats metrics horizontal bar (Layout matching mockup) */}
          <div className="mt-16 bg-white rounded-[28px] border border-slate-100 shadow-xl shadow-slate-100/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-stretch justify-between gap-6 md:gap-0">
            {[
              { value: "24/7", label: "Emergency Care", desc: "Always ready when you need us", icon: Clock, color: "text-red-500 bg-red-50" },
              { value: "Experienced", label: "Specialists", desc: "Highly qualified & trusted experts", icon: Users, color: "text-blue-500 bg-blue-50" },
              { value: "Safe & Advanced", label: "Infrastructure", desc: "Modern facilities for better outcomes", icon: ShieldCheck, color: "text-purple-500 bg-purple-50" },
              { value: "Patient First", label: "Approach", desc: "Your health & comfort are our priority", icon: HeartHandshake, color: "text-green-500 bg-green-50" }
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="hidden md:block w-[1px] bg-slate-200/60 self-stretch my-2.5" />}
                <div className="flex-1 md:px-6 first:pl-0 last:pr-0 flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-800 leading-none">{item.value}</p>
                    <p className="text-xs font-bold text-slate-700 mt-2">{item.label}</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-tight font-semibold">{item.desc}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>

      {/* Dark Blue Specialty Quick Panel (Layout matching mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        <div className="bg-gradient-to-r from-blue-700 to-primary rounded-[32px] p-8 text-center text-white shadow-xl shadow-blue-700/10">
          <p className="text-[10px] font-bold text-secondary tracking-[0.3em] uppercase mb-6">Our Speciality Departments</p>

          {/* Grid of circle departments */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-6 justify-center items-start mb-8 max-w-5xl mx-auto">
            {[
              { label: "Pediatrics & Neonatology", icon: Baby, color: "text-blue-500 bg-white" },
              { label: "Obstetrics & Gynaecology", icon: HeartPulse, color: "text-pink-500 bg-white" },
              { label: "General Medicine", icon: Stethoscope, color: "text-teal-500 bg-white" },
              { label: "General & Laparoscopic", icon: ShieldPlus, color: "text-indigo-500 bg-white" },
              { label: "Orthopedics & Joint", icon: Bone, color: "text-orange-500 bg-white" },
              { label: "Neurology", icon: Brain, color: "text-purple-500 bg-white" },
              { label: "Cardiology", icon: Heart, color: "text-red-500 bg-white" },
              { label: "Urology", icon: Droplets, color: "text-sky-500 bg-white" },
              { label: "And More Specialities", icon: MoreHorizontal, color: "text-slate-500 bg-white" }
            ].map((d, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3 cursor-pointer group" onClick={scrollToServices}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${d.color} transition-transform group-hover:scale-110`}>
                  <d.icon className="w-6 h-6 shrink-0" />
                </div>
                <span className="text-[10px] font-bold tracking-wide leading-tight text-white/90 max-w-[90px]">{d.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={scrollToServices}
            className="bg-secondary hover:bg-secondary/95 text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg shadow-secondary/25 transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-1.5"
          >
            View All Departments
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Critical Care Emergency Infrastructure (NEW Improvement) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left Content info */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold text-secondary tracking-widest uppercase">Emergency Wards</span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display leading-tight">Advanced Critical Care Units</h2>
              <div className="w-12 h-1 bg-primary rounded-full" />

              <p className="text-slate-650 text-sm leading-relaxed font-medium">
                As a central healthcare hub in Kidwai Nagar, Kanpur, our hospital infrastructure is configured for active life-saving clinical interventions.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-3 bg-slate-50 rounded-2xl p-4.5 border border-slate-250/20">
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">24/7 Adult &amp; Pediatric ICU Wards</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Equipped with multi-channel monitors, bedside ventilators, and infusion pumps. Staffed around the clock by experienced intensivists and nursing officers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 bg-slate-50 rounded-2xl p-4.5 border border-slate-250/20">
                  <Baby className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">High-Tech Neonatal NICU Care</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Advanced incubation chambers, phototherapy machines, neonatal ventilators, and warmers to provide expert treatment for premature and low-birth-weight infants.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right visual placeholders of ICU infrastructure */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="relative h-64 bg-slate-100 rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex items-center justify-center p-6 text-center group">
                {/* Fallback code */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-8 text-slate-400">
                  <Building2 className="w-12 h-12 mb-3 text-slate-350" />
                  <p className="text-xs font-bold text-slate-650">Modern ICU Facility Image</p>
                  <p className="text-[10px] mt-1 max-w-[180px] leading-tight">Name image <code className="bg-slate-200/50 px-1 rounded font-bold">hospital-icu.jpg</code> in <code className="bg-slate-200/50 px-1 rounded font-bold">/public</code> to display here.</p>
                </div>
                <img
                  src="/icu.jpeg"
                  alt="Lakshya Hospital ICU Infrastructure"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-102"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              <div className="relative h-64 bg-slate-100 rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex items-center justify-center p-6 text-center group">
                {/* Fallback code */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-8 text-slate-400">
                  <Baby className="w-12 h-12 mb-3 text-slate-350" />
                  <p className="text-xs font-bold text-slate-650">Neonatal NICU Image</p>
                  <p className="text-[10px] mt-1 max-w-[180px] leading-tight">Name image <code className="bg-slate-200/50 px-1 rounded font-bold">hospital-nicu.jpg</code> in <code className="bg-slate-200/50 px-1 rounded font-bold">/public</code> to display here.</p>
                </div>
                <img
                  src="/nicu.jpeg"
                  alt="Lakshya Hospital Neonatal NICU Wards"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-102"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services-grid" className="py-20 bg-slate-50/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase">What We Offer</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-display">Our Speciality Clinical Services</h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4">
              Explore deep insights about our clinical offerings, treatment scopes, and resident super-specialist doctors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6.5">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full">
                <div>
                  {/* Top colored visual strip */}
                  <div className={`h-2 w-full bg-gradient-to-r ${service.color}`}></div>

                  <div className="p-6">
                    {/* Header info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12.5 h-12.5 ${service.light} ${service.iconColor} rounded-2xl flex items-center justify-center shrink-0 border ${service.border} group-hover:scale-110 transition-transform`}>
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">{service.title}</h3>
                    </div>

                    <p className="text-slate-505 text-xs sm:text-sm leading-relaxed mb-5 font-medium">
                      {service.description}
                    </p>

                    {/* Department Bullet Highlights */}
                    <div className="space-y-2 mb-4">
                      {service.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                          <span className="text-xs text-slate-700 font-semibold">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Specialist & Action Area */}
                <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clinician Consultant</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5 line-clamp-1">{service.doctor}</p>
                  </div>
                  <Link
                    href="/book-appointment"
                    className="flex items-center gap-1 bg-primary/10 hover:bg-primary text-primary hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                  >
                    Book <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Diagnostic Infrastructures Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Diagnostics &amp; Labs</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-display">On-Site Support Wards</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              We coordinate full diagnostic labs, pathology workups, ultrasound scans, digital X-rays, and in-house pharmacies 24/7 so that tests and drugs are available immediately.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {facilities.map((f, idx) => (
              <div key={idx} className="bg-slate-50/65 rounded-2xl p-5 border border-slate-150 hover:border-primary/25 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className={`w-11 h-11 ${f.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm leading-snug">{f.name}</h3>
                <p className="text-slate-550 text-xs leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cashless admission Checklist Section (NEW Improvement) */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase">Patient Admissions</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-display">Cashless Admissions Checklist</h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4">
              Here is how you can claim cashless treatment benefits under Ayushman Bharat or private corporate policies at the time of admission:
            </p>
          </div>

          {/* Checklist boxes */}
          <div className="space-y-4">
            {[
              { step: "01", title: "Present Cards & ID Docs", desc: "Submit your Ayushman card, UP state government health card, or corporate cashless card along with your doctor's admission recommendation prescription at the TPA desk." },
              { step: "02", title: "desk Verification & Pre-Auth Request", desc: "Our in-house cashless coordinator verifies the card benefits and submits the pre-authorisation request directly to the insurance company or government portal." },
              { step: "03", title: "Treatment Initiation", desc: "The patient is admitted and clinical diagnostics or surgical preparations begin immediately. Our coordinators handle queries from the insurance TPA directly." },
              { step: "04", title: "Cashless Discharge", desc: "Upon recovery, final clinical paperwork is submitted. The patient receives discharge instructions and medications, leaving without paying upfront bills (for approved covers)." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex gap-4 sm:gap-6 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{step.title}</h4>
                  <p className="text-slate-550 text-xs sm:text-sm mt-1 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Insurance Call-out Banner */}
      <section className="py-14 bg-gradient-to-br from-primary to-primary-hover shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">Cashless Hospitalisation Available</h2>
              <p className="text-white/80 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
                We support Ayushman Bharat (Golden Card), Deen Dayal Upadhyay State Employee Scheme (DDUS), and cashless pre-auth with all major corporate insurers.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <a
                href="tel:+919335605848"
                className="bg-white text-primary font-bold px-6.5 py-4 rounded-2xl hover:bg-slate-50 transition-all shadow-xl flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                <Phone className="w-4.5 h-4.5 text-primary" />
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services FAQ ── */}
      <ServicesFAQ />

      <Footer />
    </main>
  );
}

/* ─── FAQ DATA (services-specific) ─────────────────────────── */
const SERVICE_FAQS = [
  {
    q: "What speciality departments are available at Lakshya Hospital?",
    a: "Lakshya Hospital has 12 super-speciality departments: General Medicine, General Surgery, Obstetrics & Gynaecology, Paediatrics & Neonatology, Orthopaedics, ENT, Neuro & Spine Surgery, Urosurgery, Plastic Surgery, Paediatric Surgery, Critical Care (ICU/NICU), and Pathology & Radiology.",
  },
  {
    q: "How do I book an appointment with a specific doctor or specialist?",
    a: "You can book an appointment by calling +91 93356 05848, visiting our Contact page online, or walking directly into the hospital reception. Our team will match you with the right specialist based on your condition and schedule the earliest available slot.",
  },
  {
    q: "Does Lakshya Hospital offer laparoscopic (keyhole) surgeries?",
    a: "Yes. We offer advanced laparoscopic procedures across multiple departments including General Surgery (appendectomy, hernia repair, cholecystectomy), Gynaecology (hysterectomy, fibroid removal, endometriosis treatment), and Urosurgery. Minimally invasive techniques mean faster recovery and less post-operative pain.",
  },
  {
    q: "Is there a NICU for premature or critically ill newborns?",
    a: "Yes. Lakshya Hospital has a fully equipped Neonatal Intensive Care Unit (NICU) staffed 24/7 by trained neonatologists and nursing staff. Our NICU handles premature births, low birth weight babies, respiratory distress, neonatal jaundice, and other critical newborn conditions.",
  },
  {
    q: "What types of orthopaedic conditions and surgeries are treated?",
    a: "Our Orthopaedics department (Dr. Vishal Setia) treats fractures, joint disorders, sports injuries, and spine conditions. Procedures include joint replacement (knee & hip), arthroscopy, spinal fusion, fracture fixation (ORIF), and physiotherapy-based rehabilitation programmes.",
  },
  {
    q: "Does the hospital perform high-risk pregnancy management and C-sections?",
    a: "Absolutely. Dr. Tripti Mishra and our Obstetrics team are experienced in managing all categories of pregnancies, including high-risk cases involving hypertension, diabetes, twin pregnancies, and placenta previa. We perform both normal deliveries and Caesarean sections in a fully equipped operation theatre adjacent to the NICU.",
  },
  {
    q: "What diagnostic and imaging services are available on-site?",
    a: "Lakshya Hospital has a full in-house diagnostic centre offering: pathology & blood tests (routine and specialised), digital X-ray, ultrasound (obstetric, abdominal, pelvic), ECG, and echocardiography. Most routine lab reports are available within 4–6 hours.",
  },
  {
    q: "Are services available under the Ayushman Bharat scheme?",
    a: "Yes. We are empanelled under Ayushman Bharat – PM-JAY (via TPA) and the DDUS Scheme, enabling eligible patients to receive cashless treatment across a wide range of surgical and medical procedures. Please bring your Ayushman card to the billing desk for pre-authorisation.",
  },
  {
    q: "What is the ICU capacity and what conditions are managed there?",
    a: "Our ICU is equipped with advanced life support equipment and is supervised by a dedicated team of intensivists and nurses 24/7. Conditions managed include post-operative care, multi-organ failure, sepsis, respiratory failure (with ventilator support), stroke, and polytrauma.",
  },
  {
    q: "Can I get a second opinion or consultation before surgery?",
    a: "Yes, absolutely. We encourage patients to seek all the information they need before making any surgical decision. Our specialists are happy to provide detailed consultations, review prior reports, and discuss all available treatment options — surgical and non-surgical — so you can make a fully informed choice.",
  },
];

const SERVICES_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": SERVICE_FAQS.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

/* ─── ACCORDION ITEM ────────────────────────────────────────── */
function FAQItem({
  faq, index, isOpen, onToggle,
}: { faq: typeof SERVICE_FAQS[0]; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-primary/30 bg-white shadow-md' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
      }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <span className={`shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary'
            }`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors ${isOpen ? 'text-primary' : 'text-gray-800 group-hover:text-primary'
            }`}>
            {faq.q}
          </span>
        </div>
        <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all ${isOpen ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-400 group-hover:border-primary/40 group-hover:text-primary'
          }`}>
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}>
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-500 text-sm leading-relaxed pl-[4.25rem]">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── SERVICES FAQ SECTION ──────────────────────────────────── */
function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const col1 = SERVICE_FAQS.slice(0, Math.ceil(SERVICE_FAQS.length / 2));
  const col2 = SERVICE_FAQS.slice(Math.ceil(SERVICE_FAQS.length / 2));

  return (
    <>
      <Script
        id="services-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_FAQ_SCHEMA) }}
        strategy="afterInteractive"
      />

      <section id="services-faq" className="py-16 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-secondary font-bold tracking-wider text-xs uppercase mb-3 flex items-center justify-center gap-2">
              <HelpCircle size={13} /> Frequently Asked Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Your Questions, <span className="text-primary">Answered</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-[1px] bg-gray-300" />
              <Heart className="w-3 h-3 text-primary fill-primary" />
              <div className="w-8 h-[1px] bg-gray-300" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-lg mx-auto">
              Common questions about our departments, procedures, doctors, and how to access cashless care under government schemes.
            </p>
          </div>

          {/* Two-col accordion */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
            <div className="flex flex-col gap-3">
              {col1.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} isOpen={openIndex === i} onToggle={() => toggle(i)} />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {col2.map((faq, i) => {
                const gi = i + col1.length;
                return <FAQItem key={gi} faq={faq} index={gi} isOpen={openIndex === gi} onToggle={() => toggle(gi)} />;
              })}
            </div>
          </div>

          {/* CTA strip */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-50 via-white to-cyan-50 border border-blue-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 leading-snug">Still have questions about a specific treatment?</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Speak directly with one of our specialists — we are available around the clock.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a href="tel:+919335605848" className="px-6 py-3.5 rounded-2xl border-2 border-primary text-primary font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300">
                📞 Call +91 93356 05848
              </a>
              <Link href="/book-appointment" className="px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5">
                Book Consultation
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
