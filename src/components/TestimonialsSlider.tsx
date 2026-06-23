"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    role: "İmplant Hasta",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    comment:
      "Kansu Diş Kliniği'nde implant tedavisi gördüm. Sonuçtan son derece memnunum. Doktor Kansu ve ekibi çok profesyonel. Herkese tavsiye ederim!",
    date: "2 hafta önce",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    role: "Diş Beyazlatma Hasta",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    comment:
      "Diş beyazlatma işlemi yaptırdım. Çok doğal ve güzel bir sonuç aldım. Klinik çok temiz ve modern. Teşekkürler!",
    date: "1 ay önce",
  },
  {
    id: 3,
    name: "Fatma Demir",
    role: "Ortodonti Hasta",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    comment:
      "2 yıldır diş teli tedavisi görüyorum. Başlangıçta çok korkuyordum ama ekibin desteğiyle çok güzel ilerledi. Sabırlı ve anlayışlılar.",
    date: "3 hafta önce",
  },
  {
    id: 4,
    name: "Ali Çelik",
    role: "Kanal Tedavisi Hasta",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
    comment:
      "Kanal tedavisi için geldim. Hiç ağrı hissetmedim. Çok profesyonel bir ekip. Kesinlikle güvenebilirsiniz.",
    date: "2 ay önce",
  },
  {
    id: 5,
    name: "Zeynep Arslan",
    role: "Çocuk Hasta (Anne)",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    rating: 5,
    comment:
      "Oğlumun diş kontrolü için geldik. Çocuklarla çok iyi ilgileniyorlar. Oğlum artık diş doktorundan korkmuyor. Çok teşekkür ederiz!",
    date: "1 hafta önce",
  },
];

export function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isAutoPlaying]);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm text-sky-700 mb-4">
            <Star className="h-4 w-4 fill-sky-500" />
            Hasta Yorumları
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Hastalarımız Ne Diyor?
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Binlerce mutlu hastamızdan bazılarının deneyimleri
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
                      <Quote className="absolute top-6 right-6 h-16 w-16 text-sky-100" />
                      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="flex-shrink-0">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full object-cover ring-4 ring-sky-100"
                          />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex justify-center md:justify-start gap-1 mb-4">
                            {Array.from({ length: testimonial.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-5 w-5 text-amber-400 fill-amber-400"
                                />
                              )
                            )}
                          </div>
                          <p className="text-slate-700 text-lg leading-relaxed mb-6">
                            &ldquo;{testimonial.comment}&rdquo;
                          </p>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-sky-600">
                              {testimonial.role}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              {testimonial.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? "w-8 bg-sky-500"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
