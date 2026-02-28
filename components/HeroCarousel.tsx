'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    title: "The Summer Collection",
    subtitle: "Discover perfect pieces for your warm weather wardrobe at up to 40% off.",
    cta: "Shop Clothing",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=80",
    title: "Upgrade Your Tech",
    subtitle: "From premium audio to smart home devices, find the tools to power your life.",
    cta: "Explore Electronics",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=1600&q=80",
    title: "Elevate Your Space",
    subtitle: "Handcrafted furniture and minimal home decor for modern living.",
    cta: "View Home & Kitchen",
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-muted overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Text Content */}
          <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-xl text-white"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                {slides[current].title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
                {slides[current].subtitle}
              </p>
              <Button 
                size="lg" 
                className="text-base h-14 px-8 rounded-full shadow-lg group"
                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              >
                {slides[current].cta}
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
