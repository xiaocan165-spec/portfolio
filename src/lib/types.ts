// ─── Request ──────────────────────────────────────────────
export type Market = "中国大陆" | "欧美" | "东南亚" | "全球";
export type Platform =
  | "Amazon" | "TikTok Shop" | "Shopify"
  | "Shopee" | "Lazada"
  | "抖音" | "淘宝" | "京东" | "拼多多" | "小红书";

export interface AnalyzeRequest {
  productName: string;
  market: Market;
  platform: Platform;
  userPainPoints?: string;
}

// ─── Platform → Market mapping (V4: market-aware pools) ────
export const MARKET_PLATFORMS: Record<Market, Platform[]> = {
  中国大陆: ["抖音", "淘宝", "京东", "拼多多", "小红书"],
  欧美: ["Amazon", "TikTok Shop", "Shopify"],
  东南亚: ["Shopee", "Lazada", "TikTok Shop"],
  全球: ["Amazon", "TikTok Shop", "Shopee", "抖音", "淘宝"],
};

// ─── Scoring Dimension ─────────────────────────────────────
export interface ScoreDimension {
  score: number;
  reason: string;
}

// ─── Scoring ───────────────────────────────────────────────
export interface Scoring {
  market_demand: ScoreDimension;
  competition: ScoreDimension;
  profit_margin: ScoreDimension;
  logistics: ScoreDimension;
  repurchase: ScoreDimension;
  differentiation: ScoreDimension;
}

// ─── Cross-border Metrics ──────────────────────────────────
export interface CrossBorderMetrics {
  market_maturity: "低" | "中" | "高";
  price_range: string;
  profitability: "低" | "中" | "高";
  supply_chain_difficulty: "低" | "中" | "高";
  shipping_risk: "低" | "中" | "高";
  ad_competition: "低" | "中" | "高";
}

// ─── Platform Match (V4 enhanced) ─────────────────────────
export interface PlatformMatch {
  platform: string;
  score: number;
  grade: string;            // "★★★★★"
  strengths: string[];      // 2-3 advantages
  weaknesses: string[];     // 2-3 disadvantages
  reason: string;
}

// ─── Viral Potential (V4 enhanced) ────────────────────────
export interface ViralPotential {
  score: number;
  grade: "A" | "B" | "C";
  dimensions: {
    market_demand: number;
    competition: number;
    profit_margin: number;
    content_spread: number;
  };
  reasons: string[];
}

// ─── Content Strategy ──────────────────────────────────────
export interface ContentStrategy {
  strategies: string[];
  why: string;
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

// ─── Content (V4: platform-aware fields) ──────────────────
export interface Content {
  // China platforms
  douyin?: DouyinContent;
  taobao?: TaobaoContent;
  jd?: JDContent;
  pinduoduo?: PDDContent;
  xiaohongshu?: string[];
  // Overseas platforms
  amazon?: AmazonContent;
  tiktok_shop?: TikTokShopContent;
  shopify?: ShopifyContent;
  shopee?: ShopeeContent;
  lazada?: LazadaContent;
  // Legacy compat
  tiktok_pain?: string[];
  tiktok_scene?: string[];
  tiktok_curiosity?: string[];
  amazon_seo?: string[];
  ad_copy?: string[];
}

export interface DouyinContent {
  titles: string[];         // 爆款标题 x3
  hook: string;             // 视频开场钩子
  comment_guide: string;    // 评论区互动
  selling_points: string[]; // 核心卖点
}

export interface TaobaoContent {
  title: string;            // 商品标题
  keywords: string[];       // 搜索关键词
  selling_points: string[]; // 详情卖点
}

export interface JDContent {
  seo_title: string;
  advantages: string[];
  buying_reasons: string[];
}

export interface PDDContent {
  activity_title: string;
  traffic_copy: string;
  conversion_copy: string;
}

export interface AmazonContent {
  seo_title: string;
  bullet_points: string[];
  search_terms: string[];
}

export interface TikTokShopContent {
  video_title: string;
  script: string;
  comment_engagement: string;
}

export interface ShopifyContent {
  brand_story: string;
  product_description: string;
  ad_copy: string[];
}

export interface ShopeeContent {
  title: string;
  selling_points: string[];
  promo_copy: string;
}

export interface LazadaContent {
  title: string;
  advantages: string[];
  description: string;
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
