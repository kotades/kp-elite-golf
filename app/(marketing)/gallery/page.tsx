"use client";

import React, { useState } from "react";
import Image from "next/image";
import { galleryItems } from "@/constants";
import {
  Image as ImageIcon,
  ZoomIn,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Activity,
  Layers,
} from "lucide-react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Biomechanics Lab",
    "Short Game",
    "Facility",
    "Full Swing",
    "Course Management",
  ];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const nextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="py-16 bg-[#0D1117] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#154734]/50 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <ImageIcon className="size-3.5" />
            Visual Evidence & Academy Tour
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Biomechanics Lab & <span className="gold-gradient-text">Facility Gallery</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Take a visual tour inside our PGA training bays, high-speed 3D motion capture cameras, TrackMan dual radar suites, and pristine short game greens.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#D4AF37] text-[#0B2B1F] shadow-lg"
                  : "bg-[#161B22] text-gray-400 hover:text-white border border-[#30363D]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#161B22] border border-[#30363D] cursor-pointer hover:border-[#D4AF37]/60 shadow-xl transition-all"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#30363D] text-[10px] font-bold text-[#D4AF37] uppercase">
                  {item.category}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 size-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="size-4 text-[#D4AF37]" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h3 className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {currentItem && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 size-10 rounded-full bg-[#161B22] border border-[#30363D] flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="size-5" />
            </button>

            {/* Navigation */}
            <button
              onClick={prevItem}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 size-12 rounded-2xl bg-[#161B22] border border-[#30363D] flex items-center justify-center text-white hover:border-[#D4AF37] transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>

            <button
              onClick={nextItem}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 size-12 rounded-2xl bg-[#161B22] border border-[#30363D] flex items-center justify-center text-white hover:border-[#D4AF37] transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Main Lightbox Content */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full rounded-3xl bg-[#161B22] border border-[#30363D] overflow-hidden shadow-2xl space-y-4"
            >
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={currentItem.image}
                  alt={currentItem.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    {currentItem.category}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    {lightboxIndex! + 1} of {filteredItems.length}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {currentItem.title}
                </h3>
                <p className="text-sm text-gray-300">
                  {currentItem.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
