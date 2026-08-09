"use client";
import React, { useState } from "react";
import Script from "next/script";
import { Plus, Minus, HelpCircle, Heart } from "lucide-react";

/* ─── FAQ DATA ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Where is Lakshya Hospital located and is it accessible from Naubasta and Barra?",
    a: "Lakshya Hospital is located at 128/1006, Y Block, Kidwai Nagar, Kanpur, Uttar Pradesh – 208011. As a premier healthcare provider in South Kanpur, our facility is easily accessible to patients visiting from Naubasta, Barra, Yashoda Nagar, and across Kanpur. We offer free on-site parking and 24/7 access.",
  },
  {
    q: "Why is Lakshya Hospital known as the best multi-speciality hospital in South Kanpur?",
    a: "Lakshya Hospital is a leading multi-speciality hospital in Kanpur, featuring 12+ advanced departments under one roof. We offer comprehensive medical care including General Medicine, General Surgery, Obstetrics & Gynaecology (Gynae), Paediatrics (Child Care), Orthopaedics, Neuro & Spine Surgery, Urology, Plastic Surgery, Pediatric Surgery, and 24/7 Critical Care (ICU/NICU).",
  },
  {
    q: "Who is the best pediatrician for child care and newborn treatment in Kidwai Nagar, Kanpur?",
    a: "Our Pediatrics & Child Care department is led by Dr. Rohit Agrawal, a highly experienced pediatrician and newborn specialist in Kidwai Nagar, South Kanpur. We provide round-the-clock emergency child care, child vaccinations, growth monitoring, and advanced neonatal care in our state-of-the-art Neonatal Intensive Care Unit (NICU).",
  },
  {
    q: "Which doctor is recommended for pregnancy delivery and gynae surgeries near Barra and Naubasta?",
    a: "Dr. Tripti Mishra, our co-founder and Senior Obstetrician & Gynecologist, is highly recommended for pregnancy delivery and gynae care near Barra and Naubasta. Our department is fully equipped for normal delivery, painless delivery, C-section delivery, laparoscopic gynae surgeries, and manages high-risk pregnancies with an adjacent NICU.",
  },
  {
    q: "Does Lakshya Hospital accept Ayushman Bharat for cashless treatment in Kanpur?",
    a: "Yes. Lakshya Hospital is empanelled under the Ayushman Bharat – PM-JAY and the DDUS scheme. Patients from Kidwai Nagar, Barra, Naubasta, and Kanpur can receive cashless treatment for eligible surgeries and medical procedures. Please visit our billing counter with your golden card for pre-authorization details.",
  },
  {
    q: "Is there a 24/7 emergency ICU and NICU facility at Lakshya Hospital in South Kanpur?",
    a: "Yes. Our multi-speciality hospital features a fully equipped 24/7 adult Intensive Care Unit (ICU) and a dedicated Neonatal Intensive Care Unit (NICU) in Kidwai Nagar, South Kanpur. Both units are monitored round-the-clock by senior intensivists, pediatricians, and specialized nursing teams for emergency care.",
  },
  {
    q: "Does Lakshya Hospital provide emergency ambulance services in Naubasta and Barra?",
    a: "Yes. Lakshya Hospital offers a 24/7 emergency ambulance service across Kanpur, including Kidwai Nagar, Naubasta, Barra, and South Kanpur. Our ambulances are equipped with Advanced Life Support (ALS) systems and trained paramedics. Call +91 93356 05848 for immediate dispatch.",
  },
  {
    q: "What diagnostic and imaging services are available at your Kidwai Nagar hospital?",
    a: "Our diagnostic center in Kidwai Nagar, Kanpur operates 24/7, providing full-range pathology laboratory tests, high-resolution ultrasound (USG) scans, digital X-rays, ECGs, and echocardiography on-site. This ensures fast, accurate reports to aid critical treatments in our multi-speciality hospital.",
  },
  {
    q: "What surgical treatments are offered by the super-specialists at Lakshya Hospital?",
    a: "As a premier multi-speciality hospital in Kanpur, we house super-specialists for: General Surgery (laparoscopic appendix/hernia/gallbladder by Dr. NS Chauhan & Dr. Kuldeep), Orthopedics (fractures & joint replacement by Dr. Vishal Sethiya), Neuro & Spine surgery (Dr. SG Verma), Urosurgery (kidney stones by Dr. Manish Kumar), Plastic Surgery (Dr. Shushant Luthra), and Pediatric Surgery (Dr. Rakesh Tripathi).",
  },
  {
    q: "How can I book an appointment with a pediatrician or gynecologist at Lakshya Hospital?",
    a: "You can book an appointment with our child care specialists, gynae experts, or other specialists in three easy ways: (1) Call us directly at +91 93356 05848, (2) Fill out the online appointment form on our website's Contact page, or (3) Walk into our hospital in Kidwai Nagar, South Kanpur.",
  }
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
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
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
            className={`shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${isOpen
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
              }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-semibold text-sm sm:text-base leading-snug transition-colors ${isOpen ? "text-primary" : "text-gray-800 group-hover:text-primary"
              }`}
          >
            {faq.q}
          </span>
        </div>

        {/* Icon */}
        <span
          className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all ${isOpen
              ? "bg-primary border-primary text-white rotate-0"
              : "bg-white border-gray-200 text-gray-400 group-hover:border-primary/40 group-hover:text-primary"
            }`}
        >
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>

      {/* Answer — animated expand */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
