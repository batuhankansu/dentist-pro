"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    alt: "Modern kliniğimiz",
    category: "Klinik",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    alt: "Tedavi odası",
    category: "Ekipman",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    alt: "Doktorlarımız",
    category: "Ekip",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
    alt: "Bekleme salonu",
    category: "Klinik",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80",
    alt: "Diş beyazlatma",
    category: "Tedavi",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    alt: "İmplant tedavisi",
    category: "Tedavi",
  },
];

export function ClinicGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigate = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    if (direction === "next") {
      setSelectedImage(
        selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    } else {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm text-emerald-700 mb-4">
            Kliniğimiz
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Klinik Galerimiz
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Modern ve hijyenik klinik ortamımızı keşfedin
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-medium">{image.alt}</p>
                <p className="text-sm text-white/80">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={() => navigate("prev")}
            className="absolute left-4 p-2 text-white/80 hover:text-white"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
          <button
            onClick={() => navigate("next")}
            className="absolute right-4 p-2 text-white/80 hover:text-white"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="absolute bottom-4 text-white text-center">
            <p className="font-medium">{galleryImages[selectedImage].alt}</p>
            <p className="text-sm text-white/60">
              {selectedImage + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
