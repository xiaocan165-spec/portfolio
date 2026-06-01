import { AnalyzeRequest } from "./types";

export function buildPrompt(input: AnalyzeRequest): string {
  const painPointsHint = input.userPainPoints
    ? `\n用户提供的痛点线索：${input.userPainPoints}`
    : "";

  switch (input.market) {
    case "中国大陆":
      return buildChinaPrompt(input, painPointsHint);
    case "欧美":
      return buildUSPrompt(input, painPointsHint);
    case "东南亚":
      return buildSEAPrompt(input, painPointsHint);
    case "全球":
      return buildGlobalPrompt(input, painPointsHint);
  }
}

// ═══════════════════════════════════════════════════════════
// 中国大陆 Prompt
// ═══════════════════════════════════════════════════════════
function buildChinaPrompt(input: AnalyzeRequest, painPointsHint: string): string {
  return `你是一位资深国内电商运营顾问。分析产品，输出结构化JSON。

## 产品信息
- 产品名称：${input.productName}
- 市场：中国大陆
- 平台：${input.platform}${painPointsHint}

## 原则
1. 只评分和分析，不输出"建议入场/不建议入场"——系统自动计算。
2. 每项评分有具体原因。
3. 结合国内电商环境（抖音兴趣电商/淘宝搜索/拼多多社交/京东品质/小红书种草）。
4. 全部中文输出。
5. 直接返回JSON，不含markdown。

## 输出JSON结构

{
  "scoring": {
    "market_demand":    { "score": 0, "reason": "" },
    "competition":      { "score": 0, "reason": "" },
    "profit_margin":    { "score": 0, "reason": "" },
    "logistics":        { "score": 0, "reason": "" },
    "repurchase":       { "score": 0, "reason": "" },
    "differentiation":  { "score": 0, "reason": "" }
  },
  "cross_border_metrics": {
    "market_maturity": "",
    "price_range": "",
    "profitability": "",
    "supply_chain_difficulty": "",
    "shipping_risk": "",
    "ad_competition": ""
  },
  "user_profile": {
    "target_audience": "",
    "pain_points": ["","",""],
    "purchase_motivation": ["","",""]
  },
  "competitor_analysis": {
    "brands": ["","",""],
    "characteristics": ["","",""]
  },
  "risks": [
    { "risk": "", "severity": "" },
    { "risk": "", "severity": "" },
    { "risk": "", "severity": "" }
  ],
  "opportunities": [
    { "opportunity": "", "action": "" },
    { "opportunity": "", "action": "" },
    { "opportunity": "", "action": "" }
  ],
  "content": {},
  "why_it_works": { "summary": "", "growth_logic": "" },
  "confidence": { "score": 0, "reason": "" },
  "platform_matches": [
    { "platform": "", "score": 0, "grade": "", "strengths": ["",""], "weaknesses": ["",""], "reason": "" }
  ],
  "viral_potential": {
    "score": 0, "grade": "",
    "dimensions": { "market_demand": 0, "competition": 0, "profit_margin": 0, "content_spread": 0 },
    "reasons": ["","",""]
  },
  "content_strategy": { "strategies": ["","",""], "why": "" }
}

## 字段规范

### scoring（0-10分）
- market_demand：国内需求强度（抖音/淘宝搜索热度、品类趋势）
- competition：竞争友好度（高分=蓝海，低分=红海。考虑头部品牌垄断、白牌内卷）
- profit_margin：利润空间（拿货成本+平台佣金+快递+投流占比）
- logistics：物流友好度（高分=小件标品低退货，低分=大件易碎高退货）
- repurchase：复购潜力（消耗品高分，耐用品低分）
- differentiation：差异化空间（包装/场景/人群/功能微创新可能）

### cross_border_metrics（国内运营指标）
- market_maturity：品类成熟度（低/中/高）
- price_range：售价区间，如"¥29-¥69"
- profitability：利润率（低/中/高）
- supply_chain_difficulty：供应链难度（低/中/高）
- shipping_risk：发货风险（低/中/高）
- ad_competition：投流竞争（低/中/高）

### user_profile
- target_audience：年龄/性别/城市层级/消费能力/常用平台
- pain_points：3个场景化国内用户痛点
- purchase_motivation：3个购买动机

### competitor_analysis
- brands：国内主要竞品品牌3-5个（如小米/华为/完美日记/三只松鼠）
- characteristics：竞争特点3条

### risks（国内风险场景）
3条风险，结合国内电商实况（达人投流成本上涨/同质化内卷/平台规则变化/退货率高/价格战）

### opportunities（国内增长机会）
3条机会（达人带货/节日营销/直播转化/细分人群/内容种草）

### platform_matches（对以下5个平台全部打分）
1. 抖音 2. 淘宝 3. 京东 4. 拼多多 5. 小红书
每项包含：
- score：0-10匹配度
- grade：星级字符串（如"★★★★☆"）
- strengths：2-3条优势
- weaknesses：2-3条劣势
- reason：一句话总结

### viral_potential
- score：0-100
- grade：A/B/C
- dimensions：market_demand/competition/profit_margin/content_spread 四项0-10
- reasons：3条判断依据

### content_strategy
- strategies：推荐3种打法（短视频种草/直播转化/达人测评/场景营销/痛点营销/知识科普/价格对比/情感共鸣）
- why：推荐原因

### content（根据当前平台"${input.platform}"生成对应格式）
${getChinaContentSpec(input.platform)}

### why_it_works
- summary：100字内商业化总结
- growth_logic：增长飞轮

### confidence
- score：有痛点线索时78-88，无则60-75
- reason：可信度依据

直接返回JSON。`;
}

