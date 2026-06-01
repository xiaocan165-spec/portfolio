import { AnalyzeRequest, AnalyzeResponse } from "./types";

/**
 * Demo Mode — returns realistic structured data without AI API.
 * Used as fallback when API key is missing or AI call fails.
 */
export function generateDemoAnalysis(input: AnalyzeRequest): AnalyzeResponse {
  const name = input.productName;
  const hasPainPoints = !!input.userPainPoints?.trim();
  const confidenceBase = hasPainPoints ? 82 : 68;
  const confidenceJitter = Math.floor(Math.random() * 7) - 3; // ±3

  return {
    scoring: buildScoring(input),
    cross_border_metrics: buildMetrics(input),
    user_profile: buildUserProfile(input),
    competitor_analysis: buildCompetitors(input),
    risks: buildRisks(input),
    opportunities: buildOpportunities(input),
    content: buildContent(input),
    why_it_works: buildWhyItWorks(input),
    confidence: {
      score: Math.min(92, Math.max(55, confidenceBase + confidenceJitter)),
      reason: hasPainPoints
        ? "用户提供了具体痛点线索，分析依据较充分。建议结合更多市场数据验证。"
        : "未提供用户痛点线索，分析基于通用市场认知。补充具体洞察可提升可信度。",
    },
  };
}

// ─── Scoring ───────────────────────────────────────────────
function buildScoring(input: AnalyzeRequest) {
  const isSaturated = /case|charger|cable|phone.*stand|phone.*holder/i.test(
    input.productName
  );
  const isConsumable = /food|snack|coffee|tea|oil|cream|mask|patch/i.test(
    input.productName
  );
  const isBulky = /furniture|desk|chair|sofa|mattress|table|cabinet/i.test(
    input.productName
  );
  const isTiny =
    /sticker|patch|keychain|pin|badge|ring|earring|necklace/i.test(
      input.productName
    );

  return {
    market_demand: {
      score: isSaturated ? 7 : 8,
      reason: isSaturated
        ? "市场需求稳定但增速放缓，属于成熟品类。新进入者需要差异化才能突围。"
        : "该品类在目标市场处于上升期，搜索量同比增长明显，用户需求旺盛。",
    },
    competition: {
      score: isSaturated ? 3 : 5,
      reason: isSaturated
        ? "头部品牌垄断明显，大卖评价壁垒高，新卖家入场需大量广告投入。"
        : "市场竞争中等，存在一定的品牌集中度，但仍有细分空间。",
    },
    profit_margin: {
      score: isBulky ? 4 : 7,
      reason: isBulky
        ? "大件产品物流和仓储成本占比高，首单利润空间有限，需规模化降本。"
        : "采购成本可控，扣除平台佣金和物流后仍有30-40%毛利空间。",
    },
    logistics: {
      score: isBulky ? 3 : isTiny ? 9 : 7,
      reason: isBulky
        ? "体积大重量高，FBA仓储费高，退货处理成本大。"
        : isTiny
          ? "超轻小件，运费极低，标准化包装，物流几乎无难度。"
          : "产品标准化程度高，包装规整，适合FBA或海外仓发货。",
    },
    repurchase: {
      score: isConsumable ? 8 : 5,
      reason: isConsumable
        ? "消耗属性明显，用户使用周期短，自然复购率高，适合订阅模式。"
        : "属于耐用品类，单用户购买频次较低，需靠新客增长驱动。",
    },
    differentiation: {
      score: isSaturated ? 4 : 7,
      reason: isSaturated
        ? "产品同质化严重，功能层面改进空间有限，差异化更多依赖设计和品牌。"
        : "存在微创新切口，可从材质升级、场景细分、包装差异化等方面突围。",
    },
  };
}

// ─── Cross-border Metrics ──────────────────────────────────
function buildMetrics(input: AnalyzeRequest) {
  return {
    market_maturity: "中" as const,
    price_range: "$19–$39",
    profitability: "中" as const,
    supply_chain_difficulty: "低" as const,
    shipping_risk: "低" as const,
    ad_competition: "中" as const,
  };
}

// ─── User Profile ──────────────────────────────────────────
function buildUserProfile(input: AnalyzeRequest) {
  const market = input.market;
  const p = input.productName;

  if (market === "欧美") {
    return {
      target_audience: `25-45岁欧美中产消费者，以${input.platform === "TikTok" ? "冲动消费型" : "搜索比价型"}用户为主，年收入$40k-$80k，关注产品品质和使用体验，受Reddit/YouTube测评影响大。`,
      pain_points: [
        `现有${p}产品设计粗糙/使用不便，影响日常体验`,
        "市面上同类产品品质参差不齐，选择成本高",
        "对产品实际效果缺乏信心，担心试错成本",
      ],
      purchase_motivation: [
        "解决具体生活场景中的不便（功能驱动）",
        "提升生活品质和工作效率（效率驱动）",
        "在社交圈获得认可和讨论（社交驱动）",
      ],
    };
  }

  if (market === "东南亚") {
    return {
      target_audience: `18-35岁东南亚年轻消费者，移动端购物为主，受TikTok和Shopee直播带货影响大，价格敏感但愿意为"看起来很值"的产品付费。`,
      pain_points: [
        `本地市场${p}选择少，质量和设计不如跨境产品`,
        "价格跨度大，很难判断性价比",
        "跨境物流时间长，退换货不便",
      ],
      purchase_motivation: [
        "花合理的钱获得超预期的品质（性价比驱动）",
        "在社交电商中获得种草和分享乐趣（社交驱动）",
        "跨境产品带来的进口品质感（身份驱动）",
      ],
    };
  }

  // 全球
  return {
    target_audience: `25-45岁全球中产消费者，习惯于在线购物和社交电商，追求品质与价格的平衡，受多平台内容种草影响。`,
    pain_points: [
      `现有${p}产品未能满足特定使用场景的需求`,
      "品质与价格不匹配，缺少中端价位的好产品",
      "购买前无法体验产品，依赖评价和内容种草",
    ],
    purchase_motivation: [
      "解决某个具体痛点（功能驱动）",
      "提升生活品质和效率（效率驱动）",
      "在社交圈中获得认同（社交驱动）",
    ],
  };
}

