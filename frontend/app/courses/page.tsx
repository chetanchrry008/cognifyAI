"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import CourseSection from "../components/CourseSection";

export default function CoursesPage() {
  return (
    <main className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold text-secondary mb-8 uppercase tracking-widest">
            <Sparkles size={14} />
            <span>Premium Learning Content</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Explore Our <span className="text-secondary">Popular Courses</span>
          </h1>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Master new technologies with our expert-led video courses. 
            From beginner fundamentals to advanced specialized skills.
          </p>
        </motion.div>

        <section id="courses" className="pb-20">
          <div className="flex items-center justify-between mb-12">
            <div className="text-left">
              <h2 className="text-3xl font-bold text-white mb-2">Academic Catalog</h2>
              <p className="text-white/40">Find the perfect course to accelerate your career.</p>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm text-white/40">Showing all premium courses</span>
            </div>
          </div>
          <CourseSection />
        </section>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center pt-10 border-t border-white/5"
        >
          <Link 
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-white transition-all hover:scale-105 border border-white/10 group"
          >
            <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Home Page
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
