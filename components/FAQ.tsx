"use client";
import React, { useState } from "react";
import Script from "next/script";
import { Plus, Minus, HelpCircle, Heart } from "lucide-react";

/* ─── FAQ DATA ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: "What are Lakshya Hospital's working hours?",
    a: "Lakshya Hospital is open 24 hours a day, 7 days a week, 365 days a year. Our Emergency & Trauma department, ICU, and NICU never close. OPD timings are Monday to Saturday, 8:00 AM to 8:00 PM. You can walk in any time for emergency care.",
  },
  {
    q: "How do I book an appointment with a specialist doctor?",
    a: "You can book an appointment in three easy ways: (1) Call us at +91 93356 05848, (2) Visit our Contact page and fill out the appointment form, or (3) Walk into the hospital reception directly. We typically confirm appointments within 2 hours during business hours.",
  },
  {
    q: "Does Lakshya Hospital accept Ayushman Bharat and government health schemes?",
    a: "Yes. Lakshya Hospital is empanelled under the Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PM-JAY) and the DDUS scheme. Eligible patients can receive cashless treatment across a wide range of procedures. Please bring your Ayushman card to the billing counter for verification.",
  },
  {
    q: "What specialities and departments does Lakshya Hospital offer?",
    a: "Lakshya Hospital is a multi-super-speciality facility covering 12+ departments including General Medicine, General Surgery, Obstetrics & Gynaecology, Paediatrics & Neonatology, Orthopaedics, ENT, Neurology & Spine, Critical Care (ICU/NICU), Ophthalmology, Oncology, Pathology, and Radiology (Ultrasound & X-Ray).",
  },
  {
    q: "Is there an emergency ambulance service available?",
    a: "Yes. Lakshya Hospital provides 24/7 ambulance services equipped with Advanced Life Support (ALS) equipment and trained paramedics. Call our emergency helpline at +91 93356 05848 immediately for ambulance dispatch. Response times within Kanpur city are typically under 15 minutes.",
  },
  {
    q: "Does the hospital have an ICU and NICU facility?",
    a: "Yes. We have a fully equipped adult ICU with round-the-clock intensivist supervision and a dedicated NICU (Neonatal Intensive Care Unit) for premature and critically ill newborns. Both units are staffed 24/7 by experienced specialists and trained nursing staff.",
  },
  {
    q: "What diagnostic facilities are available on-site?",
    a: "Lakshya Hospital has a fully equipped in-house diagnostic centre offering pathology & laboratory services, digital X-ray, ultrasound (USG), ECG, echocardiography, and other specialised tests — all available around the clock. Most routine reports are delivered within 4–6 hours.",
  },
  {
    q: "Where is Lakshya Hospital located and is parking available?",
    a: "Lakshya Hospital is located at 128/1006, Y Block, Kidwai Nagar, Kanpur, Uttar Pradesh – 208011. Free parking is available on the hospital premises for patients and visitors. The hospital is easily accessible by auto, cab, and public transport from all major areas of Kanpur.",
  },
  {
    q: "Does Lakshya Hospital handle high-risk pregnancies and C-section deliveries?",
    a: "Absolutely. Our Obstetrics & Gynaecology department, led by experienced obstetricians, handles all categories of pregnancies including high-risk cases. We are fully equipped for normal deliveries, C-sections, laparoscopic surgeries, and neonatal emergencies — with a dedicated NICU immediately adjacent to the labour room.",
  },
  {
    q: "How experienced are the doctors at Lakshya Hospital?",
    a: "Lakshya Hospital has a team of 11 super-specialists spanning 12 departments, with a combined clinical experience of over 100 years. All our doctors are qualified from leading medical institutions across India and are registered with the Medical Council of India (MCI). Many hold post-graduate degrees (MD/MS/MCh/DM) from premier institutes like AIIMS, CMC Vellore, and JIPMER.",
  },
];

/* ─── JSON-LD SCHEMA DATA ───────────────────────────────────── */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": a,
    },
  })),
};

/* ─── SINGLE ACCORDION ITEM ─────────────────────────────────── */
function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: typeof FAQS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-primary/30 bg-white shadow-md shadow-primary/8"
          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          {/* Number badge */}
          <span
            className={`shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
              isOpen
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-semibold text-sm sm:text-base leading-snug transition-colors ${
              isOpen ? "text-primary" : "text-gray-800 group-hover:text-primary"
            }`}
          >
            {faq.q}
          </span>
        </div>

        {/* Icon */}
        <span
          className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
            isOpen
              ? "bg-primary border-primary text-white rotate-0"
              : "bg-white border-gray-200 text-gray-400 group-hover:border-primary/40 group-hover:text-primary"
          }`}
        >
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>

      {/* Answer — animated expand */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-500 text-sm leading-relaxed pl-[4.25rem]">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first one open by default

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const col1 = FAQS.slice(0, Math.ceil(FAQS.length / 2));
  const col2 = FAQS.slice(Math.ceil(FAQS.length / 2));

  return (
    <>
      {/* ── JSON-LD FAQ Schema for Google Rich Snippets ── */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        strategy="afterInteractive"
      />

      <section id="faq" className="py-8 md:py-14 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section Header ── */}
          <div className="text-center mb-6 md:mb-12">
            <p className="text-secondary font-bold tracking-wider text-xs uppercase mb-3 flex items-center justify-center gap-2">
              <HelpCircle size={13} /> Frequently Asked Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Questions <span className="text-primary">Answered</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-[1px] bg-gray-300" />
              <Heart className="w-3 h-3 text-primary fill-primary" />
              <div className="w-8 h-[1px] bg-gray-300" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
              Everything you need to know about visiting Lakshya Hospital — from appointments and timings to insurance and specialities.
            </p>
          </div>

          {/* ── Two-column accordion ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              {col1.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              {col2.map((faq, i) => {
                const globalIndex = i + col1.length;
                return (
                  <FAQItem
                    key={globalIndex}
                    faq={faq}
                    index={globalIndex}
                    isOpen={openIndex === globalIndex}
                    onToggle={() => toggle(globalIndex)}
                  />
                );
              })}
            </div>

          </div>

          {/* ── Bottom CTA strip ── */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-cyan-50 border border-blue-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                Still have questions?
              </h3>
              <p className="text-gray-500 text-sm">
                Our patient care team is available around the clock to help you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="tel:+919335605848"
                className="px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-300"
              >
                📞 Call Us Now
              </a>
              <a
                href="/contact"
                className="px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5"
              >
                Send a Message
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
