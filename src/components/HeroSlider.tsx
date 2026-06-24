"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Calendar, Phone, Stethoscope, Sparkles } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80",
    title: "Sağlıklı Gülüşler\nİçin Buradayız",
    subtitle: "Uzman kadromuz ve modern teknolojilerimizle diş sağlığınızı koruyoruz.",
    cta: "Randevu Al",
    ctaLink: "/randevu",
    icon: Calendar,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920&q=80",
    title: "Modern\nTeknoloji",
    subtitle: "En son diş hekimliği teknolojileri ile konforlu tedavi.",
    cta: "Hizmetlerimiz",
    ctaLink: "/hakkimizda",
    icon: Sparkles,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920&q=80",
    title: "Uzman\nDoktor Kadrosu",
    subtitle: "Her biri alanında uzman doktorlarımızla tanışın.",
    cta: "Doktorlarımız",
    ctaLink: "/doktorlar",
    icon: Stethoscope,
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isAutoPlaying]);

  return (
    <div
      className="relative w-full h-[600px] md:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight whitespace-pre-line">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-slate-200">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition-colors"
                  >
                    <slide.icon className="h-5 w-5" />
                    {slide.cta}
                  </Link>
                  <a
                    href="tel:+905001234567"
                    className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border border-white/30 bg-transparent text-white hover:bg-white/10 font-medium transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    Bizi Arayın
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? "w-8 bg-sky-500"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
