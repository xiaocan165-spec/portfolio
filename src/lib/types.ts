// ─── Request ──────────────────────────────────────────────
export interface AnalyzeRequest {
  productName: string;
  market: "欧美" | "东南亚" | "全球";
  platform: "TikTok" | "Amazon" | "Xiaohongshu";
  userPainPoints?: string;
}

// ─── Scoring Dimension ─────────────────────────────────────
export interface ScoreDimension {
  score: number; // 0-10
  reason: string;
}

// ─── Scoring ───────────────────────────────────────────────
export interface Scoring {
  market_demand: ScoreDimension;   // 市场需求
  competition: ScoreDimension;     // 竞争强度（分数高=竞争低/机会大）
  profit_margin: ScoreDimension;   // 利润空间
  logistics: ScoreDimension;       // 物流难度（分数高=容易）
  repurchase: ScoreDimension;      // 复购潜力
  differentiation: ScoreDimension; // 差异化空间
}

// ─── Cross-border Metrics ──────────────────────────────────
export interface CrossBorderMetrics {
  market_maturity: "低" | "中" | "高";
  price_range: string;            // e.g. "$29–$49"
  profitability: "低" | "中" | "高";
  supply_chain_difficulty: "低" | "中" | "高";
  shipping_risk: "低" | "中" | "高";
  ad_competition: "低" | "中" | "高";
}

// ─── Competitor ────────────────────────────────────────────
export interface CompetitorAnalysis {
  brands: string[];               // e.g. ["Anker", "JBL", "TOZO"]
  characteristics: string[];      // e.g. ["价格竞争激烈", "用户评价内卷"]
}

// ─── Risk ──────────────────────────────────────────────────
export interface RiskItem {
  risk: string;                   // e.g. "同质化严重"
  severity: "低" | "中" | "高";
}

// ─── Opportunity ───────────────────────────────────────────
export interface OpportunityItem {
  opportunity: string;            // e.g. "细分场景切入"
  action: string;                 // e.g. "聚焦户外露营场景..."
}

// ─── Content (upgraded) ────────────────────────────────────
export interface Content {
  tiktok_pain: string[];          // 痛点型标题 x3
  tiktok_scene: string[];         // 场景型标题 x3
  tiktok_curiosity: string[];     // 好奇心型标题 x3
  xiaohongshu: string[];          // 种草文案
  amazon_seo: string[];           // SEO 标题
  ad_copy: string[];             // 广告卖点 x5
}

// ─── Why It Works ──────────────────────────────────────────
export interface WhyItWorks {
  summary: string;                // ≤100 字
  growth_logic: string;           // 增长飞轮
}

// ─── Analysis Confidence ───────────────────────────────────
export interface AnalysisConfidence {
  score: number;                  // 0-100
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
}

// ─── User Profile (kept from V1, slightly enhanced) ────────
export interface UserProfile {
  target_audience: string;
  pain_points: string[];
  purchase_motivation: string[];
}

// ─── Status ────────────────────────────────────────────────
export type AnalysisStatus = "idle" | "loading" | "success" | "error";
