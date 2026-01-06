
export enum Gender {
  BOY = 'BOY',
  GIRL = 'GIRL'
}

export interface RatingBreakdown {
  hairstyle: number;
  color: number;
  faceShape: number;
  grooming: number;
  trend: number;
}

export interface AnalysisResult {
  overallRating: number;
  breakdown: RatingBreakdown;
  details: {
    faceShape: string;
    hairType: string;
    currentStyle: string;
    colorTone: string;
  };
  suggestions: {
    hairstyle: string;
    hairColor: string;
    groomingTips: string[];
    styleAdvice: string;
  };
}

export interface AppState {
  gender: Gender | null;
  beforePhoto: string | null;
  beforeAnalysis: AnalysisResult | null;
  afterPhoto: string | null;
  afterAnalysis: AnalysisResult | null;
  step: 'GENDER' | 'BEFORE_CAPTURE' | 'BEFORE_ANALYSIS' | 'SUGGESTIONS' | 'AFTER_CAPTURE' | 'COMPARISON';
  isAnalyzing: boolean;
}
