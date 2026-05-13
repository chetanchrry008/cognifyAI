"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? "glass border-b border-white/10 py-3" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden glass border border-white/10 p-1">
            <Image 
              src="/logo.png" 
              alt="Cognify AI Logo" 
              width={40} 
              height={40} 
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Cognify<span className="text-primary">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/courses" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Courses</Link>
          <Link href="/roadmaps" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Roadmaps</Link>
          <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Community</Link>
        </div>


      </div>
    </nav>
  );
}
