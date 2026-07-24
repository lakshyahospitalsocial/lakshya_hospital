import React from 'react';
import { CalendarHeart, PhoneCall, ShieldCheck, Users, Activity, Stethoscope, Baby, HeartHandshake, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden bg-white min-h-[560px] lg:min-h-[700px]"
    >
      {/* Background image — DESKTOP ONLY (100% untouched) */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <img
          src="/lakshya-foundee.png"
          alt="Lakshya Hospital Background"
          className="w-full h-full object-cover object-right"
        />
      </div>

      {/* DESKTOP LAYOUT (100% UNTOUCHED ORIGINAL FOR lg+) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-6 pb-24">
        <div className="max-w-2xl bg-transparent p-0 rounded-none">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-primary text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              Multi-Super-Speciality Care
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Compassionate Care <br />
              <span className="text-primary">for Every Life</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-700 max-w-lg leading-relaxed">
              Lakshya Hospital delivers exceptional healthcare with expertise, trust, and advanced technology — comprehensive care for your entire family.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Link href="/book-appointment" className="bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-full font-semibold shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base">
                <CalendarHeart className="w-5 h-5" />
                Book Appointment
              </Link>
              <a href="tel:+919335605848" className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-7 py-3.5 rounded-full font-semibold shadow-sm transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base">
                <PhoneCall className="w-5 h-5 text-primary" />
                Call Now
              </a>
            </div>

            {/* Desktop Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 sm:pt-8">
              {[
                { label: "Years of Care",     value: "13+" },
                { label: "Happy Patients",    value: "50,000+" },
                { label: "Emergency Care",    value: "24/7" },
                { label: "Super-Specialists", value: "11+" },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1 border-l-2 border-primary/20 pl-3 sm:pl-4">
                  <h4 className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* MOBILE LAYOUT (< lg ONLY): Premium Interactive Medical Hero */}
      <div className="block lg:hidden w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-3 pb-4">
        
        {/* Top Text Content Area */}
        <div className="space-y-4 text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Kanpur's Multi-Super-Speciality Care</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Compassionate Care <br />
            <span className="text-primary bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              for Every Life
            </span>
          </h1>

          {/* Description Text */}
          <p className="text-slate-650 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
            Lakshya Hospital delivers exceptional healthcare with expertise, trust, and advanced technology — comprehensive care for your entire family.
          </p>

          {/* Action Buttons in SAME ROW */}
          <div className="flex flex-row items-center gap-2.5 sm:gap-4 pt-1">
            <Link
              href="/book-appointment"
              className="flex-1 bg-primary hover:bg-primary-hover text-white px-3.5 py-3 rounded-full font-bold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-center shrink-0"
            >
              <CalendarHeart className="w-4 h-4 shrink-0" />
              <span>Book Appointment</span>
            </Link>
            
            <a
              href="tel:+919335605848"
              className="flex-1 bg-white hover:bg-slate-50 text-primary border border-primary/40 px-3.5 py-3 rounded-full font-bold shadow-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-center shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-primary shrink-0" />
              <span>Call Now</span>
            </a>
          </div>

        </div>

        {/* Featured Doctor Image Card with Animated Healthcare Sector Icons */}
        <div className="mt-6 mb-5 relative rounded-[28px] overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group h-80 sm:h-96">
          <img
            src="/lakshya_foundee_mobile.png"
            alt="Dr. Rohit Agrawal & Dr. Tripti Mishra - Lakshya Hospital"
            className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

          {/* FLOATING ANIMATED HEALTHCARE SECTOR ICONS ON LEFT SIDE OF DOCTORS */}
          <div className="absolute top-4 left-3 z-10 flex flex-col gap-3.5 pointer-events-none">
            
            {/* Animated Icon 1: 24/7 ICU & Critical Care (Blue Heartbeat) */}
            <div className="contact-float-1 flex items-center gap-2 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-lg border border-white/60">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 pr-1">24/7 ICU Care</span>
            </div>

            {/* Animated Icon 2: Pediatrics & NICU (Green Baby) */}
            <div className="contact-float-2 flex items-center gap-2 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-lg border border-white/60">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Baby className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 pr-1">Pediatrics &amp; NICU</span>
            </div>

            {/* Animated Icon 3: OB/GYN Care (Pink Family) */}
            <div className="contact-float-3 flex items-center gap-2 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-lg border border-white/60">
              <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center shrink-0">
                <HeartHandshake className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-extrabold text-slate-800 pr-1">OB / Gynecology</span>
            </div>

          </div>

          {/* Compact Doctor Profile Badge at Bottom */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md px-3 py-2.5 rounded-2xl shadow-xl border border-white/80 flex items-center justify-between z-10">
            <div className="space-y-0.5 text-left">
              <div className="inline-flex items-center gap-1 text-[9.5px] font-bold text-primary uppercase tracking-wide">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                Director &amp; Founder • Ayushman Empanelled
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                Dr. Rohit Agrawal &amp; Dr. Tripti Mishra
              </h3>
              <p className="text-[10px] font-medium text-slate-600">
                Senior Consultants • Pediatric &amp; OB/GYN Care
              </p>
            </div>

            <div className="shrink-0 pl-1.5">
              <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile 4-Column Stats Banner */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-100">
          <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center divide-x divide-slate-100">
            
            <div className="flex flex-col items-center justify-center px-0.5 py-1">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-base font-extrabold text-slate-900 leading-tight">13+</span>
              <span className="text-[8.5px] sm:text-[10px] font-semibold text-slate-500 mt-0.5">Years of Care</span>
            </div>

            <div className="flex flex-col items-center justify-center px-0.5 py-1">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-base font-extrabold text-slate-900 leading-tight">50,000+</span>
              <span className="text-[8.5px] sm:text-[10px] font-semibold text-slate-500 mt-0.5">Happy Patients</span>
            </div>

            <div className="flex flex-col items-center justify-center px-0.5 py-1">
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-1">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-base font-extrabold text-slate-900 leading-tight">24/7</span>
              <span className="text-[8.5px] sm:text-[10px] font-semibold text-slate-500 mt-0.5">Emergency Care</span>
            </div>

            <div className="flex flex-col items-center justify-center px-0.5 py-1">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-base font-extrabold text-slate-900 leading-tight">11+</span>
              <span className="text-[8.5px] sm:text-[10px] font-semibold text-slate-500 mt-0.5">Super-Specialists</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}