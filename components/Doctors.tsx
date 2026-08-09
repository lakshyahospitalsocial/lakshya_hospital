import React from 'react';
import { ArrowRight, Heart, Clock, Award } from 'lucide-react';
import Link from 'next/link';

export default function Doctors() {
  const doctors = [
    {
      name: "Dr. Rohit Agrawal",
      role: "Director & Senior Pediatrician",
      qual: "MBBS, MD Pediatrics",
      exp: "16+ Years",
      badge: "Director",
      avail: "Mon–Sun: 11AM–4PM | Eve: 8–9PM",
      color: "from-blue-500 to-blue-700",
      light: "bg-blue-50",
      dept: "Pediatrics",
      img: "/dr_rohit_lakshya_director.png"
    },
    {
      name: "Dr. Tripti Mishra",
      role: "Director & Senior OB/GYN",
      qual: "MBBS, MS OB/GYN",
      exp: "16+ Years",
      badge: "Director",
      avail: "Mon–Fri: 11AM–1PM & 6–7PM",
      color: "from-pink-500 to-rose-600",
      light: "bg-pink-50",
      dept: "Obstetrics & Gynecology",
      img: "/dr_tripti_founder.png"
    },
    {
      name: "Dr. Vishal Sethiya",
      role: "Senior Orthopedic Surgeon",
      qual: "MBBS, D-Ortho",
      exp: "16+ Years",
      badge: null,
      avail: "Mon–Sat: 1PM–2PM",
      color: "from-orange-500 to-amber-600",
      light: "bg-orange-50",
      dept: "Orthopedics",
      img: "/dr_vishal_sethiya_lakshya.png"
    }
  ];

  return (
    <section id="doctors" className="py-8 md:py-14 bg-white relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10">
          <p className="text-secondary font-bold tracking-wider text-xs uppercase mb-2">Our Specialists</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Meet Our Expert Doctors</h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-[1px] bg-gray-300"></div>
            <Heart className="w-3 h-3 text-primary fill-primary" />
            <div className="w-8 h-[1px] bg-gray-300"></div>
          </div>
          <p className="text-gray-500 text-sm">Our founding directors and senior specialists — bringing decades of expertise and compassionate care.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {doctors.map((doctor, idx) => (
            <div key={idx} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              {/* Doctor Image */}
              <div className="relative h-56 bg-gray-100 overflow-hidden">
                {doctor.img ? (
                  <img
                    src={doctor.img}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center text-gray-400 font-bold text-2xl border-2 border-gray-200">
                      {doctor.name.split(' ').map(n => n[0]).slice(1).join('')}
                    </div>
                  </div>
                )}
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent`}></div>
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white leading-tight">{doctor.name}</h3>
                  {doctor.badge && (
                    <span className="inline-block mt-1 bg-white/25 backdrop-blur-sm border border-white/40 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {doctor.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${doctor.light} text-gray-700 border border-gray-200`}>
                    {doctor.dept}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {doctor.exp}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1 font-medium">{doctor.role}</p>
                <p className="text-xs text-gray-400 mb-3">{doctor.qual}</p>

                <div className="flex items-start gap-2 mb-4 bg-gray-50 rounded-xl px-3 py-2">
                  <Clock className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 font-medium">{doctor.avail}</p>
                </div>

                <Link
                  href="/doctors"
                  className="w-full flex items-center justify-center gap-2 text-primary hover:bg-primary hover:text-white border border-primary/30 py-2.5 rounded-xl text-sm font-semibold transition-all group-hover:bg-primary group-hover:text-white"
                >
                  View Profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full font-bold shadow-xl shadow-primary/20 transition-all hover:-translate-y-1"
          >
            View All 11 Doctors <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
