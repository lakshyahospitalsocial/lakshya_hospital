import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  MapPin, Phone, Mail, Clock, Send, MessageSquare,
  Users, Shield, Headphones, Calendar, CheckCircle2,
  ArrowRight, HelpCircle, ChevronRight
} from 'lucide-react';

// High-fidelity WhatsApp SVG Icon
const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.894 0c3.18.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.328 11.882-11.894 11.882-1.997-.001-3.956-.5-5.688-1.448L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.793 1.451 5.176 0 9.387-4.217 9.39-9.394.001-2.507-.974-4.865-2.748-6.64-1.772-1.774-4.131-2.75-6.638-2.75-5.18 0-9.392 4.218-9.395 9.397-.001 1.76.471 3.477 1.365 5.006L2.348 21.05l4.3-1.896zm12.336-6.143c-.328-.164-1.936-.957-2.264-1.077-.327-.12-.566-.18-.804.18-.238.36-.922 1.168-1.13 1.407-.208.239-.417.27-.745.105-.328-.164-1.383-.51-2.636-1.626-.975-.87-1.633-1.946-1.824-2.274-.191-.328-.02-.505.143-.668.147-.147.328-.383.493-.574.164-.19.219-.328.328-.546.11-.219.055-.41-.027-.574-.082-.164-.804-1.936-1.102-2.656-.29-.699-.586-.605-.804-.616-.208-.01-.447-.012-.686-.012-.239 0-.628.09-.957.45-.328.36-1.252 1.226-1.252 2.99s1.293 3.468 1.472 3.707c.18.239 2.544 3.886 6.163 5.443.861.37 1.534.592 2.059.758.865.275 1.654.236 2.276.143.694-.105 1.936-.79 2.21-1.554.275-.765.275-1.422.192-1.554-.083-.13-.306-.21-.634-.374z" />
  </svg>
);

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50/50">
      <Header />

      {/* ── Hero Banner ── */}
      <section className="bg-gradient-to-br from-blue-50/80 via-white to-slate-50 pt-16 pb-28 text-slate-900 relative overflow-hidden border-b border-slate-100">
        {/* Decorative blobs & dot grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-primary/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[460px] h-[460px] bg-secondary/8 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: Heading + Three Feature Cards ── */}
            <div className="flex flex-col items-start text-left space-y-7">
              {/* Tag */}
              <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold text-primary">
                Contact &amp; Support
              </span>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight font-display">
                Need Help?<br />
                We&#39;re Here{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                  for You.
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-slate-500 max-w-lg text-base sm:text-lg leading-relaxed">
                Reach out to Lakshya Hospital for appointments, general inquiries, or any clinical assistance. Our team is ready to help you every step of the way.
              </p>

              {/* Three feature cards – same horizontal row */}
              <div className="grid grid-cols-3 gap-4 w-full pt-2">
                {/* Quick Response */}
                <div className="group bg-white/70 backdrop-blur-sm border border-slate-100 p-5 rounded-2xl flex flex-col items-start text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">Quick Response</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">Active desks reply as soon as possible.</p>
                </div>

                {/* Expert Support */}
                <div className="group bg-white/70 backdrop-blur-sm border border-slate-100 p-5 rounded-2xl flex flex-col items-start text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">Expert Support</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">Our staff is always ready to assist you.</p>
                </div>

                {/* Trusted Care */}
                <div className="group bg-white/70 backdrop-blur-sm border border-slate-100 p-5 rounded-2xl flex flex-col items-start text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-5 h-5 text-purple-500" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">Trusted Care</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">Your health &amp; privacy, our top priority.</p>
                </div>
              </div>
            </div>

            {/* ── Right: 3-D headset illustration with floating pills ── */}
            <div className="flex justify-center lg:justify-end w-full">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">

                {/* Glow blob */}
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />

                {/* Outer gradient ring */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-50/60 to-indigo-50/30 border border-slate-100/80 shadow-inner" />

                {/* Dashed orbit ring – animated via CSS class in globals.css */}
                <div className="absolute inset-10 rounded-full border border-dashed border-slate-200/70 orbit-ring-spin" />

                {/* Inner white disc */}
                <div className="absolute inset-20 rounded-full bg-white shadow-2xl border border-slate-50/60 flex items-center justify-center">
                  {/* Headset center button */}
                  <div className="relative p-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-2xl text-white hover:scale-105 transition-transform duration-500 cursor-default">
                    <Headphones className="w-14 h-14" />
                    {/* Live badge */}
                    <div className="absolute -top-1 -right-1 bg-secondary text-dark-blue px-2.5 py-0.5 rounded-full text-[9px] font-extrabold flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-ping" />
                      LIVE
                    </div>
                  </div>
                </div>

                {/* ── Floating Icon Pills ── */}
                {/* Phone – top-left */}
                <div className="contact-float-1 absolute top-7 left-7 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 text-blue-500 hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer">
                  <Phone className="w-5 h-5" />
                </div>

                {/* WhatsApp – top-right, green brand bg */}
                <div className="contact-float-2 absolute top-12 right-7 bg-emerald-500 p-3 rounded-2xl shadow-lg border border-emerald-400 text-white hover:scale-110 hover:-rotate-6 transition-all duration-300 cursor-pointer">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>

                {/* Mail – middle-left */}
                <div className="contact-float-3 absolute left-1 top-1/2 -translate-y-1/2 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 text-purple-500 hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>

                {/* MapPin – middle-right */}
                <div className="contact-float-1 absolute right-1 top-1/2 -translate-y-1/2 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 text-orange-500 hover:scale-110 hover:-rotate-12 transition-all duration-300 cursor-pointer">
                  <MapPin className="w-5 h-5" />
                </div>

                {/* Calendar – bottom-right */}
                <div className="contact-float-2 absolute bottom-14 right-7 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 text-indigo-600 hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer">
                  <Calendar className="w-5 h-5" />
                </div>

                {/* "We're Available" floating status card */}
                <div className="contact-float-3 absolute bottom-3 left-5 bg-white/95 backdrop-blur-md border border-slate-100 p-3.5 pr-5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800">We&#39;re Available</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-normal">
                      Monday – Sunday<br />24 × 7 Emergency Care
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Contact Quick-Action Bar ── */}
      <section className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-10 mb-14">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 gap-0">

          {/* Call Us */}
          <a href="tel:+919335605848" className="flex items-center gap-4 px-6 py-4 rounded-none hover:bg-slate-50/60 transition-colors group first:rounded-l-3xl last:rounded-r-3xl">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Call Us</p>
              <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">+91 93356 05848</p>
              <p className="text-[10px] text-slate-400 mt-0.5">24 × 7 Emergency Care</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/919335605848" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors group">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 border border-emerald-400 group-hover:scale-110 transition-transform duration-300">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp Us</p>
              <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">+91 93356 05848</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Chat with our team</p>
            </div>
          </a>

          {/* Email */}
          <a href="mailto:info@lakshyahospital.com" className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors group">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
              <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">info@lakshyahospital.com</p>
              <p className="text-[10px] text-slate-400 mt-0.5">We&#39;ll respond promptly</p>
            </div>
          </a>

          {/* Visit */}
          <div className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors group cursor-default last:rounded-r-3xl">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visit Us</p>
              <p className="text-sm font-bold text-slate-800">Kidwai Nagar, Kanpur</p>
              <a
                href="https://maps.google.com/?q=Lakshya+Hospital+Kidwai+Nagar+Kanpur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-primary hover:text-primary-hover font-bold inline-flex items-center gap-0.5 mt-0.5 group/link"
              >
                Get Directions
                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Contact Form + Map ── */}
      <section className="pb-16 pt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-stretch">

            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-[36px] p-8 lg:p-10 shadow-xl border border-slate-100 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-2xl font-bold text-slate-900 mb-1 font-display relative z-10">Send a Message</h3>
              <p className="text-slate-400 text-sm mb-8 relative z-10">Fill out the form and our team will reach out to you shortly.</p>

              <form className="space-y-5 relative z-10 text-left flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm placeholder:text-slate-300" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Phone Number</label>
                    <input type="tel" placeholder="+91 90000 00000" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm placeholder:text-slate-300" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm placeholder:text-slate-300" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">How can we help?</label>
                  <textarea rows={4} placeholder="Describe your inquiry…" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none text-sm placeholder:text-slate-300" />
                </div>

                <button type="button" className="w-full bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer text-sm mt-auto">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Location card + map */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Dark location card */}
              <div className="bg-slate-900 text-white rounded-[32px] p-7 shadow-xl relative overflow-hidden flex flex-col gap-4">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
                <h4 className="text-lg font-bold font-display">Campus Location</h4>

                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5 animate-bounce" />
                  <p className="text-sm text-slate-300 leading-snug">
                    128/1006, in front of Telephone Exchange,<br />
                    Y Block, Kidwai Nagar, Kanpur – 208011
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white">OPD Hours</p>
                    <p className="text-xs text-slate-400 mt-0.5">Mon – Sun: 10:00 AM – 8:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start pt-3 border-t border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white">24 × 7 Emergency Care</p>
                    <p className="text-xs text-slate-400 mt-0.5">Trauma · ICU · NICU — always open</p>
                  </div>
                </div>
              </div>

              {/* Embedded map */}
              <div className="flex-1 min-h-[240px] rounded-[32px] overflow-hidden shadow-md border border-slate-100">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '240px' }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=128%2F1006%2C%20in%20front%20of%20Telephone%20Exchange%2C%20Y%20Block%2C%20Ghari%20Purva%2C%20Kidwai%20Nagar%2C%20Kanpur%2C%20Uttar%20Pradesh%20208011&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold text-primary mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">Common Patient Queries</h2>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
              Quick answers on appointments, cashless billing, ward timings, and emergency services.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How do I schedule an appointment with a doctor?',
                a: <>Call our reception at <a href="tel:+919335605848" className="font-bold text-primary hover:underline">+91 93356 05848</a>, visit the campus registration desk, or use the <a href="/doctors" className="font-bold text-primary hover:underline">Find a Doctor</a> page to browse available clinicians and request a slot.</>
              },
              {
                q: 'Do you accept Ayushman Bharat or State Government health cards?',
                a: <>Yes. Lakshya Hospital is fully empanelled for <strong>Ayushman Bharat</strong> and <strong>DDUS (State Govt Employees &amp; Pensioners)</strong> cards, along with major private insurers. Bring your active card and Aadhaar to the admissions desk for cashless processing.</>
              },
              {
                q: 'What are the visiting hours for inpatient wards (IPD)?',
                a: <>Visiting is permitted <strong>11:00 AM – 1:00 PM</strong> and <strong>5:00 PM – 7:00 PM</strong> daily. Only one attendee with a valid registration pass is allowed at a time to ensure patient rest and hygiene.</>
              },
              {
                q: 'Is the emergency department open on Sundays and public holidays?',
                a: <>Absolutely. Our emergency trauma centre, ICU, NICU, and operation theatres run <strong>24 hours a day, 365 days a year</strong> — including Sundays, festivals, and national holidays.</>
              },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-slate-50/80 border border-slate-100 rounded-2xl p-5 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer list-none select-none">
                  <span className="text-sm font-bold text-slate-800 pr-4 text-left">{q}</span>
                  <span className="shrink-0 transition-transform duration-300 group-open:rotate-90 text-slate-400">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </summary>
                <div className="mt-3 pt-3 border-t border-slate-200/60 text-sm text-slate-600 leading-relaxed">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
