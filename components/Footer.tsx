import React from 'react';
import Link from 'next/link';
import {
  MapPin, Phone, Mail, Clock,
  ArrowRight, CalendarHeart,
  Heart, Shield, ChevronRight,
} from 'lucide-react';

const QUICK_LINKS = [
  { name: 'Home',             href: '/' },
  { name: 'About Us',         href: '/about' },
  { name: 'Our Services',     href: '/services' },
  { name: 'Our Doctors',      href: '/doctors' },
  { name: 'Health Articles',  href: '/articles' },
  { name: 'Book Appointment', href: '/book-appointment' },
  { name: 'Contact Us',       href: '/contact' },
];

const SERVICES = [
  'General Medicine',
  'General Surgery',
  'OB / Gynecology',
  'Pediatrics & NICU',
  'Orthopedics',
  'ENT Care',
  'Neuro & Spine',
  'Urosurgery',
  'Plastic Surgery',
  'Critical Care (ICU)',
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-100 text-gray-700">

      {/* ── CTA Banner ── */}
      <div className="bg-gradient-to-r from-primary to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-14 h-14 bg-white/15 border border-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <CalendarHeart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">Your Health is Our Priority</h3>
                <p className="text-white/75 text-sm mt-1">Book today and get expert care within hours.</p>
              </div>
            </div>
            <Link
              href="/book-appointment"
              className="shrink-0 w-full sm:w-auto bg-white text-primary hover:bg-gray-50 font-bold px-7 py-3.5 rounded-full shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"
            >
              Book Appointment Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* ── Column 1: Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo row */}
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="Lakshya Hospital Logo"
                className="h-16 w-auto object-contain -ml-2 -mr-1"
              />
              <div className="flex flex-col pt-1">
                <span className="text-2xl font-bold text-primary leading-none tracking-tight">Lakshya</span>
                <div className="flex items-center mt-1.5">
                  <div className="h-[1.5px] bg-secondary/50 flex-1 rounded-full" />
                  <span className="text-[10px] font-bold text-secondary tracking-[0.3em] px-2 leading-none uppercase">HOSPITAL</span>
                  <div className="h-[1.5px] bg-secondary/50 flex-1 rounded-full" />
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Multi-super-speciality healthcare since 2013. Serving Kanpur with compassion, expertise, and 24/7 emergency care.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-xs text-primary font-semibold">
                <Shield className="w-3 h-3" /> Ayushman Bharat
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-xs text-secondary font-semibold">
                <Heart className="w-3 h-3 fill-secondary/30" /> DDUS Empanelled
              </span>
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { label: 'f',  title: 'Facebook',  href: '#',                              color: 'hover:bg-blue-600 hover:border-blue-600 hover:text-white' },
                { label: 'in', title: 'Instagram', href: '#',                              color: 'hover:bg-pink-500 hover:border-pink-500 hover:text-white' },
                { label: '▶', title: 'YouTube',    href: '#',                              color: 'hover:bg-red-500 hover:border-red-500 hover:text-white' },
                { label: 'w',  title: 'WhatsApp',  href: 'https://wa.me/919335605848',     color: 'hover:bg-green-500 hover:border-green-500 hover:text-white' },
              ].map(({ label, title, href, color }) => (
                <a
                  key={title}
                  href={href}
                  aria-label={title}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 transition-all text-xs font-bold shadow-sm ${color}`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors font-medium"
                  >
                    <ChevronRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all -ml-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Services ── */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest">Our Specialities</h4>
            <ul className="space-y-2.5">
              {SERVICES.map(name => (
                <li key={name}>
                  <Link
                    href="/services"
                    className="group flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors font-medium"
                  >
                    <ChevronRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all -ml-1" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact ── */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4">

              <li>
                <a href="https://maps.google.com/?q=Lakshya+Hospital+Kanpur" target="_blank" rel="noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary transition-colors">
                    <MapPin className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-primary transition-colors leading-relaxed">
                    128/1006, Y Block, Kidwai Nagar,<br />Kanpur, UP – 208011
                  </span>
                </a>
              </li>

              <li>
                <a href="tel:+919335605848" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center shrink-0 group-hover:bg-green-500 transition-colors">
                    <Phone className="w-4 h-4 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 group-hover:text-primary font-semibold transition-colors">+91 93356 05848</p>
                    <p className="text-xs text-gray-400">0512 263 4916 (Landline)</p>
                  </div>
                </a>
              </li>

              <li>
                <a href="mailto:info@lakshyahospital.com" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors">
                    <Mail className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-primary transition-colors break-all">
                    info@lakshyahospital.com
                  </span>
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-semibold">Open 24 / 7</p>
                  <p className="text-xs text-gray-400">Emergency always available</p>
                </div>
              </li>

            </ul>

            {/* Emergency call */}
            <a
              href="tel:+919335605848"
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 font-bold text-sm transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Emergency: Call Now
            </a>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="border-t border-gray-200" />

        {/* ── Bottom Bar ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© 2025 Lakshya Hospital, Kanpur. All Rights Reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span className="text-gray-200">|</span>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <span className="text-gray-200">|</span>
            <Link href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