// ─── Competitors ───────────────────────────────────────────
function buildCompetitors(input: AnalyzeRequest) {
  return {
    brands: ["Anker", "JBL", "TOZO", "Belkin", "UGREEN"],
    characteristics: [
      "头部品牌占据搜索流量入口，广告竞价激烈",
      "产品功能趋同，竞争重心转向品牌和设计",
      "用户评价内卷，新品需要大量初始评价才能起量",
    ],
  };
}

// ─── Risks ─────────────────────────────────────────────────
function buildRisks(input: AnalyzeRequest) {
  return [
    { risk: "产品同质化严重，缺乏核心壁垒", severity: "中" as const },
    { risk: "广告获客成本持续上升，ROI压力增大", severity: "中" as const },
    {
      risk: "平台政策变化或竞品价格战可能压缩利润",
      severity: "低" as const,
    },
  ];
}

// ─── Opportunities ─────────────────────────────────────────
function buildOpportunities(input: AnalyzeRequest) {
  const p = input.productName;
  return [
    {
      opportunity: "细分场景切入",
      action: `聚焦特定使用场景（如户外、办公、旅行）做${p}的深度适配，建立场景品牌认知。`,
    },
    {
      opportunity: "内容种草矩阵",
      action: `通过TikTok短视频+小红书深度测评+YouTube开箱打造${p}的全链路内容种草。`,
    },
    {
      opportunity: "差异化包装与品牌故事",
      action: `用设计驱动的包装和清晰的品牌定位，让${p}在货架上脱颖而出，摆脱纯卖货模式。`,
    },
  ];
}

// ─── Content ───────────────────────────────────────────────
function buildContent(input: AnalyzeRequest) {
  const p = input.productName;
  const better = p.replace(/[Ss]tand|[Hh]older|[Mm]ount/gi, "").trim();

  return {
    tiktok_pain: [
      `Stop holding your ${p} like it's 2019. This is the upgrade you need. 🔥`,
      `Your current ${better || "setup"} is hurting your productivity. Here's the fix. 💯`,
      `The ${p} problem nobody talks about — and the one product that solves it.`,
    ],
    tiktok_scene: [
      `Work from home just got 10x better with this ${p}. #desksetup #wfh`,
      `Travel essential: my ${p} goes everywhere with me. Here's why. ✈️`,
      `Morning routine upgrade: adding this ${p} changed everything. #morningroutine`,
    ],
    tiktok_curiosity: [
      `The ${p} that broke TikTok — is it worth the hype? 👀`,
      `I tested this viral ${p} for 30 days. The results surprised me.`,
      `They said this ${p} was a gimmick. They were wrong. 🤯`,
    ],
    xiaohongshu: [
      `被问了100遍的${p}，真的好用到离谱✨\n\n姐妹们！这个${p}我用了两周了，从一开始的半信半疑到现在每天都离不开，真的是相见恨晚！\n\n🎯 适合人群：经常出差/追求效率/对品质有要求的宝子们\n💡 使用感受：质感完全不输大牌，性价比绝了\n🔥 真心建议有需要的直接冲，不会后悔！\n\n#好物分享 #${p} #提升幸福感 #打工人必备 #性价比好物`,
    ],
    amazon_seo: [
      `${p} - Premium Quality, Ergonomic Design, Adjustable & Durable, Perfect for Home Office, Travel & Everyday Use - Satisfaction Guaranteed`,
    ],
    ad_copy: [
      `Upgrade your daily routine with ${p}`,
      `Premium quality at a fraction of the price`,
      `Designed for real people, tested in real life`,
      `Join 10,000+ happy customers who made the switch`,
      `One ${p}. Endless possibilities.`,
    ],
  };
}

// ─── Why It Works ──────────────────────────────────────────
function buildWhyItWorks(input: AnalyzeRequest) {
  const p = input.productName;
  return {
    summary: `${p}切中了目标市场消费者对"${input.market === "欧美" ? "品质+性价比" : "好用+不贵"}"的核心诉求，通过供应链优势和内容种草可实现快速冷启动。`,
    growth_logic: `第一阶段：TikTok/小红书内容种草获取种子用户 → 第二阶段：Amazon SEO+PPC截获品类搜索流量 → 第三阶段：UGC内容反哺社媒传播，形成"内容-流量-转化-评价"增长飞轮。`,
  };
}
