export interface CurveDataPoint {
  time: number;
  flux: number;
}

export interface AnalysisResult {
  isExoplanet: boolean;
  confidence: number;
  dipCount: number;
  std: number;
  message: string;
  crossRef: {
    catalog: string;
    match: string;
    distance: string;
    confidence: number;
  };
}

export interface SavedAnalysis {
  id: number;
  filename: string;
  timestamp: string;
  result: AnalysisResult;
  coordinate: string;
  description: string;
  isPrivate: boolean;
  credits: number;
}

export interface ForumPost {
  id: number;
  author: string;
  title: string;
  description: string;
  confidence: number;
  isExoplanet: boolean;
  votes: number;
  crossRefData: {
    catalog: string;
    match: string;
    distance: string;
  };
  timestamp: string;
  coordinate: string;
}
