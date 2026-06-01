// ─── Request ──────────────────────────────────────────────
export type Market = "中国大陆" | "欧美" | "东南亚" | "全球";
export type Platform =
  // 海外
  | "Amazon" | "TikTok Shop" | "Shopee" | "Lazada"
  // 国内
  | "抖音" | "淘宝" | "京东" | "拼多多" | "小红书";

export interface AnalyzeRequest {
  productName: string;
  market: Market;
  platform: Platform;
  userPainPoints?: string;
}

// ─── Platform → Market mapping (for form filtering) ────────
export const MARKET_PLATFORMS: Record<Market, Platform[]> = {
  中国大陆: ["抖音", "淘宝", "京东", "拼多多", "小红书"],
  欧美: ["Amazon", "TikTok Shop", "Shopee", "Lazada"],
  东南亚: ["Shopee", "Lazada", "TikTok Shop", "Amazon"],
  全球: ["Amazon", "TikTok Shop", "Shopee", "Lazada", "抖音", "淘宝", "京东", "拼多多", "小红书"],
};

// ─── Scoring Dimension ─────────────────────────────────────
export interface ScoreDimension {
  score: number; // 0-10
  reason: string;
}

// ─── Scoring ───────────────────────────────────────────────
export interface Scoring {
  market_demand: ScoreDimension;   // 市场需求
  competition: ScoreDimension;     // 竞争友好度（分数高=竞争低/机会大）
  profit_margin: ScoreDimension;   // 利润空间
  logistics: ScoreDimension;       // 物流友好度（分数高=容易）
  repurchase: ScoreDimension;      // 复购潜力
  differentiation: ScoreDimension; // 差异化空间
}

// ─── Cross-border Metrics ──────────────────────────────────
export interface CrossBorderMetrics {
  market_maturity: "低" | "中" | "高";
  price_range: string;            // ¥ or $ depending on market
  profitability: "低" | "中" | "高";
  supply_chain_difficulty: "低" | "中" | "高";
  shipping_risk: "低" | "中" | "高";
  ad_competition: "低" | "中" | "高";
}

// ─── Platform Match ────────────────────────────────────────
export interface PlatformMatch {
  platform: string;
  score: number;  // 0-10
  reason: string;
}

// ─── Viral Potential ───────────────────────────────────────
export interface ViralPotential {
  score: number;          // 0-100
  grade: "A" | "B" | "C";
  reasons: string[];      // 3条判断依据
}

// ─── Content Strategy ──────────────────────────────────────
export interface ContentStrategy {
  strategies: string[];   // 推荐打法，如 ["痛点营销", "场景营销"]
  why: string;            // 推荐原因
}

// ─── Competitor ────────────────────────────────────────────
export interface CompetitorAnalysis {
  brands: string[];
  characteristics: string[];
}

// ─── Risk ──────────────────────────────────────────────────
export interface RiskItem {
  risk: string;
  severity: "低" | "中" | "高";
}

// ─── Opportunity ───────────────────────────────────────────
export interface OpportunityItem {
  opportunity: string;
  action: string;
}

// ─── Content ───────────────────────────────────────────────
export interface Content {
  tiktok_pain: string[];
  tiktok_scene: string[];
  tiktok_curiosity: string[];
  xiaohongshu: string[];
  amazon_seo: string[];
  ad_copy: string[];
}

// ─── Why It Works ──────────────────────────────────────────
export interface WhyItWorks {
  summary: string;
  growth_logic: string;
}

// ─── Analysis Confidence ───────────────────────────────────
export interface AnalysisConfidence {
  score: number;
  reason: string;
}

// ─── Decision (computed by frontend) ───────────────────────
export type DecisionLevel = "强烈推荐" | "建议入场" | "谨慎评估" | "不建议入场";

export interface Decision {
  average_score: number;
  level: DecisionLevel;
  label: string;
}

// ─── Response ──────────────────────────────────────────────
export interface AnalyzeResponse {
  scoring: Scoring;
  cross_border_metrics: CrossBorderMetrics;
  user_profile: UserProfile;
  competitor_analysis: CompetitorAnalysis;
  risks: RiskItem[];
  opportunities: OpportunityItem[];
  content: Content;
  why_it_works: WhyItWorks;
  confidence: AnalysisConfidence;
  // V3新增
  platform_matches: PlatformMatch[];
  viral_potential: ViralPotential;
  content_strategy: ContentStrategy;
}

// ─── User Profile ──────────────────────────────────────────
export interface UserProfile {
  target_audience: string;
  pain_points: string[];
  purchase_motivation: string[];
}

// ─── Status ────────────────────────────────────────────────
export type AnalysisStatus = "idle" | "loading" | "success" | "error";
