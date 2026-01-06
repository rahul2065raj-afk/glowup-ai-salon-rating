
import React from 'react';
import { AnalysisResult } from '../types';
import { Trophy, ArrowRight, Share2, Calendar } from 'lucide-react';

interface ComparisonViewProps {
  beforePhoto: string;
  afterPhoto: string;
  beforeAnalysis: AnalysisResult;
  afterAnalysis: AnalysisResult;
  onReset: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ 
  beforePhoto, afterPhoto, beforeAnalysis, afterAnalysis, onReset 
}) => {
  const improvement = ((afterAnalysis.overallRating - beforeAnalysis.overallRating) / beforeAnalysis.overallRating * 100).toFixed(0);

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-serif">Transformation Complete</h2>
        <p className="text-white/50 text-sm">Behold your new look! What a difference.</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-3">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
            <img src={beforePhoto} className="w-full h-full object-cover grayscale" />
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] uppercase font-bold tracking-widest">Before</div>
          </div>
          <div className="text-center font-serif text-xl text-white/40">{beforeAnalysis.overallRating.toFixed(1)}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
            <ArrowRight className="text-yellow-500 animate-pulse" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-2xl shadow-yellow-500/20">
            <img src={afterPhoto} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-500 text-black rounded text-[10px] uppercase font-bold tracking-widest">After</div>
          </div>
          <div className="text-center font-serif text-2xl text-yellow-500">{afterAnalysis.overallRating.toFixed(1)}</div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-500 to-amber-600 p-[1px] rounded-3xl">
        <div className="bg-neutral-900 rounded-[23px] p-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2">
            <Trophy size={14} />
            Achievement Unlocked
          </div>
          <h3 className="text-3xl font-serif">+{improvement}% Improvement</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Your transformation successfully optimized your <strong>{afterAnalysis.details.faceShape}</strong> face shape with a <strong>{afterAnalysis.details.currentStyle}</strong> style. This is a massive upgrade in trend alignment and grooming!
          </p>
          
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-[2000ms]" 
              style={{ width: `${(afterAnalysis.overallRating / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          className="w-full bg-white text-black font-bold py-5 rounded-2xl shadow-xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-3 text-lg"
        >
          <Share2 size={20} />
          Share Your Look
        </button>
        <button 
          onClick={onReset}
          className="w-full bg-white/5 text-white/70 font-bold py-5 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
        >
          <Calendar size={20} />
          Book Next Appointment
        </button>
      </div>
    </div>
  );
};

export default ComparisonView;
