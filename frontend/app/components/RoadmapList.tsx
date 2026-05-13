"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  topics?: string[];
  resources: string[];
  time?: string;
}

interface Roadmap {
  id: number;
  title: string;
  level: string;
  description: string;
  tags: string[];
  estimated_time?: string;
  prerequisites?: string[];
  steps?: Step[];
}

export default function RoadmapList() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roadmaps`)
      .then(res => res.json())
      .then(data => {
        setRoadmaps(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch roadmaps:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roadmaps.map((roadmap) => (
          <motion.div
            key={roadmap.id}
            whileHover={{ y: -5 }}
            className="glass p-6 flex flex-col h-full border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
            onClick={() => setSelectedRoadmap(roadmap)}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                {roadmap.level}
              </span>
              <Layers size={18} className="text-white/20 group-hover:text-primary transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-white">{roadmap.title}</h3>
            <p className="text-white/50 text-sm mb-6 flex-grow leading-relaxed">
              {roadmap.description}
            </p>

            {roadmap.estimated_time && (
              <div className="mb-4 text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                Duration: <span className="text-white/70">{roadmap.estimated_time}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-6">
              {roadmap.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 text-white/70">
                  {tag}
                </span>
              ))}
            </div>
            
            <button 
              className="flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors group"
            >
              Explore Roadmap
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Roadmap Detail Modal */}
      <AnimatePresence>
        {selectedRoadmap && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRoadmap(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] glass border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                      {selectedRoadmap.level}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white">{selectedRoadmap.title}</h2>
                  </div>
                  <p className="text-white/60 text-lg max-w-2xl">{selectedRoadmap.description}</p>
                </div>
                <div className="flex flex-col gap-2 items-start md:items-end">
                  {selectedRoadmap.estimated_time && (
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-white/40 uppercase block">Est. Time</span>
                      <span className="text-white font-bold">{selectedRoadmap.estimated_time}</span>
                    </div>
                  )}
                  <button 
                    onClick={() => setSelectedRoadmap(null)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-white border border-white/10"
                  >
                    <ArrowRight className="rotate-180" size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-full">
                  {/* Sidebar with Prerequisites */}
                  <div className="p-8 border-r border-white/10 bg-black/20">
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Prerequisites</h3>
                    <ul className="space-y-4">
                      {selectedRoadmap.prerequisites?.map((pre, i) => (
                        <li key={i} className="flex gap-3 text-sm text-white/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {pre}
                        </li>
                      )) || <li className="text-sm text-white/30 italic">No prerequisites listed.</li>}
                    </ul>

                    <div className="mt-12">
                      <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRoadmap.tags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Steps Content */}
                  <div className="lg:col-span-2 p-8">
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                        <Layers size={20} />
                      </span>
                      Your Learning Path
                    </h3>

                    <div className="space-y-12 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:to-transparent">
                      {selectedRoadmap.steps?.map((step, index) => (
                        <div key={index} className="relative pl-14 group">
                          <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold text-primary z-10 shadow-lg group-hover:scale-110 transition-transform">
                            {index + 1}
                          </div>
                          
                          <div className="glass p-6 border border-white/10 group-hover:border-primary/30 transition-all bg-white/[0.02]">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                              <h4 className="text-xl font-bold text-white">{step.title}</h4>
                              {step.time && (
                                <span className="text-[10px] font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 uppercase tracking-wide">
                                  {step.time}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-white/60 text-sm mb-6 leading-relaxed">{step.description}</p>
                            
                            {step.topics && (
                              <div className="mb-6">
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-3">Key Topics to Cover:</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {step.topics.map(topic => (
                                    <div key={topic} className="flex items-center gap-2 text-xs text-white/50">
                                      <div className="w-1 h-1 rounded-full bg-white/20" />
                                      {topic}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div>
                              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-3">Recommended Resources:</span>
                              <div className="flex flex-wrap gap-2">
                                {step.resources.map(res => (
                                  <span key={res} className="text-[10px] bg-primary/5 text-primary/80 hover:text-primary px-3 py-1.5 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
                                    {res}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
                <button 
                  onClick={() => setSelectedRoadmap(null)}
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95"
                >
                  Start Learning Journey
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
