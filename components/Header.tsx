"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, CalendarHeart, Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Articles', href: '/articles' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Lakshya Hospital Logo"
                className="h-14 sm:h-16 w-auto object-contain -ml-4 -mr-3"
              />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-primary leading-tight tracking-tight">Lakshya</span>
                <div className="flex items-center -mt-0.5">
                  <div className="h-[1px] bg-secondary/50 w-3 rounded-full mr-1.5" />
                  <p className="text-[9px] sm:text-[10px] font-extrabold text-secondary tracking-[0.25em] leading-none uppercase">HOSPITAL</p>
                  <div className="h-[1px] bg-secondary/50 w-3 rounded-full ml-1.5" />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-5 lg:space-x-8">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium text-sm transition-colors relative group py-2 ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-5 lg:space-x-6">
              <a href="tel:+919335605848" className="flex items-center group bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-full border border-primary/20 transition-all duration-300">
                <div className="relative flex items-center justify-center mr-2.5">
                  <span className="absolute inline-flex h-6 w-6 rounded-full bg-primary/40 opacity-75 animate-ping" />
                  <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary">
                    <Phone size={12} />
                  </span>
                </div>
                <span className="font-bold text-[13px] tracking-wide text-primary group-hover:text-primary-hover transition-colors">
                  +91 93356 05848
                </span>
              </a>
              <Link href="/book-appointment" className="bg-primary hover:bg-primary-hover text-white px-5 lg:px-6 py-2.5 rounded-full font-medium text-sm shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                <CalendarHeart className="w-4 h-4" />
                <span className="hidden xl:inline">Book Appointment</span>
                <span className="xl:hidden">Book</span>
              </Link>
            </div>

            {/* Mobile right — call icon + hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <a href="tel:+919335605848"
                className="relative w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                aria-label="Call us"
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75 animate-ping" />
                <Phone size={16} className="relative z-10" />
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer panel */}
          <div className="absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-bold text-primary text-lg">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-1">
                {navLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${isActive
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                          }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Drawer footer CTA */}
            <div className="px-5 py-5 border-t border-gray-100 space-y-3">
              <Link
                href="/book-appointment"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all"
              >
                <CalendarHeart size={16} /> Book Appointment
              </Link>
              <a
                href="tel:+919335605848"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-primary hover:text-primary transition-all"
              >
                <Phone size={15} /> +91 93356 05848
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}