// ═══════════════════════════════════════════════════════════
// 欧美市场 Prompt
// ═══════════════════════════════════════════════════════════
function buildUSPrompt(input: AnalyzeRequest, painPointsHint: string): string {
  return `You are a senior cross-border e-commerce analyst with 10 years of Amazon/TikTok Shop experience. Analyze this product and output structured JSON.

## Product Info
- Product: ${input.productName}
- Market: US/Europe
- Platform: ${input.platform}${painPointsHint}

## Rules
1. Only score and analyze — never output "recommend" or "not recommend". The system computes that.
2. Every score needs a specific reason.
3. US/EU consumers: brand-conscious, quality-driven, eco-aware. High purchasing power but high expectations.
4. Output ONLY valid JSON, no markdown.

## JSON Structure

{
  "scoring": {
    "market_demand":    { "score": 0, "reason": "" },
    "competition":      { "score": 0, "reason": "" },
    "profit_margin":    { "score": 0, "reason": "" },
    "logistics":        { "score": 0, "reason": "" },
    "repurchase":       { "score": 0, "reason": "" },
    "differentiation":  { "score": 0, "reason": "" }
  },
  "cross_border_metrics": {
    "market_maturity": "",
    "price_range": "",
    "profitability": "",
    "supply_chain_difficulty": "",
    "shipping_risk": "",
    "ad_competition": ""
  },
  "user_profile": {
    "target_audience": "",
    "pain_points": ["","",""],
    "purchase_motivation": ["","",""]
  },
  "competitor_analysis": {
    "brands": ["","",""],
    "characteristics": ["","",""]
  },
  "risks": [
    { "risk": "", "severity": "" },
    { "risk": "", "severity": "" },
    { "risk": "", "severity": "" }
  ],
  "opportunities": [
    { "opportunity": "", "action": "" },
    { "opportunity": "", "action": "" },
    { "opportunity": "", "action": "" }
  ],
  "content": {},
  "why_it_works": { "summary": "", "growth_logic": "" },
  "confidence": { "score": 0, "reason": "" },
  "platform_matches": [
    { "platform": "", "score": 0, "grade": "", "strengths": ["",""], "weaknesses": ["",""], "reason": "" }
  ],
  "viral_potential": {
    "score": 0, "grade": "",
    "dimensions": { "market_demand": 0, "competition": 0, "profit_margin": 0, "content_spread": 0 },
    "reasons": ["","",""]
  },
  "content_strategy": { "strategies": ["","",""], "why": "" }
}

## Field Specs

### scoring (0-10 each)
- market_demand: Search volume trends, seasonal demand, category growth
- competition: Higher=less competition (blue ocean). Consider brand monopoly, review barriers, ad saturation
- profit_margin: Sourcing cost + FBA/storage fees + platform commission + ad spend
- logistics: Higher=easier (small/light/standard), lower=harder (oversized/fragile/certification needed)
- repurchase: Consumables/accessories score high, durables score low
- differentiation: Room for micro-innovation in materials, design, packaging, use case

### cross_border_metrics
- market_maturity: Low/Medium/High
- price_range: e.g. "$29-$49"
- profitability: Low/Medium/High
- supply_chain_difficulty: Low/Medium/High
- shipping_risk: Low/Medium/High (size, weight, fragility, return rate)
- ad_competition: Low/Medium/High (CPC costs)

### user_profile
- target_audience: Age, gender, income, identity, shopping behavior, platform influence
- pain_points: 3 scenario-specific pain points
- purchase_motivation: 3 motivations (emotional/functional/social/value-driven)

### competitor_analysis
- brands: 3-5 real competitors (e.g. Anker, Belkin, JBL, Ugreen)
- characteristics: 3 market traits

### risks (US/EU specific)
3 risks: brand moats / high CPC / logistics costs / tariff changes / return rates / IP issues

### opportunities
3 opportunities: brand building / DTC website / UGC content / influencer marketing

### platform_matches (score ALL 3 platforms)
1. Amazon 2. TikTok Shop 3. Shopify
Each: score(0-10), grade("★★★★★"), strengths(2-3), weaknesses(2-3), reason

### viral_potential
- score: 0-100
- grade: A/B/C
- dimensions: market_demand/competition/profit_margin/content_spread (0-10 each)
- reasons: 3 judgments

### content_strategy
- strategies: 3 approaches (UGC marketing / brand storytelling / influencer review / unboxing / price comparison / pain marketing / scene marketing)
- why: explanation

### content（Generate for platform "${input.platform}"）
${getUSContentSpec(input.platform)}

### why_it_works
- summary: ≤100 chars
- growth_logic: acquisition→conversion→retention flywheel

### confidence
- score: 78-88 with pain points, 60-75 without
- reason: basis for confidence

Output ONLY raw JSON.`;
}

