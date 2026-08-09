"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import {
  CalendarHeart, User, Phone, Mail, MessageSquare,
  CheckCircle2, Clock, Award, Heart, MapPin, Stethoscope,
  AlertCircle, Baby, HeartPulse, Bone, Brain, Ear, Scissors,
  Droplets, ShieldPlus, Activity, ArrowRight, ArrowLeft
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

const DOCTORS: Record<string, { name: string; qual: string; exp: string; avail: string[]; slots: string[] }[]> = {
  "gen-med": [{ name: "Dr. Ashish Dwivedi", qual: "MBBS, MD Medicine", exp: "10+ yrs", avail: ["Mon–Sat: 6:00 PM – 7:00 PM"], slots: ["06:00 PM", "06:30 PM", "07:00 PM"] }],
  "gen-surg": [
    { name: "Dr. NS Chauhan", qual: "MBBS, MS Surgeon", exp: "35+ yrs", avail: ["Mon & Sun: 12:00 PM – 1:00 PM"], slots: ["12:00 PM", "12:30 PM", "01:00 PM"] },
    { name: "Dr. Kuldeep", qual: "MBBS, MS Surgeon", exp: "10+ yrs", avail: ["Mon–Sat: 1:00 PM – 2:00 PM"], slots: ["01:00 PM", "01:30 PM", "02:00 PM"] },
  ],
  "ob-gyn": [{ name: "Dr. Tripti Mishra", qual: "MBBS, MS OB/GYN", exp: "16+ yrs", avail: ["Mon–Fri: 11:00 AM – 1:00 PM", "Mon–Fri: 6:00 PM – 7:00 PM"], slots: ["11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "06:00 PM", "06:30 PM", "07:00 PM"] }],
  "paeds": [{ name: "Dr. Rohit Agrawal", qual: "MBBS, MD Pediatrics", exp: "16+ yrs", avail: ["Mon–Sun: 11:00 AM – 4:00 PM", "Mon–Sat: 8:00 PM – 9:00 PM"], slots: ["11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "08:00 PM", "08:30 PM", "09:00 PM"] }],
  "ortho": [{ name: "Dr. Vishal Sethiya", qual: "MBBS, D-Ortho", exp: "16+ yrs", avail: ["Mon–Sat: 1:00 PM – 2:00 PM"], slots: ["01:00 PM", "01:30 PM", "02:00 PM"] }],
  "ent": [{ name: "Dr. Tripti Sengar", qual: "MBBS, DLO", exp: "16+ yrs", avail: ["Mon–Sat: 12:00 PM – 1:00 PM"], slots: ["12:00 PM", "12:30 PM", "01:00 PM"] }],
  "neuro": [{ name: "Dr. SG Verma", qual: "MBBS, MS, MCH NeuroSurgery", exp: "12+ yrs", avail: ["By Appointment / On Call"], slots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"] }],
  "uro": [{ name: "Dr. Manish Kumar", qual: "MBBS, MS, MCH Uro Surgery", exp: "14+ yrs", avail: ["By Appointment / On Call"], slots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"] }],
  "plastic": [{ name: "Dr. Shushant Luthra", qual: "MBBS, MS, MCH Plastic Surgery", exp: "18+ yrs", avail: ["By Appointment / On Call"], slots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"] }],
  "paed-surg": [{ name: "Dr. Rakesh Tripathi", qual: "MBBS, MS, MCH Pediatric Surgery", exp: "18+ yrs", avail: ["By Appointment / On Call"], slots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"] }],
  "critical": [{ name: "Dedicated ICU Team", qual: "Multi-disciplinary Intensivists", exp: "24/7", avail: ["24 hours / 7 days"], slots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"] }],
};

const TIME_SLOTS = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "05:00 PM", "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
];

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
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  // Reset doctor when dept changes
  useEffect(() => {
    if (form.deptId) {
      setForm(f => ({ ...f, doctorName: "", doctorQual: "" }));
    }
  }, [form.deptId]);

  const validateField = (name: string, value: string) => {
    let errorMsg = "";
    if (name === "deptId" && !value) {
      errorMsg = "Please select a department.";
    } else if (name === "doctorName" && !value) {
      errorMsg = "Please select a doctor.";
    } else if (name === "date" && !value) {
      errorMsg = "Please pick a preferred date.";
    } else if (name === "timeSlot" && !value) {
      errorMsg = "Please pick a preferred time slot.";
    } else if (name === "name") {
      if (!value.trim()) {
        errorMsg = "Full name is required.";
      } else if (value.trim().length < 3) {
        errorMsg = "Name must be at least 3 characters.";
      }
    } else if (name === "phone") {
      const cleanPhone = value.replace(/\D/g, "");
      if (!cleanPhone) {
        errorMsg = "Mobile number is required.";
      } else if (cleanPhone.length !== 10) {
        errorMsg = "Please enter a valid 10-digit mobile number.";
      }
    }
    return errorMsg;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "phone") {
      finalValue = value.replace(/[^0-9]/g, ""); // restrict to digits only
      if (finalValue.length > 10) {
        finalValue = finalValue.slice(0, 10);
      }
    }

    setForm(f => ({ ...f, [name]: finalValue }));
    if (touched[name as keyof FormData]) {
      const errorMsg = validateField(name, finalValue);
      setErrors(errs => ({ ...errs, [name]: errorMsg }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors(errs => ({ ...errs, [name]: errorMsg }));
  };

  const selectDepartment = (id: string, label: string) => {
    setForm(f => ({ ...f, deptId: id, deptLabel: label, doctorName: "", doctorQual: "" }));
    setErrors(errs => ({ ...errs, deptId: "", doctorName: "" }));
    setTouched(t => ({ ...t, deptId: true }));
  };

  const selectDoctor = (name: string, qual: string) => {
    setForm(f => ({ ...f, doctorName: name, doctorQual: qual }));
    setErrors(errs => ({ ...errs, doctorName: "" }));
    setTouched(t => ({ ...t, doctorName: true }));
  };

  const selectTimeSlot = (slot: string) => {
    setForm(f => ({ ...f, timeSlot: slot }));
    setErrors(errs => ({ ...errs, timeSlot: "" }));
    setTouched(t => ({ ...t, timeSlot: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    // Mark all fields as touched
    const allTouched: typeof touched = {
      deptId: true,
      doctorName: true,
      date: true,
      timeSlot: true,
      name: true,
      phone: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    Object.keys(allTouched).forEach((key) => {
      const val = form[key as keyof FormData] || "";
      const errorMsg = validateField(key, val);
      if (errorMsg) {
        newErrors[key as keyof FormData] = errorMsg;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch("/api/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: "instant" });
        } else {
          setStatus({ type: "error", message: data.error || "Failed to submit booking request. Please check details." });
        }
      } catch (err) {
        console.error("Booking dispatch error:", err);
        setStatus({
          type: "error",
          message: "Unable to submit booking request due to a mail server configuration issue. Please contact us directly at info@lakshyahospital.com or call +91 93356 05848."
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Scroll to the first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0] || document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const doctors = form.deptId ? (DOCTORS[form.deptId] ?? []) : [];
  const selDoc = doctors.find(d => d.name === form.doctorName);

  /* ── SUCCESS SCREEN ── */
  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
          <div className="max-w-lg w-full text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto mb-6 animate-in zoom-in-50 duration-300">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3 font-display">
              Request Submitted!
            </h1>
            <p className="text-slate-500 mb-8 leading-relaxed text-sm">
              Thank you, <strong className="text-slate-800">{form.name}</strong>. We have received your request and will call you back within <strong className="text-primary">2 hours</strong> during clinic hours to confirm your final consultation slot.
            </p>

            {/* Summary card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 text-left mb-8 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Booking Summary</h4>
              {[
                { label: "Department", value: form.deptLabel },
                { label: "Doctor", value: form.doctorName },
                { label: "Date", value: formatDate(form.date) },
                { label: "Time Slot", value: form.timeSlot },
                { label: "Visit Type", value: form.visitType === "in-person" ? "In-Person Visit" : "Teleconsult" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm gap-4">
                  <span className="text-slate-400 font-medium shrink-0">{label}</span>
                  <span className="font-semibold text-slate-800 text-right">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+919335605848" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-primary text-primary font-semibold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-all">
                <Phone size={13} /> Call to Confirm
              </a>
              <Link href="/" className="px-6 py-3.5 rounded-full bg-primary text-white font-semibold text-xs uppercase tracking-wider hover:bg-primary-hover transition-all shadow-md shadow-primary/25">
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
      <main className="min-h-screen bg-slate-50/50">

        {/* ── Hero Banner ── */}
        <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 pt-28 pb-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4.5 py-1.5 mb-5 text-xs font-bold text-secondary">
              <CalendarHeart size={13} />
              Book Appointment
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-display">
              Schedule Your Consultation
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              No complex steps. Just pick your department, select a doctor, choose your preferred day, and enter your name to book.
            </p>
            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: Clock, text: "Confirmation in 2 Hrs" },
                { icon: Award, text: "Super-Specialists" },
                { icon: MapPin, text: "Kidwai Nagar, Kanpur" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-slate-300 font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                  <Icon size={12} className="text-secondary" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Form Area ── */}
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

            {/* FORM CARD */}
            <div className="lg:col-span-8 bg-white rounded-[36px] shadow-xl border border-slate-100 p-6 sm:p-10 relative overflow-hidden flex flex-col">
              {/* Cinematic Full-Page Loader Overlay */}
              {loading && (
                <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[9999] flex flex-col items-center justify-center animate-in fade-in duration-200">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden flex items-center justify-center bg-slate-900 border border-white/5 shadow-2xl">
                    <video
                      src="/Lakshya_Hospital_logo_reveal.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold text-white mt-5 tracking-widest uppercase animate-pulse">Requesting Slot...</p>
                  <p className="text-[10px] text-slate-400 mt-1">Booking clinical consultation desk...</p>
                </div>
              )}

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors mb-6 group cursor-pointer"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Home</span>
              </Link>

              <div className="border-b border-slate-100 pb-5 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 font-display">Appointment Form</h2>
                <p className="text-slate-400 text-sm mt-1">Please fill in the options below to schedule a time slot.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-8 text-left flex-1 flex flex-col">

                {/* ── SECTION 1: Choose Care ── */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-display">1</span>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Select Specialty Department</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Department Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Select Department *</label>
                      <select
                        name="deptId"
                        id="deptId"
                        value={form.deptId}
                        onChange={(e) => {
                          const dept = DEPARTMENTS.find(d => d.id === e.target.value);
                          selectDepartment(e.target.value, dept ? dept.label : "");
                        }}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white cursor-pointer ${errors.deptId && touched.deptId ? "border-red-500" : "border-slate-200"
                          }`}
                      >
                        <option value="">-- Choose Department --</option>
                        {DEPARTMENTS.map(d => (
                          <option key={d.id} value={d.id}>{d.label}</option>
                        ))}
                      </select>
                      {errors.deptId && touched.deptId && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {errors.deptId}</p>
                      )}
                    </div>

                    {/* Doctor Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Choose Specialist Doctor *</label>
                      <select
                        name="doctorName"
                        id="doctorName"
                        value={form.doctorName}
                        onChange={(e) => {
                          const doc = doctors.find(d => d.name === e.target.value);
                          selectDoctor(e.target.value, doc ? doc.qual : "");
                        }}
                        onBlur={handleBlur}
                        disabled={!form.deptId}
                        className={`w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${errors.doctorName && touched.doctorName ? "border-red-500" : "border-slate-200"
                          }`}
                      >
                        <option value="">
                          {!form.deptId ? "Select department first" : "-- Choose Doctor --"}
                        </option>
                        {doctors.map(doc => (
                          <option key={doc.name} value={doc.name}>
                            {doc.name} ({doc.qual})
                          </option>
                        ))}
                      </select>
                      {errors.doctorName && touched.doctorName && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {errors.doctorName}</p>
                      )}
                    </div>
                  </div>

                  {/* Doctor Availability details block */}
                  {form.doctorName && selDoc && (
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex flex-col gap-2 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2">
                        <Award size={14} className="text-primary" />
                        <span className="text-xs font-bold text-slate-800">About {selDoc.name} ({selDoc.qual})</span>
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ml-auto">{selDoc.exp} Experience</span>
                      </div>
                      <div className="pt-2 border-t border-indigo-100/50 flex flex-col gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Weekly Availability Timings:</span>
                        {selDoc.avail.map(a => (
                          <div key={a} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                            <Clock size={11} className="text-secondary shrink-0" /> {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── SECTION 2: Preferred Schedule ── */}
                <div className="space-y-5 pt-2">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-display">2</span>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Select Preferred Schedule</h3>
                  </div>

                  {/* Visit Type Toggle */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">Consultation Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      {(["in-person", "teleconsult"] as const).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, visitType: type }))}
                          className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${form.visitType === type
                              ? "border-primary bg-blue-50/80 text-primary shadow-sm"
                              : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"
                            }`}
                        >
                          {type === "in-person" ? "🏥 In-Person Hospital Visit" : "📱 Phone/Video Teleconsult"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Preferred Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 block">Choose Date *</label>
                      <div
                        className="relative cursor-pointer"
                        onClick={(e) => {
                          const input = e.currentTarget.querySelector('input');
                          if (input) {
                            try { input.showPicker(); } catch (err) { }
                          }
                        }}
                      >
                        <CalendarHeart size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={form.date}
                          min={minDateStr()}
                          max={maxDateStr()}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onClick={(e) => {
                            e.stopPropagation(); // prevent double click
                            try { e.currentTarget.showPicker(); } catch (err) { }
                          }}
                          className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer ${errors.date && touched.date ? "border-red-500" : "border-slate-200"
                            }`}
                        />
                      </div>
                      {errors.date && touched.date ? (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {errors.date}</p>
                      ) : (
                        form.date && <p className="text-primary text-xs mt-1 font-semibold">{formatDate(form.date)}</p>
                      )}
                    </div>

                    {/* Preferred Time */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 block">Select Time Slot *</label>
                      <div className="border border-slate-200 rounded-xl bg-slate-50 p-3 max-h-[160px] overflow-y-auto grid grid-cols-3 gap-2">
                        {form.doctorName && selDoc ? (
                          (selDoc.slots || []).map(slot => {
                            const active = form.timeSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => selectTimeSlot(slot)}
                                className={`py-2 px-1.5 rounded-lg text-xs font-bold border transition-all ${active
                                    ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary"
                                  }`}
                              >
                                {slot}
                              </button>
                            );
                          })
                        ) : (
                          <div className="col-span-3 text-center py-6 text-xs font-semibold text-slate-400">
                            Please select a doctor to view slots.
                          </div>
                        )}
                      </div>
                      {errors.timeSlot && touched.timeSlot && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {errors.timeSlot}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── SECTION 3: Patient Info ── */}
                <div className="space-y-5 pt-2">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-display">3</span>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Patient Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Patient Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Full Name *</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter patient's name"
                          className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white ${errors.name && touched.name ? "border-red-500" : "border-slate-200"
                            }`}
                        />
                      </div>
                      {errors.name && touched.name && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Mobile Number *</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={form.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="10-digit mobile number"
                          className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white ${errors.phone && touched.phone ? "border-red-500" : "border-slate-200"
                            }`}
                        />
                      </div>
                      {errors.phone && touched.phone && (
                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Email address */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Email Address <span className="text-slate-400 font-normal">(Optional)</span></label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="patient@example.com"
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    {/* Symptoms/Reason */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Brief Symptoms <span className="text-slate-400 font-normal">(Optional)</span></label>
                      <div className="relative">
                        <MessageSquare size={14} className="absolute left-3.5 top-4 text-slate-400" />
                        <textarea
                          name="reason"
                          id="reason"
                          value={form.reason}
                          onChange={handleChange}
                          rows={1}
                          placeholder="e.g. child vaccination, general fever, stomach pain"
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                  {status.message && (
                    <div className={`p-4 rounded-2xl text-xs font-bold animate-in fade-in duration-200 ${status.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}>
                      <p className="flex items-center gap-1.5">
                        <AlertCircle size={13} className="shrink-0" />
                        {status.message}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => window.history.back()} className="hidden sm:inline-flex px-6 py-4 rounded-2xl border border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all">Back</button>
                    <button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CalendarHeart size={16} /> Confirm Consultation Request
                    </button>
                  </div>

                  <div className="flex items-start gap-2 p-3.5 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-700">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>Our customer desk will verify and call you back at <strong>{form.phone || "[your mobile number]"}</strong> within 2 hours to confirm your slot appointment.</span>
                  </div>
                </div>

              </form>
            </div>

            {/* SIDEBAR — shown below form on mobile, sticky on desktop */}
            <div className="lg:col-span-4 space-y-6 flex flex-col justify-start">

              {/* Emergency */}
              <div className="bg-red-50 border border-red-100 rounded-[32px] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Emergency Center?</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">Direct Hospital Hotline</h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">For extreme emergency, cardiac arrest, infant critical distress, or ambulance, call directly. Available 24/7.</p>
                <a href="tel:+919335605848" className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-md shadow-red-200">
                  <Phone size={14} /> +91 93356 05848
                </a>
              </div>

              {/* WhatsApp Booking Card */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-[32px] p-6 shadow-sm flex flex-col gap-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-emerald-850 uppercase tracking-wider">Fast Booking</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 -mt-1">Direct WhatsApp Booking</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Prefer chatting on WhatsApp? Message our hospital desk directly to schedule your appointment request instantly.</p>
                <a
                  href="https://wa.me/919335605848?text=Hello%20Lakshya%20Hospital,%20I%20would%20like%20to%20book%20an%20appointment."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors shadow-md shadow-emerald-100 cursor-pointer"
                >
                  Chat on WhatsApp
                </a>
              </div>

              {/* Why book with us */}
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 text-sm mb-4 border-b border-slate-100 pb-2">Why Book With Us?</h3>
                <div className="space-y-4">
                  {[
                    { text: "Confirmed within 2 hours", icon: Clock },
                    { text: "11 Super-Specialists available", icon: Award },
                    { text: "Ayushman Bharat / DDUS accepted", icon: CheckCircle2 },
                    { text: "24/7 Emergency care ready", icon: Heart },
                    { text: "In-person & Teleconsult options", icon: CalendarHeart },
                  ].map(({ text, icon: Icon }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-primary" />
                      </div>
                      <span className="text-xs text-slate-600 font-semibold">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <MapPin size={14} className="text-primary" /> Clinic Campus Location
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  128/1006, in front of Telephone Exchange,<br />
                  Y Block, Ghari Purva, Kidwai Nagar,<br />
                  Kanpur, UP – 208011
                </p>
                <a href="https://maps.google.com/?q=Lakshya+Hospital+Kanpur" target="_blank" rel="noreferrer"
                  className="mt-3 text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  Get Directions <ArrowRight className="w-3.5 h-3.5" />
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
