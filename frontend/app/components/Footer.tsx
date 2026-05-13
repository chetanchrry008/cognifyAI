import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden glass border border-white/10 p-1">
            <Image src="/logo.png" alt="Cognify AI" width={32} height={32} className="object-contain" />
          </div>
          <span className="text-lg font-bold text-white/90">CognifyAI</span>
        </div>
        <div className="text-white/40 text-sm">
          © 2024 Cognify AI. All rights reserved. Built for the future of education.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-white/40 hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">Discord</a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
