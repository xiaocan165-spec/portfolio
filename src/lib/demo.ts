import { AnalyzeRequest, AnalyzeResponse, PlatformMatch, ViralPotential, ContentStrategy } from "./types";

/**
 * Demo Mode — returns realistic structured data without AI API.
 * Used as fallback when API key is missing or AI call fails.
 */
export function generateDemoAnalysis(input: AnalyzeRequest): AnalyzeResponse {
  const hasPainPoints = !!input.userPainPoints?.trim();
  const confidenceBase = hasPainPoints ? 82 : 68;
  const confidenceJitter = Math.floor(Math.random() * 7) - 3;

  const isChina = input.market === "中国大陆";

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
      reason: isChina
        ? "分析基于国内电商市场认知，结合品类趋势和平台特点。提供具体痛点线索可提升可信度。"
        : hasPainPoints
          ? "用户提供了具体痛点线索，分析依据较充分。建议结合更多市场数据验证。"
          : "未提供用户痛点线索，分析基于通用市场认知。补充具体洞察可提升可信度。",
    },
    platform_matches: buildPlatformMatches(input),
    viral_potential: buildViralPotential(input),
    content_strategy: buildContentStrategy(input),
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
  const isChina = input.market === "中国大陆";
  return {
    market_maturity: "中" as const,
    price_range: isChina ? "¥29–¥89" : "$19–$39",
    profitability: "中" as const,
    supply_chain_difficulty: "低" as const,
    shipping_risk: "低" as const,
    ad_competition: (isChina ? "高" : "中") as "低" | "中" | "高",
  };
}

