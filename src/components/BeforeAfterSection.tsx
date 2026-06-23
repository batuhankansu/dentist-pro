"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

const beforeAfterCases = [
  {
    id: 1,
    title: "Diş Beyazlatma",
    description: "Profesyonel beyazlatma ile 4 ton beyazlama",
    before: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=450&fit=crop",
    after: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&h=450&fit=crop",
  },
  {
    id: 2,
    title: "İmplant Tedavisi",
    description: "Tek diş implant ile doğal görünüm",
    before: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=450&fit=crop",
    after: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=450&fit=crop",
  },
  {
    id: 3,
    title: "Ortodonti",
    description: "Şeffaf plak ile düzgün dişler",
    before: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=450&fit=crop",
    after: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&h=450&fit=crop",
  },
];

export function BeforeAfterSection() {
  const [sliderPositions, setSliderPositions] = useState<Record<number, number>>(
    () => Object.fromEntries(beforeAfterCases.map((c) => [c.id, 50]))
  );

  const handleSliderMove = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPositions((prev) => ({ ...prev, [id]: percentage }));
  };

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
          {beforeAfterCases.map((testCase) => (
            <div key={testCase.id} className="space-y-4">
              <div
                className="relative rounded-2xl overflow-hidden cursor-ew-resize aspect-[4/3]"
                onMouseMove={(e) => handleSliderMove(testCase.id, e)}
              >
                {/* After Image (Background) */}
                <img
                  src={testCase.after}
                  alt={`${testCase.title} - Sonra`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Before Image (Clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPositions[testCase.id]}%` }}
                >
                  <img
                    src={testCase.before}
                    alt={`${testCase.title} - Önce`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ width: "100vw", maxWidth: "none" }}
                  />
                </div>
                {/* Slider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                  style={{ left: `${sliderPositions[testCase.id]}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <ArrowLeftRight className="h-5 w-5 text-slate-600" />
                  </div>
                </div>
                {/* Labels */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                  Önce
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-sky-500 text-white text-xs rounded-full">
                  Sonra
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{testCase.title}</h3>
                <p className="text-sm text-slate-600">{testCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
