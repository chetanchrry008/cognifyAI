"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Server, AlertCircle } from 'lucide-react';

export default function BackendStatus() {
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/health`);
        if (response.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      } catch (error) {
        setStatus('offline');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed bottom-24 right-8 z-40 glass px-4 py-2 flex items-center gap-3 border ${
        status === 'online' ? 'border-accent/20' : status === 'offline' ? 'border-red-500/20' : 'border-white/10'
      }`}
    >
      <div className="flex items-center gap-2">
        {status === 'loading' && <Activity size={16} className="text-white/40 animate-pulse" />}
        {status === 'online' && <Server size={16} className="text-accent" />}
        {status === 'offline' && <AlertCircle size={16} className="text-red-500" />}
        
        <span className="text-xs font-medium uppercase tracking-wider">
          {status === 'loading' ? 'Checking FastAPI...' : `FastAPI: ${status}`}
        </span>
      </div>
      
      {status === 'online' && (
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      )}
    </motion.div>
  );
}
