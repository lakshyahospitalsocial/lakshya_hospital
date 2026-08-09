import React from 'react';
import { Baby, Stethoscope, HeartPulse, Bone, Brain, Ear, ShieldPlus, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      icon: <Stethoscope className="w-7 h-7" />,
      title: "General Medicine",
      color: "bg-teal-50 border-teal-100 text-teal-600",
      gradient: "from-teal-500/10 to-transparent"
    },
    {
      icon: <HeartPulse className="w-7 h-7" />,
      title: "OB / Gynecology",
      color: "bg-pink-50 border-pink-100 text-pink-600",
      gradient: "from-pink-500/10 to-transparent"
    },
    {
      icon: <Baby className="w-7 h-7" />,
      title: "Pediatrics",
      color: "bg-blue-50 border-blue-100 text-blue-600",
      gradient: "from-blue-500/10 to-transparent"
    },
    {
      icon: <Bone className="w-7 h-7" />,
      title: "Orthopedics",
      color: "bg-orange-50 border-orange-100 text-orange-600",
      gradient: "from-orange-500/10 to-transparent"
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "Neuro & Spine",
      color: "bg-purple-50 border-purple-100 text-purple-600",
      gradient: "from-purple-500/10 to-transparent"
    },
    {
      icon: <Ear className="w-7 h-7" />,
      title: "ENT Care",
      color: "bg-cyan-50 border-cyan-100 text-cyan-600",
      gradient: "from-cyan-500/10 to-transparent"
    },
    {
      icon: <ShieldPlus className="w-7 h-7" />,
      title: "General Surgery",
      color: "bg-indigo-50 border-indigo-100 text-indigo-600",
      gradient: "from-indigo-500/10 to-transparent"
    },
  ];

  return (
    <section id="services" className="py-8 md:py-16 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10">
          <p className="text-secondary font-bold tracking-widest text-xs uppercase mb-3">What We Provide</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Comprehensive Medical Services</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[1px] bg-gray-300"></div>
            <Heart className="w-3 h-3 text-primary fill-primary" />
            <div className="w-8 h-[1px] bg-gray-300"></div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">12 super-speciality departments including Urosurgery, Plastic Surgery, Pediatric Surgery & more — all under one roof.</p>
        </div>

        {/* Responsive grid: 2 cols mobile → 4 tablet → 8 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 items-stretch">
          {services.map((service, idx) => (
            <Link
              key={idx}
              href="/services"
              className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col items-center text-center"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 border ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">{service.title}</h3>
              </div>
            </Link>
          ))}

          {/* View More Card */}
          <Link
            href="/services"
            className="group bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-4 sm:p-5 border border-primary shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">+5 More</h3>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
