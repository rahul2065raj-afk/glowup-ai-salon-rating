import React, { useState, useCallback } from 'react';
import { AppState, Gender, AnalysisResult } from '../types';
import Layout from './components/Layout';
import PhotoStep from './components/PhotoStep';
import RatingDisplay from './components/RatingDisplay';
import SuggestionsView from './components/SuggestionsView';
import ComparisonView from './components/ComparisonView';
import { analyzeLook } from './services/geminiService';
import { User, UserPlus } from 'lucide-react';

const INITIAL_STATE: AppState = {
  gender: null,
  beforePhoto: null,
  beforeAnalysis: null,
  afterPhoto: null,
  afterAnalysis: null,
  step: 'GENDER',
  isAnalyzing: false,
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  const handleGenderSelect = (gender: Gender) => {
    setState(prev => ({ ...prev, gender, step: 'BEFORE_CAPTURE' }));
  };

  const handleBeforeCapture = async (imageData: string) => {
    setState(prev => ({ ...prev, beforePhoto: imageData, isAnalyzing: true }));
    try {
      const result = await analyzeLook(imageData, state.gender!);
      setState(prev => ({ 
        ...prev, 
        beforeAnalysis: result, 
        step: 'BEFORE_ANALYSIS', 
        isAnalyzing: false 
      }));
    } catch (error) {
      alert("Analysis failed. Please try again.");
      setState(prev => ({ ...prev, isAnalyzing: false }));
    }
  };

  const handleAfterCapture = async (imageData: string) => {
    setState(prev => ({ ...prev, afterPhoto: imageData, isAnalyzing: true }));
    try {
      const result = await analyzeLook(imageData, state.gender!);
      setState(prev => ({ 
        ...prev, 
        afterAnalysis: result, 
        step: 'COMPARISON', 
        isAnalyzing: false 
      }));
    } catch (error) {
      alert("Analysis failed. Please try again.");
      setState(prev => ({ ...prev, isAnalyzing: false }));
    }
  };

  const resetApp = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return (
    <Layout onReset={resetApp}>
      {state.step === 'GENDER' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-serif leading-tight">Define Your <br/><span className="text-yellow-500 italic">Signature Look</span></h1>
            <p className="text-white/50 max-w-[280px] mx-auto text-lg">AI-powered grooming analysis for the modern individual.</p>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => handleGenderSelect(Gender.BOY)}
              className="group relative bg-neutral-900 border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between hover:border-yellow-500/50 hover:bg-neutral-800/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-1 relative z-10 text-left">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">Gentleman</div>
                <div className="text-2xl font-serif">I'm a Boy</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User size={32} className="text-white/40 group-hover:text-yellow-500 transition-colors" />
              </div>
            </button>

            <button 
              onClick={() => handleGenderSelect(Gender.GIRL)}
              className="group relative bg-neutral-900 border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between hover:border-pink-500/50 hover:bg-neutral-800/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-1 relative z-10 text-left">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-pink-500">Elegant</div>
                <div className="text-2xl font-serif">I'm a Girl</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserPlus size={32} className="text-white/40 group-hover:text-pink-500 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      )}

      {state.step === 'BEFORE_CAPTURE' && (
        <PhotoStep 
          title="Initial Consultation"
          subtitle="Look straight into the mirror for a baseline analysis"
          onCapture={handleBeforeCapture}
          loading={state.isAnalyzing}
        />
      )}

      {state.step === 'BEFORE_ANALYSIS' && state.beforeAnalysis && (
        <RatingDisplay 
          analysis={state.beforeAnalysis} 
          onNext={() => setState(prev => ({ ...prev, step: 'SUGGESTIONS' }))}
          nextLabel="View Suggestions"
        />
      )}

      {state.step === 'SUGGESTIONS' && state.beforeAnalysis && (
        <SuggestionsView 
          analysis={state.beforeAnalysis}
          onNext={() => setState(prev => ({ ...prev, step: 'AFTER_CAPTURE' }))}
        />
      )}

      {state.step === 'AFTER_CAPTURE' && (
        <PhotoStep 
          title="Final Reveal"
          subtitle="Capture your new look to see the transformation results"
          onCapture={handleAfterCapture}
          loading={state.isAnalyzing}
        />
      )}

      {state.step === 'COMPARISON' && state.beforePhoto && state.afterPhoto && state.beforeAnalysis && state.afterAnalysis && (
        <ComparisonView 
          beforePhoto={state.beforePhoto}
          afterPhoto={state.afterPhoto}
          beforeAnalysis={state.beforeAnalysis}
          afterAnalysis={state.afterAnalysis}
          onReset={resetApp}
        />
      )}
    </Layout>
  );
};

export default App;
