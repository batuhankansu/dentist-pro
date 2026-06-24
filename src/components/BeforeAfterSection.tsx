"use client";

import { useState, useCallback } from "react";
import { ArrowLeftRight } from "lucide-react";

const beforeAfterCases = [
  {
    id: 1,
    title: "Diş Beyazlatma",
    description: "Profesyonel beyazlatma ile 4 ton beyazlama",
    before: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&fit=crop&h=450",
    after: "https://images.pexels.com/photos/6627574/pexels-photo-6627574.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop",
  },
  {
    id: 2,
    title: "İmplant Tedavisi",
    description: "Tek diş implant ile doğal görünüm",
    before: "https://images.pexels.com/photos/6627601/pexels-photo-6627601.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop",
    after: "https://images.pexels.com/photos/6627578/pexels-photo-6627578.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop",
  },
  {
    id: 3,
    title: "Ortodonti",
    description: "Şeffaf plak ile düzgün dişler",
    before: "https://images.pexels.com/photos/4270361/pexels-photo-4270361.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop",
    after: "https://images.pexels.com/photos/4270365/pexels-photo-4270365.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop",
  },
];

export function BeforeAfterSection() {
  const [sliderPositions, setSliderPositions] = useState<Record<number, number>>(
    () => Object.fromEntries(beforeAfterCases.map((c) => [c.id, 50]))
  );

  const getPercentage = useCallback((clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    return Math.max(0, Math.min(100, (x / rect.width) * 100));
  }, []);

  const handleSliderMove = useCallback((id: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSliderPositions((prev) => ({ ...prev, [id]: getPercentage(e.clientX, rect) }));
  }, [getPercentage]);

  const handleTouchMove = useCallback((id: number, e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSliderPositions((prev) => ({ ...prev, [id]: getPercentage(e.touches[0].clientX, rect) }));
  }, [getPercentage]);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm text-violet-700 mb-4">
            <ArrowLeftRight className="h-4 w-4" />
            Sonuçlarımız
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Önce & Sonra
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Tedavi sonuçlarımızı kendiniz karşılaştırın
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {beforeAfterCases.map((testCase) => {
            const pos = sliderPositions[testCase.id];
            return (
              <div key={testCase.id} className="space-y-4">
                <div
                  className="relative rounded-2xl overflow-hidden cursor-ew-resize aspect-[4/3]"
                  style={{ touchAction: "none" }}
                  onMouseMove={(e) => handleSliderMove(testCase.id, e)}
                  onTouchMove={(e) => handleTouchMove(testCase.id, e)}
                >
                  {/* After Image (Background) */}
                  <img
                    src={testCase.after}
                    alt={`${testCase.title} - Sonra`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Before Image (Clipped via clip-path) */}
                  <img
                    src={testCase.before}
                    alt={`${testCase.title} - Önce`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                  />
                  {/* Slider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                    style={{ left: `${pos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <ArrowLeftRight className="h-5 w-5 text-slate-600" />
                    </div>
                  </div>
                  {/* Labels */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm z-20">
                    Önce
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-sky-500 text-white text-xs rounded-full z-20">
                    Sonra
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{testCase.title}</h3>
                  <p className="text-sm text-slate-600">{testCase.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
