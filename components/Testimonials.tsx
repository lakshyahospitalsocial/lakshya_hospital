"use client";
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart, Quote, PlayCircle, X } from 'lucide-react';

const reviews = [
  {
    name: "Nusrat",
    tag: "Pediatric Patient Family",
    review: "Our newborn developed breathing problems and a severe infection after birth. After consulting multiple doctors and hospitals, we were advised to bring our baby to Lakshya Hospital. They provided the critical care and treatment our baby desperately needed.",
    rating: 5,
    youtubeId: "https://www.youtube.com/shorts/FqTE9pkcscw",
  },
  {
    name: "Mr. Santosh Kumar",
    tag: "Dyspnea Patient",
    review: "In this patient testimonial, Mr. Santosh Kumar shares his experience related to dyspnea (breathing difficulty) and his healthcare journey at Lakshya Hospital, Kanpur.",
    rating: 5,
    youtubeId: "https://www.youtube.com/shorts/vpJHfcZDPX0",
  },
  {
    name: "Praveen Singh Kushwaha",
    tag: "Patient Family",
    review: "In this heartfelt patient testimonial, Praveen Singh Kushwaha and his family share their perspective on the care, support and overall experience they received during their treatment from the hospital team.",
    rating: 5,
    youtubeId: "https://www.youtube.com/shorts/ifaHz_LjusU",
  },
  {
    name: "Bilal & Family",
    tag: "Maternity Patient",
    review: "Recovering after delivery doesn't always have to take weeks. With the right medical care and support under Dr. Tripti Mishra at Lakshya Hospital, my wife was able to recover comfortably within just 4 days after delivery.",
    rating: 5,
    youtubeId: "https://www.youtube.com/shorts/o7EKg3FCwos",
  },
  {
    name: "Manisha Shakya",
    tag: "Gynaecology & General Surgery Patient",
    review: "I was in a terrifying situation facing two operations due to irregular periods, gallbladder stones, and an ovarian condition. Dr. Tripti Mishra treated my problems and I am completely fine now with no more pain or irregular periods.",
    rating: 5,
    youtubeId: "https://youtube.com/shorts/P9Xh_qSBaGI?feature=share",
  },
  {
    name: "Komal Devi",
    tag: "Maternity Patient",
    review: "I experienced an abnormal pregnancy with no pain even when my water broke. Dr. Tripti Mishra handled the situation exceptionally well and delivered my baby safely, changing my life forever.",
    rating: 5,
    youtubeId: "https://www.youtube.com/shorts/MM02P3yeYrE",
  },
  {
    name: "Thriving Child's Family",
    tag: "Critical Pediatric Patient Family",
    review: "After multiple hospitals gave up on our critically ill child, we found a savior in Dr. Rohit Agarwal. Thanks to his dedication and a grueling yet successful two-month admission, our child made a full recovery. We express our profound gratitude to the medical team.",
    rating: 5,
    youtubeId: "https://youtube.com/shorts/xM3IZgiABW8?feature=share",
  },
  {
    name: "Devansh Sahu",
    tag: "Pediatric Spine Surgery Family",
    review: "My newborn brother had a critical knot in his spine discovered post-delivery. The experienced surgical team at Lakshya Hospital performed a flawless spine operation to prevent future paralysis. We are extremely thankful for their transparent communication, professionalism, and affordable care.",
    rating: 5,
    youtubeId: "https://youtube.com/shorts/B4AmH_vmGs4?feature=share",
  },
  {
    name: "Ramesh Sharma",
    tag: "Surgery Patient",
    review: "Dr. NS Chauhan performed my surgery with great skill. The entire hospital staff was supportive throughout my recovery. Highly recommend Lakshya Hospital for any surgical needs.",
    rating: 5,
    youtubeId: "", // Empty means it will just show as a text testimonial
  },
  {
    name: "Vikram Singh",
    tag: "Orthopedic Patient",
    review: "Came to Dr. Vishal Sethiya with a severe fracture. He explained everything clearly and the treatment was spot-on. Recovered faster than expected.",
    rating: 5,
    youtubeId: "",
  },
];

