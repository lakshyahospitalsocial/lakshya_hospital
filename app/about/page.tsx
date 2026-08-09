"use client";
import React, { useRef, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  Shield, Microscope, Users, Heart, CheckCircle2, PlayCircle, PauseCircle, Clock,
  Calendar, Check, Smile, Award, Building2, ShieldCheck, MapPin,
  ChevronRight, HeartHandshake, Stethoscope
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* Redesigned Hero Block (Layout Grid matching mockup) */}
      <section className="bg-gradient-to-tr from-slate-50 via-blue-50/20 to-white pt-16 pb-14 relative overflow-hidden">
        {/* Background Blur Accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200/80 rounded-full px-4.5 py-1.5 text-xs font-bold text-green-700">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                Trusted Healthcare Since 2013
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight font-display">
                About <span className="text-primary">Lakshya Hospital</span>
              </h1>

              <p className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed font-sans">
                Care Built on Trust. Growing with Kanpur.
              </p>

              <p className="text-slate-650 leading-relaxed text-sm sm:text-base font-medium max-w-2xl">
                Founded in 2013 by Dr. Rohit Agarwal, a renowned pediatrician, Lakshya Hospital is one of Kanpur’s leading healthcare facilities. Over 13 years, it has grown into a 30-bed facility, offering advanced tertiary and quaternary care, supported by super-specialists, cutting-edge technology, and state-of-the-art infrastructure. Guided by its mission to deliver world-class yet affordable care, Lakshya Hospital has been at the forefront of the most advanced medical specialties and treatment programs, including general medicine, general surgery, obstetrics & gynecology, pediatrics, orthopedics, ENT care, neurosurgery, spine surgery, urosurgery, plastic surgery, pediatric surgery, and critical care.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4.5 pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6.5 py-4 rounded-2xl shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  <Stethoscope className="w-4.5 h-4.5" />
                  Explore Our Services
                </Link>
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-primary border border-primary/25 font-bold px-6.5 py-4 rounded-2xl shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  <Calendar className="w-4.5 h-4.5 text-primary" />
                  Book Appointment
                </Link>
              </div>

              {/* Trust Indicators bottom row */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-200/60 pt-8 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-slate-800 leading-tight">24/7</p>
                    <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">Emergency Care</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-slate-800 leading-tight">Patient</p>
                    <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">First Approach</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-slate-800 leading-tight">Safe &amp;</p>
                    <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">Advanced Care</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Photo Column with Floating Card */}
            <div className="lg:col-span-5 relative group">
              {/* Photo Box Container (Space for User Image) */}
              <div className="relative h-[380px] sm:h-[420px] w-full rounded-[32px] overflow-hidden border-[6px] border-white shadow-xl bg-slate-100/80 flex items-center justify-center text-center">

                {/* Fallback box in case image is missing */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200/70 flex flex-col items-center justify-center p-8 text-slate-400">
                  <Building2 className="w-16 h-16 mb-4 text-slate-300 stroke-[1.25]" />
                  <p className="text-sm font-bold text-slate-500">Hospital Photo Space</p>
                  <p className="text-[11px] text-slate-400 mt-2 max-w-[240px] leading-relaxed">
                    Rename your hospital facade picture to <code className="bg-slate-200/50 px-1 py-0.5 rounded font-mono font-bold text-slate-650">hospital-building.jpg</code> and place it inside the <code className="bg-slate-200/50 px-1 py-0.5 rounded font-mono font-bold text-slate-650">/public</code> folder to replace this placeholder automatically.
                  </p>
                </div>

                {/* Main image tag */}
                <img
                  src="/lakshya_hospital.png"
                  alt="Lakshya Hospital Kanpur Facade"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent z-15 pointer-events-none" />

                {/* Floating Info Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20 flex items-center justify-between gap-4 z-20 transition-all group-hover:bottom-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Building2 className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800">Lakshya Hospital, Kanpur</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">Multi-Speciality | Always Open for You</p>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl border border-green-150 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                    Open 24 Hours
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Stats metrics horizontal bar (Layout matching mockup) */}
          <div className="mt-16 bg-white rounded-[28px] border border-slate-100 shadow-xl shadow-slate-100/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-stretch justify-between gap-6 md:gap-0">
            {[
              { value: "2013", label: "Year Founded", desc: "Over a decade of trusted care", icon: Calendar, color: "text-blue-500 bg-blue-50" },
              { value: "30+", label: "Modern Beds", desc: "Well-equipped for advanced treatment", icon: Building2, color: "text-green-500 bg-green-50" },
              { value: "50+", label: "Expert Doctors", desc: "Highly-qualified & experienced team", icon: Users, color: "text-indigo-500 bg-indigo-50" },
              { value: "10,000+", label: "Happy Patients", desc: "Thousands of families who trust us", icon: Smile, color: "text-amber-500 bg-amber-50" },
              { value: "1", label: "Commitment", desc: "Your health is our top priority", icon: ShieldCheck, color: "text-purple-500 bg-purple-50" }
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="hidden md:block w-[1px] bg-slate-200/60 self-stretch my-2.5" />}
                <div className="flex-1 md:px-6 first:pl-0 last:pr-0 flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-800 leading-none">{item.value}</p>
                    <p className="text-xs font-bold text-slate-700 mt-2">{item.label}</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-tight font-semibold">{item.desc}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>

      {/* Leadership & Directors Vision Section (NEW Improvement) */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase">Hospital Leadership</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-display">A Message From Our Directors</h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4">
              Committed to bringing clinical excellence, personal trust, and cutting-edge treatments to Kanpur since day one.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Dr. Rohit Agrawal */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/10 shadow-sm bg-slate-50 relative">
                <img
                  src="/dr_rohit_lakshya_director.png"
                  alt="Dr. Rohit Agrawal"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">Dr. Rohit Agrawal</h3>
                    <p className="text-xs font-extrabold text-primary uppercase tracking-wider mt-0.5">Founding Director &amp; Senior Pediatrician</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">MBBS, MD (Pediatrics) • 16+ Years Clinical Experience</p>
                  </div>

                  {/* Message Quote */}
                  <div className="relative">
                    <span className="absolute -top-3.5 -left-2 text-6xl text-primary/10 font-serif leading-none">“</span>
                    <p className="text-slate-600 text-sm leading-relaxed italic relative z-10 pl-3">
                      For over 13 years, our mission at Lakshya Hospital has been to bridge the gap between world-class medical innovation and empathetic care. Healthcare is not just about treatment; it is about building lifelong relationships of trust. We are deeply committed to providing the highest standards of pediatric, critical care, and multi-speciality clinical excellence to every family in Kanpur.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6 flex items-center gap-2 text-xs font-bold text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Founding Director</span>
                </div>
              </div>
            </div>

            {/* Dr. Tripti Mishra */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/10 shadow-sm bg-slate-50 relative">
                <img
                  src="/dr_tripti_founder.png"
                  alt="Dr. Tripti Mishra"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">Dr. Tripti Mishra</h3>
                    <p className="text-xs font-extrabold text-primary uppercase tracking-wider mt-0.5">Executive Director &amp; Senior OB/GYN</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">MBBS, MS (Obstetrics &amp; Gynecology) • 16+ Years Clinical Experience</p>
                  </div>

                  {/* Message Quote */}
                  <div className="relative">
                    <span className="absolute -top-3.5 -left-2 text-6xl text-primary/10 font-serif leading-none">“</span>
                    <p className="text-slate-600 text-sm leading-relaxed italic relative z-10 pl-3">
                      True clinical leadership lies in treating patients with absolute dignity and clinical rigor. At Lakshya Hospital, we have created a dedicated ecosystem for maternal health, high-risk pregnancies, and neonatal emergencies. Our state-of-the-art ICU, NICU, and modular surgical theaters represent our promise of safety and excellence to the community we serve.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-6 flex items-center gap-2 text-xs font-bold text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Executive Director</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Virtual Tour / Video Section (RESTRUCTURED / MOVED) */}
      <section className="py-20 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left Content info */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Take a Tour</span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display leading-tight">Explore Our Modern Infrastructure</h2>
              <div className="w-12 h-1 bg-secondary rounded-full" />

              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Our 30-bed healthcare campus is designed to optimize patient comfort, hygiene, and emergency logistics. Watch our virtual hospital walk-through to see our clinical environments.
              </p>

              <ul className="space-y-3 pt-2">
                {[
                  "Advanced Modular Operation Theaters (OT)",
                  "Fully Monitored Neonatal ICU (NICU) & Adult ICU Wards",
                  "On-Campus Radiology (Ultrasound & X-Ray) & Pharmacy",
                  "Clean, Air-Conditioned Deluxe & General Wards"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Video Container */}
            <div className="lg:col-span-7">
              <div className="relative h-[360px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 bg-slate-900 group">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src="/Lakshya_Website_Intro.mp4"
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />

                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${isPlaying
                    ? 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'
                    : 'opacity-100 pointer-events-auto'
                    }`}
                >
                  <button
                    onClick={handlePlay}
                    aria-label={isPlaying ? "Pause Video" : "Play Video"}
                    className="w-16 h-16 bg-secondary hover:bg-secondary/95 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                  >
                    {isPlaying ? <PauseCircle className="w-10 h-10" /> : <PlayCircle className="w-10 h-10" />}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Historical Milestones Timeline (NEW Improvement) */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Our Timeline</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-display">Decade of Growth &amp; Healing</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 text-sm mt-4">
              How Lakshya Hospital evolved from a localized clinic to Kanpur's multi-speciality tertiary facility.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l border-slate-200 ml-4 md:ml-32 space-y-12">
            {[
              { year: "2013", title: "Founded by Dr. Rohit Agrawal", desc: "Established as a specialized pediatric care clinic, answering Kanpur's call for high-standard medical treatment for newborns." },
              { year: "2016", title: "Infrastructure & Bed Expansion", desc: "Expanded into a comprehensive multi-speciality hospital with a 30-bed strength, introducing critical care ICU and Neonatal NICU units." },
              { year: "2020", title: "Super-Speciality Operating Theaters", desc: "Inaugurated modular surgical theaters and introduced advanced departments like Neurosurgery, Spine Surgery, Urology, and ENT." },
              { year: "2024", title: "Empanelled for Ayushman Bharat & DDUS", desc: "Secured empanelment under Ayushman Bharat (PM-JAY) and UP State Employee Scheme (DDUS), expanding cashless care to government employees and lower-income families." }
            ].map((milestone, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10">
                {/* Year tag left layout for desktop */}
                <div className="hidden md:block absolute -left-32 top-1.5 w-24 text-right font-black text-primary text-xl font-display">
                  {milestone.year}
                </div>

                {/* Circle pointer */}
                <div className="absolute -left-2 top-1.5 w-4.5 h-4.5 rounded-full bg-white border-[4px] border-primary shadow-sm z-10" />

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
                  {/* Year tag for mobile only */}
                  <span className="md:hidden inline-block text-xs font-extrabold text-primary bg-primary/10 rounded-md px-2 py-0.5 mb-2">
                    {milestone.year}
                  </span>
                  <h4 className="text-base font-bold text-slate-800 leading-snug">{milestone.title}</h4>
                  <p className="text-slate-550 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations & Empanelments Showcase (NEW Improvement) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left side text */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold text-secondary tracking-widest uppercase">Approved Care</span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display leading-tight">Cashless Treatment &amp; Schemes</h2>
              <div className="w-12 h-1 bg-primary rounded-full" />

              <p className="text-slate-650 text-sm leading-relaxed font-medium">
                We believe healthcare should be accessible to all. Lakshya Hospital is empanelled under key government health benefit schemes and partners with major insurance providers.
              </p>

              <div className="flex items-start gap-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl p-4.5">
                <HeartHandshake className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Coordination &amp; Paperwork Help</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Our dedicated insurance desk coordinates with your insurance TPA or processes Golden Card admissions directly, saving families from procedural stress.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side accreditations grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-50/70 border border-slate-150 rounded-3xl p-5 hover:border-green-300 transition-all group">
                <span className="text-xs font-extrabold text-green-700 bg-green-50 px-2.5 py-1 rounded-lg border border-green-200">Govt. Benefit Scheme</span>
                <h4 className="text-base font-bold text-slate-900 mt-3 leading-snug">Ayushman Bharat (PM-JAY)</h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                  Cashless medical and surgical admissions for all golden card holders. Covers secondary and tertiary procedures.
                </p>
              </div>

              <div className="bg-slate-50/70 border border-slate-150 rounded-3xl p-5 hover:border-blue-300 transition-all group">
                <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">State Employee Card</span>
                <h4 className="text-base font-bold text-slate-900 mt-3 leading-snug">DDUS Cashless Benefit</h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                  Cashless medical care for UP State Government Employees, retirees, and their eligible dependents.
                </p>
              </div>

              <div className="bg-slate-50/70 border border-slate-150 rounded-3xl p-5 hover:border-indigo-300 transition-all group sm:col-span-2">
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">Cashless Insurance Desk</span>
                <h4 className="text-base font-bold text-slate-900 mt-3 leading-snug">Major TPAs &amp; Corporate Insurances</h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                  Partnered with leading insurers including Star Health, HDFC Ergo, Niva Bupa, Care Health, ICICI Lombard, and more. Walk in with your cashless card for fast approvals.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
