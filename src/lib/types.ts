export interface AnalyzeRequest {
  productName: string;
  market: "欧美" | "东南亚" | "全球";
  platform: "TikTok" | "Amazon" | "Xiaohongshu";
  userPainPoints?: string;
}

export interface MarketAnalysis {
  trend_level: "Low" | "Medium" | "High";
  competition: "Low" | "Medium" | "High";
  recommend_score: number;
  should_launch: boolean;
}

export interface UserProfile {
  target_audience: string;
  pain_points: string[];
  purchase_motivation: string[];
}

export interface Content {
  tiktok: string[];
  xiaohongshu: string[];
  amazon: string[];
}

export interface Insights {
  why_it_works: string;
  growth_logic: string;
}

export interface AnalyzeResponse {
  market_analysis: MarketAnalysis;
  user_profile: UserProfile;
  content: Content;
  insights: Insights;
}

export type AnalysisStatus = "idle" | "loading" | "success" | "error";