// Helper to extract just the video ID from ANY YouTube link (e.g., shorts, watch?v=, youtu.be)
function extractYouTubeId(urlOrId: string) {
  if (!urlOrId) return "";
  const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : urlOrId;
}

/* ─── Video Modal ────────────────────────────────────────────── */
function VideoModal({ youtubeId, onClose }: { youtubeId: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-black rounded-2xl shadow-2xl aspect-video animate-[modalSlide_.3s_ease]"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking the video itself
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/20"
        >
          <X size={20} />
        </button>
        <iframe
          className="w-full h-full rounded-2xl bg-black"
          src={`https://www.youtube.com/embed/${extractYouTubeId(youtubeId)}?autoplay=1&rel=0`}
          title="Patient Testimonial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const visible = [
    reviews[current % reviews.length],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ];

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <>
      {activeVideo && <VideoModal youtubeId={activeVideo} onClose={() => setActiveVideo(null)} />}

      <section className="py-8 md:py-14 bg-gray-50/50 overflow-hidden relative">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-12">

            {/* Title Area */}
            <div className="lg:w-1/4 w-full shrink-0">
              <p className="text-secondary font-bold tracking-wider text-xs uppercase mb-3">Patient Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands of Families</h2>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-[1px] bg-gray-300"></div>
                <Heart className="w-3 h-3 text-primary fill-primary" />
                <div className="w-8 h-[1px] bg-gray-300"></div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Real stories from real patients who experienced the Lakshya difference — compassionate care, expert doctors, and a warm environment.
              </p>

              {/* Rating summary */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm inline-block w-full sm:w-auto">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-2xl font-bold text-gray-900">4.9 / 5</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Based on 500+ reviews & videos</p>
              </div>
            </div>

            {/* Slider Area */}
            <div className="lg:w-3/4 w-full overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {visible.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 flex flex-col overflow-hidden group ${idx === 0 ? 'border-primary/30 shadow-primary/10 shadow-md' : 'border-gray-100'
                      }`}
                  >
                    {/* Video Thumbnail (If available) */}
                    {testimonial.youtubeId && (
                      <div
                        className="relative h-44 bg-gray-100 cursor-pointer overflow-hidden shrink-0"
                        onClick={() => setActiveVideo(testimonial.youtubeId)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${extractYouTubeId(testimonial.youtubeId)}/hqdefault.jpg`}
                          alt={`Video testimonial from ${testimonial.name}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all shadow-lg">
                            <PlayCircle className="w-6 h-6 text-white ml-0.5" />
                          </div>
                        </div>

                        {/* Tag */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1">
                          <PlayCircle size={10} /> Video
                        </div>
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="p-6 flex flex-col flex-grow gap-4">
                      {/* Quote Icon (only show if no video, to save space) */}
                      {!testimonial.youtubeId && (
                        <Quote className="w-7 h-7 text-primary/20 shrink-0" />
                      )}

                      <p className={`text-gray-600 text-sm leading-relaxed flex-grow ${testimonial.youtubeId ? 'line-clamp-3' : ''}`}>
                        "{testimonial.review}"
                      </p>

                      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                        <div className="w-10 h-10 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm truncate">{testimonial.name}</h4>
                          <p className="text-xs text-gray-400 truncate">{testimonial.tag}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5 shrink-0 hidden sm:flex">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-bold text-gray-700 ml-1">5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors shadow-sm shrink-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`rounded-full transition-all shrink-0 ${i === current % reviews.length
                        ? 'w-6 h-2.5 bg-primary'
                        : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-primary border border-primary flex items-center justify-center text-white hover:bg-primary-hover transition-colors shadow-sm shrink-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