// ─── User Profile ──────────────────────────────────────────
function buildUserProfile(input: AnalyzeRequest) {
  const market = input.market;
  const p = input.productName;

  if (market === "中国大陆") {
    return {
      target_audience: `18-35岁国内年轻消费者，以${input.platform === "抖音" ? "短视频冲动消费" : input.platform === "拼多多" ? "社交裂变驱动" : "搜索比价型"}用户为主，覆盖一二线城市白领和下沉市场用户，月均网购消费500-3000元，受抖音/小红书种草影响大。`,
      pain_points: [
        `市面${p}品质参差不齐，踩坑成本高`,
        "同价位产品缺乏差异化，选择困难",
        "担心实际效果与宣传不符，退换货麻烦",
      ],
      purchase_motivation: [
        "解决具体使用场景中的不便（功能驱动）",
        "在社交平台获得种草和分享乐趣（内容驱动）",
        "花合理的钱获得超预期的品质（性价比驱动）",
      ],
    };
  }

  if (market === "欧美") {
    return {
      target_audience: `25-45岁欧美中产消费者，以${input.platform === "TikTok Shop" ? "冲动消费型" : "搜索比价型"}用户为主，年收入$40k-$80k，关注产品品质和使用体验，受Reddit/YouTube测评影响大。`,
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
  if (input.market === "中国大陆") {
    return {
      brands: ["小米", "华为", "OPPO", "网易严选", "京东京造"],
      characteristics: [
        "头部品牌占据平台搜索流量入口，广告竞价激烈",
        "白牌价格内卷严重，差异化品牌才有溢价空间",
        "用户评价和种草内容对转化影响极大",
      ],
    };
  }
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
  const isChina = input.market === "中国大陆";

  if (isChina) {
    return {
      tiktok_pain: [
        `用了3年${p}，终于找到一款不踩坑的！🔥`,
        `你还在忍受${p}的这些痛点吗？这个真的救了我💯`,
        `${p}避坑指南：90%的人都不知道的选购技巧`,
      ],
      tiktok_scene: [
        `在家办公有了这个${p}，效率直接翻倍！#居家好物`,
        `出差随身必带的${p}，用过的都说香✈️`,
        `这个${p}改变了我的日常生活 #品质生活`,
      ],
      tiktok_curiosity: [
        `这个${p}凭什么全网爆火？我测了30天告诉你真相👀`,
        `所有人都说这个${p}好用，真的假的？上手实测🤯`,
        `我以为${p}是智商税，用了之后发现错怪它了`,
      ],
      xiaohongshu: [
        `被问了100遍的${p}，真的好用到离谱✨\n\n姐妹们！这个${p}我用了两周了，从一开始的半信半疑到现在每天都离不开，真的是相见恨晚！\n\n🎯 适合人群：追求品质/注重效率/对生活有要求的宝子们\n💡 使用感受：质感完全不输大牌，性价比绝了\n🔥 真心建议有需要的直接冲，不会后悔！\n\n#好物分享 #${p} #提升幸福感 #打工人必备 #性价比好物`,
      ],
      amazon_seo: [`${p}——高品质 便携设计 多功能 适合居家办公旅行 售后无忧`],
      ad_copy: [
        `提升品质生活，就选${p}`,
        `用料扎实，性价比超乎想象`,
        `为真实使用场景设计，解决实际问题`,
        `已服务10万+用户，好评如潮`,
        `一个${p}，无限可能`,
      ],
    };
  }

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
  if (input.market === "中国大陆") {
    return {
      summary: `${p}切中了国内消费者对"好用不贵+颜值在线"的核心诉求，借助抖音/小红书内容种草和国内成熟供应链可实现快速起量。`,
      growth_logic: `第一阶段：抖音短视频+小红书种草获取种子用户 → 第二阶段：淘宝/京东承接搜索流量，拼多多做价格锚点 → 第三阶段：用户UGC内容反哺社媒，形成"内容种草-平台成交-好评反哺"增长飞轮。`,
    };
  }
  return {
    summary: `${p}切中了目标市场消费者对"${input.market === "欧美" ? "品质+性价比" : "好用+不贵"}"的核心诉求，通过供应链优势和内容种草可实现快速冷启动。`,
    growth_logic: `第一阶段：TikTok/小红书内容种草获取种子用户 → 第二阶段：Amazon SEO+PPC截获品类搜索流量 → 第三阶段：UGC内容反哺社媒传播，形成"内容-流量-转化-评价"增长飞轮。`,
  };
}

// ─── V3: Platform Matches ──────────────────────────────────
function buildPlatformMatches(input: AnalyzeRequest): PlatformMatch[] {
  const isChina = input.market === "中国大陆";
  if (isChina) {
    return [
      { platform: "抖音", score: 9.1, reason: "短视频展示性强，用户决策链路短，适合内容驱动型产品快速起量" },
      { platform: "小红书", score: 8.6, reason: "种草心智成熟，女性用户占比高，适合品质型产品建立品牌认知" },
      { platform: "淘宝", score: 8.0, reason: "搜索流量稳定，用户购买意图明确，适合承接种草流量" },
      { platform: "拼多多", score: 7.3, reason: "价格敏感型用户为主，适合走量但利润空间有限" },
      { platform: "京东", score: 6.8, reason: "用户品质预期高，适合品牌化运营，但入驻门槛和运营成本较高" },
    ];
  }
  return [
    { platform: "TikTok Shop", score: 9.0, reason: "Viral potential is high; short-form video drives impulse purchases for visually appealing products" },
    { platform: "Amazon", score: 8.2, reason: "Largest search volume; established trust; ideal for scaling after initial traction" },
    { platform: "Shopee", score: 7.5, reason: "Strong in Southeast Asia; price-sensitive audience; good for volume play" },
    { platform: "Lazada", score: 7.0, reason: "Growing platform; brand-focused; higher entry barrier but loyal user base" },
  ];
}

// ─── V3: Viral Potential ───────────────────────────────────
function buildViralPotential(input: AnalyzeRequest): ViralPotential {
  const hasVisual = /phone|stand|light|lamp|mirror|case|bag|toy|plush|doll|gadget/i.test(input.productName);
  const hasEmotion = /pet|dog|cat|baby|kids|gift|plush|doll/i.test(input.productName);
  const isConsumable = /food|snack|drink|coffee|tea|oil|cream|mask|patch|soap/i.test(input.productName);

  if (hasVisual && hasEmotion) {
    return { score: 88, grade: "A", reasons: ["产品视觉冲击力强，天然适合短视频传播", "情感属性驱动社交分享，容易形成自传播", "目标用户群体与抖音/小红书核心用户高度重合"] };
  }
  if (hasVisual) {
    return { score: 78, grade: "B", reasons: ["产品展示性强，适合短视频和图文内容形态", "用户购买决策受内容种草影响较大", "需配合达人测评内容建立信任背书"] };
  }
  if (isConsumable) {
    return { score: 72, grade: "B", reasons: ["消耗属性驱动复购，适合直播带货和订阅模式", "用户尝新意愿较高，新品推广阻力小", "需要建立品牌信任降低首次购买决策门槛"] };
  }
  return { score: 65, grade: "B", reasons: ["品类内容传播性中等，需差异化内容策略", "用户决策偏理性，需要专业测评和口碑背书", "可通过场景细分和人群精准定位提升转化"] };
}

// ─── V3: Content Strategy ──────────────────────────────────
function buildContentStrategy(input: AnalyzeRequest): ContentStrategy {
  const isChina = input.market === "中国大陆";
  const hasVisual = /phone|stand|light|lamp|mirror|case|bag|toy|gadget|camera|lens/i.test(input.productName);

  if (isChina) {
    if (hasVisual) {
      return {
        strategies: ["场景营销", "达人测评", "开箱体验"],
        why: "该品类视觉展示性强，场景化内容能有效激发用户代入感和购买欲望。达人测评可建立信任背书，开箱内容能降低用户对新品的试错顾虑。建议抖音+小红书双平台联动。",
      };
    }
    return {
      strategies: ["痛点营销", "知识科普", "价格对比"],
      why: "通过痛点内容唤醒用户需求，知识科普建立专业信任，价格对比突出性价比优势。建议以小红书深度种草为主，抖音信息流投流为辅。",
    };
  }
  if (hasVisual) {
    return {
      strategies: ["场景营销", "达人测评", "开箱体验"],
      why: "Visually-driven products perform best with scenario-based content. Influencer unboxing builds trust quickly. Scene marketing helps users imagine the product in their daily life.",
    };
  }
  return {
    strategies: ["痛点营销", "知识科普", "价格对比"],
    why: "Pain-point content triggers need recognition. Knowledge sharing establishes authority. Price comparison highlights value proposition and reduces decision friction.",
  };
}
