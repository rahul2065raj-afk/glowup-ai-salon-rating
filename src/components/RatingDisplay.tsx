
import React from 'react';
import { AnalysisResult } from '../../types';
import { Star, TrendingUp, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface RatingDisplayProps {
  analysis: AnalysisResult;
  onNext: () => void;
  nextLabel: string;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ analysis, onNext, nextLabel }) => {
  const data = [
    { name: 'Hairstyle', value: analysis.breakdown.hairstyle, color: '#f59e0b' },
    { name: 'Color', value: analysis.breakdown.color, color: '#fbbf24' },
    { name: 'Face Balance', value: analysis.breakdown.faceShape, color: '#fcd34d' },
    { name: 'Grooming', value: analysis.breakdown.grooming, color: '#d97706' },
    { name: 'Trend', value: analysis.breakdown.trend, color: '#b45309' },
  ];

  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star 
      key={i} 
      size={24} 
      className={i < Math.floor(analysis.overallRating) ? "text-yellow-500 fill-yellow-500" : "text-white/20"} 
    />
  ));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-gradient-to-br from-yellow-500/20 to-transparent p-1 rounded-3xl">
        <div className="bg-neutral-900 rounded-3xl p-8 text-center space-y-4">
          <div className="text-sm font-bold uppercase tracking-widest text-yellow-500">Your Style Score</div>
          <div className="flex flex-col items-center">
            <span className="text-7xl font-serif leading-none">{analysis.overallRating.toFixed(1)}</span>
            <span className="text-white/30 text-lg">/ 5.0</span>
          </div>
          <div className="flex justify-center gap-1">
            {stars}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] uppercase text-white/40 mb-1">Face Shape</div>
          <div className="font-semibold">{analysis.details.faceShape}</div>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="text-[10px] uppercase text-white/40 mb-1">Color Palette</div>
          <div className="font-semibold">{analysis.details.colorTone}</div>
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
          <TrendingUp size={16} className="text-yellow-500" />
          Style Breakdown
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={80} 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-yellow-500 text-black font-bold py-5 rounded-2xl shadow-xl shadow-yellow-500/10 hover:bg-yellow-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default RatingDisplay;