// ═══════════════════════════════════════════════════════════
// 东南亚市场 Prompt
// ═══════════════════════════════════════════════════════════
function buildSEAPrompt(input: AnalyzeRequest, painPointsHint: string): string {
  return `你是一位深耕东南亚市场的跨境电商运营顾问。分析产品，输出结构化JSON。

## 产品信息
- 产品名称：${input.productName}
- 市场：东南亚
- 平台：${input.platform}${painPointsHint}

## 原则
1. 只评分分析，不输出"建议入场"——系统自动判断。
2. 每项评分有具体原因。
3. 东南亚特点：价格敏感、社交裂变强、移动端主导、物流基建参差不齐、TikTok渗透率高。
4. 直接返回JSON，不含markdown。

## 输出JSON结构（与欧美市场相同字段结构）

{
  "scoring": {
    "market_demand":    { "score": 0, "reason": "" },
    "competition":      { "score": 0, "reason": "" },
    "profit_margin":    { "score": 0, "reason": "" },
    "logistics":        { "score": 0, "reason": "" },
    "repurchase":       { "score": 0, "reason": "" },
    "differentiation":  { "score": 0, "reason": "" }
  },
  "cross_border_metrics": {
    "market_maturity": "",
    "price_range": "",
    "profitability": "",
    "supply_chain_difficulty": "",
    "shipping_risk": "",
    "ad_competition": ""
  },
  "user_profile": {
    "target_audience": "",
    "pain_points": ["","",""],
    "purchase_motivation": ["","",""]
  },
  "competitor_analysis": {
    "brands": ["","",""],
    "characteristics": ["","",""]
  },
  "risks": [
    { "risk": "", "severity": "" },
    { "risk": "", "severity": "" },
    { "risk": "", "severity": "" }
  ],
  "opportunities": [
    { "opportunity": "", "action": "" },
    { "opportunity": "", "action": "" },
    { "opportunity": "", "action": "" }
  ],
  "content": {},
  "why_it_works": { "summary": "", "growth_logic": "" },
  "confidence": { "score": 0, "reason": "" },
  "platform_matches": [
    { "platform": "", "score": 0, "grade": "", "strengths": ["",""], "weaknesses": ["",""], "reason": "" }
  ],
  "viral_potential": {
    "score": 0, "grade": "",
    "dimensions": { "market_demand": 0, "competition": 0, "profit_margin": 0, "content_spread": 0 },
    "reasons": ["","",""]
  },
  "content_strategy": { "strategies": ["","",""], "why": "" }
}

## 字段规范

### scoring
- market_demand：东南亚市场需求强度（TikTok热度和Shopee搜索趋势）
- competition：竞争友好度（高分=蓝海。关注本地卖家和跨境卖家占比）
- profit_margin：利润空间（注意东南亚客单价偏低，物流占比高）
- logistics：物流友好度（岛国多、最后一公里成本高、COD退单率）
- repurchase：复购潜力
- differentiation：差异化空间（功能本地化、包装适配、价格带空白）

### cross_border_metrics
- market_maturity：低/中/高
- price_range：如"$5-$15"（注意东南亚客单价偏低）
- profitability：低/中/高
- supply_chain_difficulty：低/中/高
- shipping_risk：低/中/高
- ad_competition：低/中/高

### risks（东南亚特色风险）
3条：客单价低利润薄/物流覆盖不均/支付方式差异（COD占比高退单率高）/本地化需求/政策变动

### opportunities
3条：TikTok增长红利/新兴市场低竞争/社交裂变/本地KOL合作

### platform_matches（对以下3个平台全部打分）
1. Shopee 2. Lazada 3. TikTok Shop
每项：score/grade/strengths/weaknesses/reason

### viral_potential
同标准结构（score/grade/dimensions/reasons），结合东南亚社交传播特点。

### content_strategy
- strategies：活动营销/价格营销/短视频引流/达人测评/社交裂变 中选3
- why：原因

### content（根据当前平台"${input.platform}"生成）
${getSEAContentSpec(input.platform)}

直接返回JSON。`;
}

