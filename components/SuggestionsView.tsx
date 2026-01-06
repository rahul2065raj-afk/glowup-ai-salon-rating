
import React from 'react';
import { AnalysisResult } from '../types';
import { Sparkles, CheckCircle2, Scissors, Palette, Lightbulb } from 'lucide-react';

interface SuggestionsViewProps {
  analysis: AnalysisResult;
  onNext: () => void;
}

const SuggestionsView: React.FC<SuggestionsViewProps> = ({ analysis, onNext }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-serif">Styling Advice</h2>
        <p className="text-white/50">Personalized expert recommendations for your transformation</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
              <Scissors className="text-yellow-500" size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-yellow-500 uppercase text-xs tracking-widest">Recommended Hairstyle</h3>
              <p className="text-white/90 leading-relaxed">{analysis.suggestions.hairstyle}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Palette className="text-amber-500" size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-amber-500 uppercase text-xs tracking-widest">Color Suggestions</h3>
              <p className="text-white/90 leading-relaxed">{analysis.suggestions.hairColor}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
              <Lightbulb className="text-orange-500" size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-orange-500 uppercase text-xs tracking-widest">Expert Grooming Tips</h3>
              <ul className="space-y-3 pt-2">
                {analysis.suggestions.groomingTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                    <CheckCircle2 size={16} className="text-yellow-500 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/5 p-6 rounded-3xl border border-yellow-500/20">
            <div className="flex items-center gap-3 mb-2 text-yellow-500">
                <Sparkles size={20} />
                <h3 className="font-serif italic text-lg">Salon's Take</h3>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
                {analysis.suggestions.styleAdvice}
            </p>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-white text-black font-bold py-5 rounded-2xl shadow-xl hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
      >
        Done with Service? Take Final Photo
      </button>
    </div>
  );
};

export default SuggestionsView;
