"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Loader2, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AIChatInterface({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! I'm your Cognify AI tutor. How can I help you with your learning journey today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to connect");

      const data = await response.json();
      setMessages(prev => [...prev, { role: "ai", content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", content: "I'm having trouble connecting to my brain right now. Please check if the backend is running and the API key is configured." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-4xl h-[85vh] glass border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Bot size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    AI Learning Assistant
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </h2>
                  <p className="text-white/40 text-sm mt-0.5">Powered by Gemini AI • Your personal tutor</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white/10 rounded-2xl text-white/50 hover:text-white transition-all group"
              >
                <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-4 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      msg.role === 'user' ? 'bg-secondary text-white' : 'bg-white/10 text-primary border border-white/10'
                    }`}>
                      {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                    </div>
                    <div className={`p-5 rounded-[2rem] text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10' 
                        : 'glass border border-white/10 text-white/90 rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-primary flex items-center justify-center border border-white/10">
                      <Bot size={20} />
                    </div>
                    <div className="glass border border-white/10 p-5 rounded-[2rem] rounded-tl-none flex items-center gap-3">
                      <div className="flex gap-1">
                        <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      <span className="text-xs text-white/40 font-medium">Assistant is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 sm:p-8 bg-white/5 border-t border-white/10">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center gap-4 max-w-4xl mx-auto w-full"
              >
                <div className="relative flex-1 group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your tutor anything about your roadmap..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-7 pr-16 text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all shadow-inner"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary/50 transition-colors">
                    <Sparkles size={22} />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-5 bg-primary text-white rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-xl shadow-primary/20 flex-shrink-0"
                >
                  {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