// ═══════════════════════════════════════════════════════════
// 全球市场 Prompt（精简）
// ═══════════════════════════════════════════════════════════
function buildGlobalPrompt(input: AnalyzeRequest, painPointsHint: string): string {
  return `你是一位全球化电商战略顾问。综合分析产品在多个市场的表现潜力，输出结构化JSON。

## 产品信息
- 产品：${input.productName}
- 市场：全球
- 平台：${input.platform}${painPointsHint}

## 原则
同其他市场，输出标准JSON结构。分析需兼顾不同区域特点。直接返回JSON。

## JSON结构（与其他市场相同10个模块，此处省略重复结构描述）

请输出完整的标准JSON，包含scoring/cross_border_metrics/user_profile/competitor_analysis/risks/opportunities/content/why_it_works/confidence/platform_matches/viral_potential/content_strategy。

### platform_matches（对以下5个平台打分）
Amazon / TikTok Shop / Shopee / 抖音 / 淘宝

### content（针对平台"${input.platform}"生成对应格式内容）

直接返回JSON。`;
}

// ═══════════════════════════════════════════════════════════
// Content Spec Helpers — market × platform aware
// ═══════════════════════════════════════════════════════════

function getChinaContentSpec(platform: string): string {
  switch (platform) {
    case "抖音":
      return `{
  "douyin": {
    "titles": ["爆款标题1", "爆款标题2", "爆款标题3"],
    "hook": "视频开场钩子（前3秒抓注意力）",
    "comment_guide": "评论区互动引导文案",
    "selling_points": ["卖点1", "卖点2", "卖点3", "卖点4"]
  }
}`;
    case "淘宝":
      return `{
  "taobao": {
    "title": "商品标题（含核心搜索词）",
    "keywords": ["关键词1", "关键词2", "关键词3", "关键词4", "关键词5"],
    "selling_points": ["卖点1", "卖点2", "卖点3", "卖点4"]
  }
}`;
    case "京东":
      return `{
  "jd": {
    "seo_title": "京东SEO标题",
    "advantages": ["优势1", "优势2", "优势3"],
    "buying_reasons": ["购买理由1", "购买理由2", "购买理由3"]
  }
}`;
    case "拼多多":
      return `{
  "pinduoduo": {
    "activity_title": "活动标题（突出性价比）",
    "traffic_copy": "引流文案（短句，吸引点击）",
    "conversion_copy": "转化文案（促成下单）"
  }
}`;
    case "小红书":
      return `{
  "xiaohongshu": ["种草笔记正文（真实分享风+关键词+表情+标签）"]
}`;
    default:
      return `{ "xiaohongshu": ["种草文案"] }`;
  }
}

