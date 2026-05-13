"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Bot, 
  ArrowRight, 
  BrainCircuit, 
  Rocket, 
  Star,
  Globe,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AIAnswerCard from "./components/AIAnswerCard";
import AIChatInterface from "./components/AIChatInterface";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold text-primary mb-8">
            <Sparkles size={14} />
            <span>THE FUTURE OF LEARNING IS HERE</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Master Any Skill with <br />
            <span className="text-gradient">AI-Powered Roadmaps</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Personalized learning paths tailored to your pace. Get instant AI assistance, 
            interactive quizzes, and real-time progress tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/roadmaps" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all">
              Explore Roadmaps
              <ArrowRight size={20} />
            </Link>
            <Link href="/courses" className="w-full sm:w-auto flex items-center justify-center gap-2 glass border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all">
              <Bot size={20} className="text-primary" />
              View Courses
            </Link>
          </div>
        </motion.div>

        {/* Floating Feature Cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AIAnswerCard onOpenFullChat={() => setIsChatOpen(true)} />

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-8 text-left border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Rocket size={80} />
            </div>
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 text-secondary">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Custom Roadmaps</h3>
            <p className="text-white/50 leading-relaxed">
              Enter your goal and we'll generate a complete learning path from zero to hero.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-8 text-left border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Globe size={80} />
            </div>
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 text-accent">
              <Star size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Global Community</h3>
            <p className="text-white/50 leading-relaxed">
              Learn together with thousands of students. Share projects and get feedback.
            </p>
          </motion.div>
        </div>

        {/* AI Floating Button */}
        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button 
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-3 bg-gradient-to-tr from-primary to-secondary p-4 rounded-2xl shadow-2xl shadow-primary/30 group"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg">
              <Bot size={20} className="text-white" />
            </div>
            <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap font-bold text-white pr-2">
              Ask AI Assistant
            </span>
          </button>
        </motion.div>

        {/* AI Chat Modal */}
        <AIChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </main>
  );
}
