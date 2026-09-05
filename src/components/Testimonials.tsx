import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonialsData } from "../data";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[activeIdx];

  return (
    <section id="testimonials" className="py-24 bg-slate-950/40 relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-xs sm:text-sm tracking-widest text-primary uppercase mb-2">
            COLLEAGUE RECOMMENDATIONS
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Professional Testimonials
          </h3>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Hear from campus directors, public division leads, and consulting architects on system reliabilities and audit outcomes.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonials Slide Frame */}
        <div className="max-w-4xl mx-auto relative" id="testimonials-carousel">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border-white/5 shadow-2xl relative flex flex-col md:flex-row gap-8 items-center md:items-start"
            >
              {/* Quote Absolute Marker */}
              <Quote className="absolute top-6 right-8 w-16 h-16 text-primary/10 pointer-events-none" />

              {/* Colleague Photo Frame */}
              <div className="flex-shrink-0 text-center space-y-3">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-accent mx-auto shadow-xl">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full bg-slate-850"
                  />
                </div>
                
                {/* Visual Stars */}
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </div>

              {/* Recommendation Narrative */}
              <div className="space-y-6 flex-grow text-center md:text-left">
                <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed italic">
                  "{current.content}"
                </p>

                {/* Identity Credits */}
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-base sm:text-lg text-white">
                    {current.name}
                  </h4>
                  <p className="text-slate-400 font-medium text-xs sm:text-sm flex flex-wrap items-center justify-center md:justify-start gap-1.5">
                    <span>{current.role}</span>
                    <span className="text-primary hidden sm:inline">•</span>
                    <span className="text-accent">{current.company}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Carousel Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-primary text-slate-400 hover:text-white transition-all interactive"
              aria-label="Previous recommendation"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-slate-500">
              {activeIdx + 1} / {testimonialsData.length}
            </span>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-primary text-slate-400 hover:text-white transition-all interactive"
              aria-label="Next recommendation"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
