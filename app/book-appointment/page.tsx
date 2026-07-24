"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import {
  CalendarHeart, User, Phone, Mail, MessageSquare,
  CheckCircle2, ChevronRight, ChevronLeft, Clock,
  Award, Heart, MapPin, Stethoscope, AlertCircle,
  Baby, HeartPulse, Bone, Brain, Ear, Scissors,
  Droplets, ShieldPlus, Activity,
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────────── */
const DEPARTMENTS = [
  { id: "gen-med", label: "General Medicine", icon: Stethoscope, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" },
  { id: "gen-surg", label: "General Surgery", icon: ShieldPlus, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
  { id: "ob-gyn", label: "Obstetrics & Gynecology", icon: HeartPulse, color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-200" },
  { id: "paeds", label: "Pediatrics", icon: Baby, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  { id: "ortho", label: "Orthopedics", icon: Bone, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
  { id: "ent", label: "ENT Care", icon: Ear, color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" },
  { id: "neuro", label: "Neuro & Spine Surgery", icon: Brain, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  { id: "uro", label: "Urosurgery", icon: Droplets, color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-200" },
  { id: "plastic", label: "Plastic Surgery", icon: Scissors, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
  { id: "paed-surg", label: "Pediatric Surgery", icon: Activity, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  { id: "critical", label: "Critical Care / ICU", icon: Heart, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
];

const DOCTORS: Record<string, { name: string; qual: string; exp: string; avail: string[] }[]> = {
  "gen-med": [{ name: "Dr. Ashish Dwivedi", qual: "MBBS, MD Medicine", exp: "10+ yrs", avail: ["Mon–Sat: 6:00 PM – 7:00 PM"] }],
  "gen-surg": [
    { name: "Dr. NS Chauhan", qual: "MBBS, MS Surgeon", exp: "35+ yrs", avail: ["Mon & Sun: 12:00 PM – 1:00 PM"] },
    { name: "Dr. Kuldeep", qual: "MBBS, MS Surgeon", exp: "10+ yrs", avail: ["Mon–Sat: 1:00 PM – 2:00 PM"] },
  ],
  "ob-gyn": [{ name: "Dr. Tripti Mishra", qual: "MBBS, MS OB/GYN", exp: "16+ yrs", avail: ["Mon–Fri: 11:00 AM – 1:00 PM", "Mon–Fri: 6:00 PM – 7:00 PM"] }],
  "paeds": [{ name: "Dr. Rohit Agrawal", qual: "MBBS, MD Pediatrics", exp: "16+ yrs", avail: ["Mon–Sun: 11:00 AM – 4:00 PM", "Mon–Sat: 8:00 PM – 9:00 PM"] }],
  "ortho": [{ name: "Dr. Vishal Setia", qual: "MBBS, D-Ortho", exp: "16+ yrs", avail: ["Mon–Sat: 1:00 PM – 2:00 PM"] }],
  "ent": [{ name: "Dr. Tripti Sengar", qual: "MBBS, DLO", exp: "16+ yrs", avail: ["Mon–Sat: 12:00 PM – 1:00 PM"] }],
  "neuro": [{ name: "Dr. SG Verma", qual: "MBBS, MS, MCH NeuroSurgery", exp: "12+ yrs", avail: ["By Appointment / On Call"] }],
  "uro": [{ name: "Dr. Manish Kumar", qual: "MBBS, MS, MCH Uro Surgery", exp: "14+ yrs", avail: ["By Appointment / On Call"] }],
  "plastic": [{ name: "Dr. Shushant Luthra", qual: "MBBS, MS, MCH Plastic Surgery", exp: "18+ yrs", avail: ["By Appointment / On Call"] }],
  "paed-surg": [{ name: "Dr. Rakesh Tripathi", qual: "MBBS, MS, MCH Pediatric Surgery", exp: "18+ yrs", avail: ["By Appointment / On Call"] }],
  "critical": [{ name: "Dedicated ICU Team", qual: "Multi-disciplinary Intensivists", exp: "24/7", avail: ["24 hours / 7 days"] }],
};

const TIME_SLOTS = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "05:00 PM", "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
];

const STEPS = ["Department", "Doctor", "Date & Time", "Your Details", "Review"];

/* ─── HELPERS ───────────────────────────────────────────────── */
function minDateStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function maxDateStr() {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().split("T")[0];
}

function formatDate(str: string) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

/* ─── STEP INDICATOR ────────────────────────────────────────── */
function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 w-full mb-10">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${done ? "bg-primary border-primary text-white shadow-md shadow-primary/30"
                  : active ? "bg-white border-primary text-primary shadow-md shadow-primary/20"
                    : "bg-gray-100 border-gray-200 text-gray-400"
                }`}>
                {done ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span className={`text-[10px] font-semibold mt-1.5 text-center leading-tight hidden sm:block ${active ? "text-primary" : done ? "text-primary/70" : "text-gray-400"
                }`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 transition-all duration-500 ${i < current ? "bg-primary" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─── FORM STATE ────────────────────────────────────────────── */
type FormData = {
  deptId: string;
  deptLabel: string;
  doctorName: string;
  doctorQual: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  email: string;
  reason: string;
  visitType: "in-person" | "teleconsult";
};

const EMPTY: FormData = {
  deptId: "", deptLabel: "", doctorName: "", doctorQual: "",
  date: "", timeSlot: "", name: "", phone: "", email: "",
  reason: "", visitType: "in-person",
};

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function BookAppointmentPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Reset doctor when dept changes
  useEffect(() => {
    setForm(f => ({ ...f, doctorName: "", doctorQual: "" }));
  }, [form.deptId]);

  const set = (field: keyof FormData, val: string) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  /* Validation per step */
  const validate = () => {
    const e: typeof errors = {};
    if (step === 0 && !form.deptId) e.deptId = "Please select a department.";
    if (step === 1 && !form.doctorName) e.doctorName = "Please select a doctor.";
    if (step === 2) {
      if (!form.date) e.date = "Please choose a date.";
      if (!form.timeSlot) e.timeSlot = "Please choose a time slot.";
    }
    if (step === 3) {
      if (!form.name.trim()) e.name = "Full name is required.";
      if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit mobile number.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const submit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  const dept = DEPARTMENTS.find(d => d.id === form.deptId);
  const doctors = form.deptId ? (DOCTORS[form.deptId] ?? []) : [];
  const selDoc = doctors.find(d => d.name === form.doctorName);

  /* ── SUCCESS SCREEN ── */
  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
          <div className="max-w-lg w-full text-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-[bounce_.6s_ease]">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Appointment Requested!
            </h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Thank you, <strong className="text-gray-800">{form.name}</strong>. We have received your request and will confirm your appointment via call within <strong className="text-primary">2 hours</strong> during business hours.
            </p>

            {/* Summary card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 text-left mb-8 space-y-3">
              {[
                { label: "Department", value: form.deptLabel },
                { label: "Doctor", value: form.doctorName },
                { label: "Date", value: formatDate(form.date) },
                { label: "Time", value: form.timeSlot },
                { label: "Visit Type", value: form.visitType === "in-person" ? "In-Person Visit" : "Teleconsult (Phone/Video)" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm gap-4">
                  <span className="text-gray-400 font-medium shrink-0">{label}</span>
                  <span className="font-semibold text-gray-800 text-right">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+919335605848" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all">
                <Phone size={15} /> Call to Confirm
              </a>
              <Link href="/" className="px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-hover transition-all shadow-md shadow-primary/25">
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">

        {/* ── Hero Banner ── */}
        <div className="bg-primary pt-24 pb-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-5 text-sm font-semibold">
              <CalendarHeart size={15} />
              Book Your Appointment Online
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Schedule a Consultation
            </h1>
            <p className="text-white/80 max-w-xl mx-auto text-base leading-relaxed">
              Choose your specialist, pick a convenient time, and let us take care of the rest. Confirmation within 2 hours.
            </p>
            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: Clock, text: "Confirmed within 2 hrs" },
                { icon: Award, text: "11 Super-Specialists" },
                { icon: MapPin, text: "Kidwai Nagar, Kanpur" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-white/80">
                  <Icon size={14} className="text-secondary" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Form Area ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-6 lg:gap-8 items-start">

            {/* FORM CARD */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-7 lg:p-10">
              <StepBar current={step} />

              {/* ── STEP 0: Department ── */}
              {step === 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Select Department</h2>
                  <p className="text-gray-500 text-sm mb-6">Which area of care are you looking for?</p>
                  {errors.deptId && <p className="text-red-500 text-xs mb-3 flex items-center gap-1"><AlertCircle size={12} />{errors.deptId}</p>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DEPARTMENTS.map(({ id, label, icon: Icon, color, bg, border }) => {
                      const active = form.deptId === id;
                      return (
                        <button key={id} onClick={() => { set("deptId", id); set("deptLabel", label); }}
                          className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 group ${active ? `${border} ${bg} shadow-md` : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white"
                            }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg} border ${border}`}>
                            <Icon size={18} className={color} />
                          </div>
                          <span className={`font-semibold text-sm leading-snug ${active ? "text-gray-900" : "text-gray-700"}`}>{label}</span>
                          {active && <CheckCircle2 size={16} className="text-primary ml-auto shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 1: Doctor ── */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Choose Your Doctor</h2>
                  <p className="text-gray-500 text-sm mb-6">
                    Available specialists in <span className="font-semibold text-primary">{form.deptLabel}</span>
                  </p>
                  {errors.doctorName && <p className="text-red-500 text-xs mb-3 flex items-center gap-1"><AlertCircle size={12} />{errors.doctorName}</p>}
                  <div className="flex flex-col gap-4">
                    {doctors.map((doc) => {
                      const active = form.doctorName === doc.name;
                      return (
                        <button key={doc.name} onClick={() => { set("doctorName", doc.name); set("doctorQual", doc.qual); }}
                          className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${active ? "border-primary bg-blue-50 shadow-md" : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white"
                            }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-bold text-sm text-white ${active ? "bg-primary" : "bg-gray-300"
                                }`}>
                                {doc.name.split(" ").map(w => w[0]).slice(1, 3).join("")}
                              </div>
                              <div>
                                <div className="font-bold text-gray-900">{doc.name}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{doc.qual}</div>
                                <div className="text-xs text-amber-600 font-semibold mt-1 flex items-center gap-1">
                                  <Award size={10} /> {doc.exp} Experience
                                </div>
                              </div>
                            </div>
                            {active && <CheckCircle2 size={18} className="text-primary shrink-0 mt-1" />}
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1.5">Availability</p>
                            {doc.avail.map(a => (
                              <div key={a} className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                                <Clock size={10} className="text-secondary shrink-0" /> {a}
                              </div>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Date & Time ── */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Pick a Date & Time</h2>
                  <p className="text-gray-500 text-sm mb-6">Choose your preferred appointment slot.</p>

                  {/* Visit Type toggle */}
                  <div className="flex gap-3 mb-6">
                    {(["in-person", "teleconsult"] as const).map(type => (
                      <button key={type} onClick={() => set("visitType", type)}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${form.visitType === type
                            ? "border-primary bg-blue-50 text-primary"
                            : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                          }`}
                      >
                        {type === "in-person" ? "🏥 In-Person Visit" : "📱 Teleconsult"}
                      </button>
                    ))}
                  </div>

                  {/* Date picker */}
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Preferred Date *</label>
                    <input type="date" value={form.date} min={minDateStr()} max={maxDateStr()}
                      onChange={e => set("date", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.date ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"
                        }`}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.date}</p>}
                    {form.date && <p className="text-primary text-xs mt-1 font-medium">{formatDate(form.date)}</p>}
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Preferred Time *</label>
                    {errors.timeSlot && <p className="text-red-500 text-xs mb-2 flex items-center gap-1"><AlertCircle size={11} />{errors.timeSlot}</p>}
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                      {TIME_SLOTS.map(slot => (
                        <button key={slot} onClick={() => set("timeSlot", slot)}
                          className={`py-2 px-1 rounded-xl text-xs font-semibold border-2 transition-all ${form.timeSlot === slot
                              ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                              : "border-gray-100 bg-gray-50 text-gray-600 hover:border-primary/40 hover:text-primary"
                            }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Personal Details ── */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Your Details</h2>
                  <p className="text-gray-500 text-sm mb-6">We'll use these to confirm your appointment.</p>
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input type="text" value={form.name} onChange={e => set("name", e.target.value)}
                          placeholder="Your full name"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"}`}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1.5">Mobile Number *</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"}`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email Address <span className="text-gray-400 font-normal">(optional)</span></label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    {/* Reason */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1.5">Reason / Symptoms <span className="text-gray-400 font-normal">(optional)</span></label>
                      <div className="relative">
                        <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                        <textarea value={form.reason} onChange={e => set("reason", e.target.value)}
                          rows={3} placeholder="Briefly describe your concern or symptoms…"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Review ── */}
              {step === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Review & Confirm</h2>
                  <p className="text-gray-500 text-sm mb-6">Please verify your details before submitting.</p>

                  <div className="bg-gray-50 rounded-2xl border border-gray-100 divide-y divide-gray-100 mb-6">
                    {[
                      { label: "Department", value: form.deptLabel, icon: Stethoscope },
                      { label: "Doctor", value: form.doctorName, icon: Award },
                      { label: "Date", value: formatDate(form.date), icon: CalendarHeart },
                      { label: "Time", value: form.timeSlot, icon: Clock },
                      { label: "Visit Type", value: form.visitType === "in-person" ? "In-Person Visit" : "Teleconsult (Phone/Video)", icon: MapPin },
                      { label: "Patient Name", value: form.name, icon: User },
                      { label: "Mobile", value: form.phone, icon: Phone },
                      ...(form.email ? [{ label: "Email", value: form.email, icon: Mail }] : []),
                      ...(form.reason ? [{ label: "Reason", value: form.reason, icon: MessageSquare }] : []),
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="flex items-start gap-3 p-4">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={13} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
                          <p className="text-sm font-semibold text-gray-800 mt-0.5 break-words">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-700 mb-6">
                    <AlertCircle size={13} className="shrink-0 mt-0.5" />
                    Our team will call you at <strong>{form.phone}</strong> within 2 hours to confirm your appointment slot.
                  </div>
                </div>
              )}

              {/* ── NAV BUTTONS ── */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                {step > 0 ? (
                  <button onClick={back}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft size={15} /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button onClick={next}
                    className="flex items-center gap-2 px-7 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5"
                  >
                    Continue <ChevronRight size={15} />
                  </button>
                ) : (
                  <button onClick={submit} disabled={loading}
                    className="flex items-center gap-2 px-7 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-wait"
                  >
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>
                    ) : (
                      <><CalendarHeart size={16} /> Confirm Appointment</>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* SIDEBAR — shown below form on mobile, sticky on desktop */}
            <div className="space-y-4 lg:sticky lg:top-28 order-last lg:order-none">

              {/* Emergency */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Emergency?</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">For urgent care, call us directly. We are available 24/7.</p>
                <a href="tel:+919335605848" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors">
                  <Phone size={14} /> +91 93356 05848
                </a>
              </div>

              {/* Why book with us */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-4">Why Book With Us?</h3>
                <div className="space-y-3">
                  {[
                    { text: "Confirmed within 2 hours", icon: Clock },
                    { text: "11 Super-Specialists available", icon: Award },
                    { text: "Ayushman Bharat / DDUS accepted", icon: CheckCircle2 },
                    { text: "24/7 Emergency care ready", icon: Heart },
                    { text: "In-person & Teleconsult options", icon: CalendarHeart },
                  ].map(({ text, icon: Icon }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={12} className="text-primary" />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <MapPin size={14} className="text-primary" /> Visit Us
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  128/1006, in front of Telephone Exchange,<br />
                  Y Block, Ghari Purva, Kidwai Nagar,<br />
                  Kanpur, UP – 208011
                </p>
                <a href="https://maps.google.com/?q=Lakshya+Hospital+Kanpur" target="_blank" rel="noreferrer"
                  className="mt-3 text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  Get Directions →
                </a>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
