"use client"
import React, { useRef, useState } from 'react';
import { Shield, Microscope, Users, Heart, Check, PlayCircle, PauseCircle, CheckCircle2 } from 'lucide-react';

export default function About() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
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
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
                isPlaying
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
                  Lakshya Hospital is one of Kanpur’s leading healthcare facilities, offering advanced tertiary and quaternary care. Guided by our mission to deliver world-class yet affordable care, we provide comprehensive multi-super-speciality services supported by experienced doctors and cutting-edge technology.
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
            <div className="w-full max-w-sm h-64 bg-white/60 border-4 border-white rounded-3xl overflow-hidden shadow-sm relative">
              <Heart className="absolute top-4 right-4 w-12 h-12 text-primary/10 z-10" />

              <img
                src="/lakshya-team.jfif"
                alt="Lakshya Hospital Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
