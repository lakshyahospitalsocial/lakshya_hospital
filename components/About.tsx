"use client"
import React, { useRef, useState, useEffect } from 'react';
import { Shield, Microscope, Users, Heart, Check, PlayCircle, PauseCircle, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const TRUST_SLIDES = [
  {
    src: "/lakshya-team.jfif",
    alt: "Lakshya Hospital Team",
    caption: "Our Dedicated Medical Team"
  },
  {
    src: "/Lakshya_Hospital.png",
    alt: "Lakshya Hospital Building",
    caption: "Lakshya Hospital Exterior Facade"
  },
  {
    src: "/icu.jpeg",
    alt: "Intensive Care Unit (ICU)",
    caption: "Advanced ICU Critical Care Facility"
  },
  {
    src: "/nicu.jpeg",
    alt: "Neonatal ICU (NICU)",
    caption: "Specialized Newborn NICU Centre"
  },
  {
    src: "/modular_OT.jpeg",
    alt: "Modular Operation Theatre",
    caption: "State-of-the-Art Modular OT"
  }
];

export default function About() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % TRUST_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + TRUST_SLIDES.length) % TRUST_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % TRUST_SLIDES.length);
  };

  const handleDotClick = (idx: number) => {
    setActiveSlide(idx);
  };


  return (
    <section id="about" className="py-8 md:py-14 bg-gray-50/50">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Image Area */}
          <div className="relative h-[380px] w-full rounded-3xl overflow-hidden shadow-xl group">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/Lakshya_Website_Intro.mp4"
              controls
              preload="none"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${isPlaying
                ? 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'
                : 'opacity-100 pointer-events-auto'
                }`}
            >
              <button
                onClick={handlePlay}
                aria-label={isPlaying ? "Pause Video" : "Play Video"}
                className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
              >
                {isPlaying ? <PauseCircle className="w-10 h-10" /> : <PlayCircle className="w-10 h-10" />}
              </button>
            </div>
          </div>


          {/* Right Content Area */}
          <div className="space-y-6">
            <div>
              <p className="text-secondary font-bold tracking-wider text-xs uppercase mb-2">About Us</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Who We Are</h2>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-[1px] bg-gray-300"></div>
                <Heart className="w-3 h-3 text-primary fill-primary" />
                <div className="w-8 h-[1px] bg-gray-300"></div>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm lg:text-base">
                <p>
                  Founded in 2013 by Dr. Rohit Agarwal, a renowned pediatrician, Lakshya Hospital is one of Kanpur’s leading healthcare facilities. Over 13 years, it has grown into a 30-bed facility, offering advanced tertiary and quaternary care, supported by super-specialists, cutting-edge technology, and state-of-the-art infrastructure. Guided by its mission to deliver world-class yet affordable care, Lakshya Hospital has been at the forefront of the most advanced medical specialties and treatment programs, including general medicine, general surgery, obstetrics & gynecology, pediatrics, orthopedics, ENT care, neurosurgery, spine surgery, urosurgery, plastic surgery, pediatric surgery, and critical care.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-800">Safe Environment</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-secondary/10 text-secondary p-3 rounded-xl">
                  <Microscope className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-800">Advanced Technology</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/10 text-blue-500 p-3 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-800">Experienced Doctors</span>
              </div>
            </div>

            <div className="pt-6">
              <a href="/about" className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full font-medium shadow-lg transition-all hover:-translate-y-1">
                Learn More About Us
              </a>
            </div>
          </div>

        </div>

        {/* Why Trust Us Banner */}
        <div className="mt-14 bg-[#f4fbf8] rounded-[32px] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm border border-green-50">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Patients Trust Us</h3>
            <div className="space-y-3">
              {[
                "11 Super-Specialists Across 12 Departments",
                "ICU & NICU with 24/7 Critical Care",
                "Ayushman Bharat & DDUS Scheme Empanelled",
                "Pathology, Ultrasound & X-Ray On-Site",
                "24/7 Ambulance & Emergency Services",
                "13+ Years of Trusted Healthcare in Kanpur"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md h-64 bg-white/60 border-4 border-white rounded-3xl overflow-hidden shadow-sm relative group select-none">

              {/* Slides */}
              <div className="w-full h-full relative">
                {TRUST_SLIDES.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Caption */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                      <p className="text-white text-[10px] font-semibold tracking-wider uppercase opacity-75 mb-0.5">
                        Hospital Gallery
                      </p>
                      <p className="text-white text-sm font-bold">
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight size={16} />
              </button>

              {/* Indicator Dots */}
              <div className="absolute bottom-3 right-4 z-20 flex gap-1">
                {TRUST_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${idx === activeSlide
                      ? "bg-white w-3"
                      : "bg-white/40 hover:bg-white/70"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
