
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onReset: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onReset }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500 selection:text-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onReset} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-200 flex items-center justify-center font-bold text-black text-sm group-hover:scale-110 transition-transform">
              G
            </div>
            <span className="font-serif text-xl tracking-tight">GlowUp AI</span>
          </button>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
            Premium Mirror
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-xl mx-auto">
        {children}
      </main>

      <footer className="max-w-xl mx-auto px-6 py-8 text-center">
        <p className="text-xs text-white/30">
          Rating is AI-generated and for grooming guidance only. <br/>
          Images are processed securely and not stored permanently.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