function getUSContentSpec(platform: string): string {
  switch (platform) {
    case "Amazon":
      return `{
  "amazon": {
    "seo_title": "SEO-optimized product title with core keywords",
    "bullet_points": ["Benefit-driven bullet 1", "Feature bullet 2", "Use case bullet 3", "Quality assurance bullet 4", "Warranty/support bullet 5"],
    "search_terms": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
  }
}`;
    case "TikTok Shop":
      return `{
  "tiktok_shop": {
    "video_title": "Scroll-stopping video title in English",
    "script": "Short video script hook (first 3 seconds) + product demo + CTA",
    "comment_engagement": "Comment reply template to drive engagement"
  }
}`;
    case "Shopify":
      return `{
  "shopify": {
    "brand_story": "Compelling brand origin story (50 words)",
    "product_description": "Persuasive product description with benefits",
    "ad_copy": ["Ad line 1", "Ad line 2", "Ad line 3", "Ad line 4", "Ad line 5"]
  }
}`;
    default:
      return `{ "amazon": { "seo_title": "", "bullet_points": [], "search_terms": [] } }`;
  }
}

function getSEAContentSpec(platform: string): string {
  switch (platform) {
    case "Shopee":
      return `{
  "shopee": {
    "title": "商品标题（含热搜词，适配当地语言习惯）",
    "selling_points": ["卖点1", "卖点2", "卖点3", "卖点4"],
    "promo_copy": "促销文案（突出折扣和紧迫感）"
  }
}`;
    case "Lazada":
      return `{
  "lazada": {
    "title": "商品标题",
    "advantages": ["优势1", "优势2", "优势3"],
    "description": "详细描述（适配Lazada内容规范）"
  }
}`;
    case "TikTok Shop":
      return `{
  "tiktok_shop": {
    "video_title": "短视频标题（适配东南亚语言习惯）",
    "script": "短视频脚本（hook+展示+CTA）",
    "comment_engagement": "评论区互动文案"
  }
}`;
    default:
      return `{ "shopee": { "title": "", "selling_points": [], "promo_copy": "" } }`;
  }
}

export function parseAIResponse(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }
  try {
    return JSON.parse(cleaned);
  } catch {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try { return JSON.parse(jsonMatch[0]); } catch { /* fall through */ }
    }
    throw new Error("Failed to parse AI response as JSON");
  }
}
