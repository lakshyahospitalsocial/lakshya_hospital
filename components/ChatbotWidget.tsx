"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare, X, Send, Clock, Award, MapPin, Phone,
  Shield, HeartPulse, Sparkles, AlertCircle, Bot
} from "lucide-react";
import Link from "next/link";

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/* ─── DATA ──────────────────────────────────────────────────── */
const DEPARTMENTS = [
  { id: "gen-med", label: "General Medicine" },
  { id: "gen-surg", label: "General Surgery" },
  { id: "ob-gyn", label: "Obstetrics & Gynecology" },
  { id: "paeds", label: "Pediatrics" },
  { id: "ortho", label: "Orthopedics" },
  { id: "ent", label: "ENT Care" },
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
};

type Message = {
  sender: "user" | "bot";
  text: string;
  time: string;
  link?: string;
  linkText?: string;
};

type BookingSession = {
  active: boolean;
  step: "dept" | "doc" | "name" | "phone" | "date" | "slot" | "confirming";
  deptId?: string;
  deptLabel?: string;
  doctorName?: string;
  doctorQual?: string;
  name?: string;
  phone?: string;
  date?: string;
  timeSlot?: string;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [booking, setBooking] = useState<BookingSession>({ active: false, step: "dept" });
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Hello! Welcome to Lakshya Hospital support desk. How can we assist you today? You can ask me any question or choose an option below to start booking directly.",
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      }
    ]);

    // Auto hide tooltip after 8 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const addBotMessage = (text: string, link?: string, linkText?: string) => {
    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { sender: "bot", text, time, link, linkText }]);
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userTime = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { sender: "user", text: textToSend, time: userTime }]);
    setInput("");

    // Route input to the booking state machine if active
    if (booking.active) {
      setTimeout(() => {
        handleBookingFlow(textToSend);
      }, 700);
      return;
    }

    // Default conversational keyword matcher
    setTimeout(() => {
      const lower = textToSend.toLowerCase();

      if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule") || lower.includes("consult")) {
        startBookingFlow();
        return;
      }

      if (lower.includes("location") || lower.includes("address") || lower.includes("where") || lower.includes("map") || lower.includes("direction")) {
        addBotMessage(
          "Lakshya Hospital is located at 128/1006, Y Block, Kidwai Nagar, Kanpur, Uttar Pradesh 208011 (directly in front of the Telephone Exchange).",
          "https://maps.google.com/?q=Lakshya+Hospital+Kanpur",
          "Get Directions on Google Maps"
        );
        return;
      }

      if (lower.includes("insurance") || lower.includes("ayushman") || lower.includes("cashless") || lower.includes("ddus") || lower.includes("card")) {
        addBotMessage("Yes! We accept Ayushman Bharat (PM-JAY) and DDUS (State Government Employees & Pensioners card) for cashless treatments. We also support major private insurance TPAs.");
        return;
      }

      if (lower.includes("contact") || lower.includes("phone") || lower.includes("call") || lower.includes("helpline") || lower.includes("number")) {
        addBotMessage("Our 24/7 Helpline is +91 93356 05848. You can also reach our hospital desk via email at info@lakshyahospital.com.");
        return;
      }

      if (lower.includes("pediatric") || lower.includes("child") || lower.includes("baby") || lower.includes("newborn") || lower.includes("rohit")) {
        addBotMessage("Dr. Rohit Agrawal (Founder, MBBS MD Pediatrics) is our chief pediatrician (16+ yrs experience). Timings:\n• Mon–Sun: 11:00 AM – 4:00 PM\n• Mon–Sat: 08:00 PM – 09:00 PM");
        return;
      }

      if (lower.includes("gynecology") || lower.includes("gynae") || lower.includes("tripti") || lower.includes("pregnancy") || lower.includes("delivery") || lower.includes("women")) {
        addBotMessage("Dr. Tripti Mishra (Co-Founder, MBBS MS OB/GYN) is our chief gynecologist and safe delivery expert. Timings:\n• Mon–Fri: 11:00 AM – 01:00 PM\n• Mon–Fri: 06:00 PM – 07:00 PM");
        return;
      }

      // Default reply
      addBotMessage("Thank you for reaching out! For slot booking, please type 'Book' or click '🏥 Book Appointment' below. For direct WhatsApp help, click the WhatsApp button in the header!");
    }, 700);
  };

  /* ──── CONVERSATIONAL BOOKING FLOW ──── */
  const startBookingFlow = () => {
    setBooking({ active: true, step: "dept" });
    addBotMessage("To whom would you like to book a consultation? Please select a clinical department below:");
  };

  const handleBookingFlow = async (text: string) => {
    const step = booking.step;

    // 1. Department Selection
    if (step === "dept") {
      const matchedDept = DEPARTMENTS.find(d => d.label.toLowerCase() === text.toLowerCase() || d.id === text);
      if (!matchedDept) {
        addBotMessage("I didn't recognize that department. Please choose one of the departments listed below:");
        return;
      }

      const docs = DOCTORS[matchedDept.id] || [];
      if (docs.length === 0) {
        addBotMessage(`Currently no doctors are listed for ${matchedDept.label}. Please pick another department.`);
        return;
      }

      // Set booking info and move to select doc
      if (docs.length === 1) {
        const doc = docs[0];
        setBooking(prev => ({
          ...prev,
          step: "name",
          deptId: matchedDept.id,
          deptLabel: matchedDept.label,
          doctorName: doc.name,
          doctorQual: doc.qual
        }));
        addBotMessage(`You have chosen ${matchedDept.label}. The specialist is ${doc.name} (${doc.qual}).\n\nTo start booking, please enter the patient's Full Name:`);
      } else {
        setBooking(prev => ({
          ...prev,
          step: "doc",
          deptId: matchedDept.id,
          deptLabel: matchedDept.label
        }));
        addBotMessage(`Under ${matchedDept.label}, please select your doctor:`);
      }
      return;
    }

    // 2. Doctor Selection
    if (step === "doc") {
      const docs = DOCTORS[booking.deptId!] || [];
      const matchedDoc = docs.find(d => d.name.toLowerCase().includes(text.toLowerCase()));
      if (!matchedDoc) {
        addBotMessage(`Please choose one of the doctors listed below:`);
        return;
      }

      setBooking(prev => ({
        ...prev,
        step: "name",
        doctorName: matchedDoc.name,
        doctorQual: matchedDoc.qual
      }));
      addBotMessage(`Selected ${matchedDoc.name} (${matchedDoc.qual}).\n\nPlease enter the patient's Full Name:`);
      return;
    }

    // 3. Name Selection
    if (step === "name") {
      const cleanName = text.trim();
      if (cleanName.length < 3) {
        addBotMessage("Please enter a valid patient name (minimum 3 characters):");
        return;
      }

      setBooking(prev => ({ ...prev, step: "phone", name: cleanName }));
      addBotMessage(`Thank you, ${cleanName}. Now please enter your 10-digit Mobile Number:`);
      return;
    }

    // 4. Phone Selection
    if (step === "phone") {
      const cleanPhone = text.replace(/\D/g, "");
      if (cleanPhone.length !== 10) {
        addBotMessage("Please enter a valid 10-digit mobile number (e.g. 9335605848):");
        return;
      }

      setBooking(prev => ({ ...prev, step: "date", phone: cleanPhone }));
      addBotMessage("Got it. Please select your preferred Date (Tomorrow, Day After, or enter YYYY-MM-DD):");
      return;
    }

    // 5. Date Selection
    if (step === "date") {
      let dateValue = text.trim();
      const today = new Date();

      if (dateValue.toLowerCase() === "tomorrow") {
        today.setDate(today.getDate() + 1);
        dateValue = today.toISOString().split("T")[0];
      } else if (dateValue.toLowerCase() === "day after") {
        today.setDate(today.getDate() + 2);
        dateValue = today.toISOString().split("T")[0];
      }

      const timestamp = Date.parse(dateValue);
      if (isNaN(timestamp)) {
        addBotMessage("Please specify a valid date (e.g. Tomorrow, Day After, or 2026-08-15):");
        return;
      }

      const formatted = new Date(dateValue).toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric"
      });

      setBooking(prev => ({ ...prev, step: "slot", date: dateValue }));
      addBotMessage(`Selected Date: ${formatted}. Finally, select one of the available Time Slots for this doctor:`);
      return;
    }

    // 6. Slot Selection
    if (step === "slot") {
      const docs = DOCTORS[booking.deptId!] || [];
      const doc = docs.find(d => d.name === booking.doctorName);
      const slots = doc ? doc.slots : [];

      const matchedSlot = slots.find(s => s.toLowerCase() === text.toLowerCase());
      if (!matchedSlot) {
        addBotMessage("Please choose one of the available time slots listed below:");
        return;
      }

      const finalBooking = {
        ...booking,
        step: "confirming" as const,
        timeSlot: matchedSlot
      };
      setBooking(finalBooking);

      const formatted = new Date(booking.date!).toLocaleDateString("en-IN", {
        weekday: "long",
        month: "long",
        day: "numeric"
      });

      addBotMessage(
        `Please confirm your booking details:\n` +
        `• Patient: ${booking.name}\n` +
        `• Doctor: ${booking.doctorName}\n` +
        `• Date: ${formatted}\n` +
        `• Time Slot: ${matchedSlot}\n` +
        `• Mobile: ${booking.phone}\n\n` +
        `Click 'Confirm Appointment' or type 'Confirm' to submit.`
      );
      return;
    }

    // 7. Confirm Submission
    if (step === "confirming") {
      if (text.toLowerCase() === "confirm" || text.toLowerCase() === "confirm appointment") {
        addBotMessage("Submitting your request. Please wait...");

        try {
          const res = await fetch("/api/appointment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              deptLabel: booking.deptLabel,
              doctorName: booking.doctorName,
              doctorQual: booking.doctorQual,
              date: booking.date,
              timeSlot: booking.timeSlot,
              name: booking.name,
              phone: booking.phone,
              visitType: "in-person"
            })
          });

          if (res.ok) {
            addBotMessage(
              `Booking Request Sent! 🎉\n\n` +
              `Thank you, ${booking.name}. We have dispatched a confirmation email to our admissions desk. ` +
              `Our support team will call you back at ${booking.phone} within 2 hours to confirm your slot.`
            );
          } else {
            addBotMessage("Unable to submit booking automatically. Please call us at +91 93356 05848 or book via WhatsApp.");
          }
        } catch (err) {
          console.error("Chatbot booking submit error:", err);
          addBotMessage("Unable to connect to the booking server. Please call us at +91 93356 05848 or click WhatsApp in the header.");
        } finally {
          setBooking({ active: false, step: "dept" });
        }
      } else {
        addBotMessage("Booking cancelled. Let me know if you want to restart or ask anything else!");
        setBooking({ active: false, step: "dept" });
      }
    }
  };

  /* Get the chips to display dynamically at the bottom */
  const getBottomChips = () => {
    if (!booking.active) {
      return QUICK_RESPONSES;
    }

    if (booking.step === "dept") {
      return DEPARTMENTS.map(d => ({ label: d.label, value: d.id }));
    }

    if (booking.step === "doc") {
      const docs = DOCTORS[booking.deptId!] || [];
      return docs.map(d => ({ label: d.name, value: d.name }));
    }

    if (booking.step === "date") {
      return [
        { label: "Tomorrow", value: "tomorrow" },
        { label: "Day After", value: "day after" }
      ];
    }

    if (booking.step === "slot") {
      const docs = DOCTORS[booking.deptId!] || [];
      const doc = docs.find(d => d.name === booking.doctorName);
      return doc ? doc.slots.map(s => ({ label: s, value: s })) : [];
    }

    if (booking.step === "confirming") {
      return [
        { label: "Confirm Appointment", value: "confirm" },
        { label: "Cancel", value: "cancel" }
      ];
    }

    return [];
  };

  const QUICK_RESPONSES = [
    { label: "🏥 Book Appointment", value: "book" },
    { label: "📞 Contact Helpline", value: "contact" }
  ];

  const chips = getBottomChips();

  return (
    <>
      {/* ── Attracting Tooltip Banner next to button ── */}
      {showTooltip && !isOpen && (
        <div
          onClick={() => {
            setIsOpen(true);
            setShowTooltip(false);
          }}
          className="fixed bottom-7 right-24 z-50 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold border border-indigo-500/20 flex items-center gap-2 animate-bounce cursor-pointer group"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Need any help? Book here! ✨</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="ml-1 p-0.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* ── Chatbot Floating Button (Logo as trigger with breathing pulse ring) ── */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:shadow-primary/35 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-slate-100 p-0.5 ${!isOpen ? "ring-4 ring-primary/20 animate-pulse" : ""
          }`}
        aria-label="Open support chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-800 animate-in spin-in-90 duration-200" />
        ) : (
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-0.5">
            <img src="/logo.png" className="w-[140%] h-[140%] max-w-none object-contain" alt="Lakshya Hospital Logo" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* ── Chat window ── */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-[92vw] max-w-[380px] h-[500px] bg-white/95 backdrop-blur-md rounded-3xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-12 fade-in duration-300">

          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 to-indigo-950 p-4 border-b border-indigo-900/40 flex items-center gap-3">
            {/* Logo on Circle inside Header */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-0.5 shadow-sm border border-white/10 shrink-0 overflow-hidden">
              <img src="/logo.png" className="w-[140%] h-[140%] max-w-none object-contain rounded-full" alt="Lakshya Hospital Logo" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Lakshya Hospital</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Online Support</span>
              </div>
            </div>

            {/* WhatsApp Icon on Header */}
            <a
              href="https://wa.me/919335605848?text=Hello%20Lakshya%20Hospital,%20I%20would%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md transition-colors ml-auto cursor-pointer"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-4.5 h-4.5" />
            </a>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {/* WhatsApp Direct Redirection Card */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 flex items-start gap-3 shadow-sm animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
                <WhatsAppIcon className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-tight">Direct WhatsApp Booking</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Book slots instantly by chatting with our care team on WhatsApp.</p>
                <a
                  href="https://wa.me/919335605848?text=Hello%20Lakshya%20Hospital,%20I%20would%20like%20to%20book%20an%20appointment."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm shadow-emerald-200 cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Render message loops */}
            {messages.map((m, idx) => {
              const isBot = m.sender === "bot";
              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className="max-w-[75%] flex flex-col">
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed ${isBot
                      ? "bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm shadow-indigo-100/10"
                      : "bg-primary text-white rounded-tr-none shadow-sm"
                      }`}>
                      <p className="white-space-pre-wrap">{m.text}</p>

                      {/* Sub-link helper button */}
                      {m.link && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100/60">
                          {m.link.startsWith("http") ? (
                            <a
                              href={m.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:underline"
                            >
                              {m.linkText || "View Link"} <Sparkles className="w-3 h-3 text-secondary" />
                            </a>
                          ) : (
                            <Link
                              href={m.link}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:underline"
                            >
                              {m.linkText || "View Link"} <Sparkles className="w-3 h-3 text-secondary" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                    <span className={`text-[9px] text-slate-400 mt-1 ${!isBot ? "text-right" : ""}`}>
                      {m.time}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick response chips (dynamic based on booking state) */}
          <div className="p-3 border-t border-slate-150/40 bg-slate-50 flex gap-1.5 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden">
            {chips.map(qr => (
              <button
                key={qr.value}
                onClick={() => {
                  if (booking.active) {
                    handleSend(qr.label);
                  } else {
                    handleSend(qr.label.replace(/^[^\s]+\s/, ""));
                  }
                }}
                className="shrink-0 bg-white hover:bg-blue-50 border border-slate-200 hover:border-primary/45 rounded-full px-3 py-1.5 text-[10px] font-semibold text-slate-600 hover:text-primary transition-colors cursor-pointer animate-in zoom-in-95 duration-100"
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Bottom input area */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend(input)}
              placeholder="Ask anything or book consultation..."
              className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-slate-50/50 focus:bg-white transition-all"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-primary hover:bg-primary-hover text-white flex items-center justify-center shrink-0 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
