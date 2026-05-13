"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Send, Loader2, BrainCircuit, Maximize2 } from "lucide-react";

export default function AIAnswerCard({ onOpenFullChat }: { onOpenFullChat?: () => void }) {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setAnswer(data.response);
    } catch (error) {
      console.error("Error fetching AI answer:", error);
      setAnswer("Sorry, I couldn't get an answer at the moment. Please check if the backend is running and Gemini API key is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      id="ai-answers"
      whileHover={{ y: -5 }}
      className="glass p-8 text-left border border-white/10 relative overflow-hidden group min-h-[320px] flex flex-col scroll-mt-32"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <BrainCircuit size={80} />
      </div>
      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary">
        <Zap size={24} />
      </div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-white">Instant AI Answers</h3>
        {onOpenFullChat && (
          <button 
            onClick={onOpenFullChat}
            className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
            title="Open Full Chat"
          >
            <Maximize2 size={18} />
          </button>
        )}
      </div>
      
      <div className="flex-1 mb-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {answer ? (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white/80 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 h-[120px] overflow-y-auto custom-scrollbar"
            >
              {answer}
            </motion.div>
          ) : (
            <motion.p 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/50 leading-relaxed text-sm"
            >
              Stuck on a concept? Our AI tutor provides clear, step-by-step explanations instantly. Ask any question below!
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="relative mt-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </form>
    </motion.div>
  );
}
