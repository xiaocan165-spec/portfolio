import { AnalyzeRequest, AnalyzeResponse, PlatformMatch, ViralPotential, ContentStrategy, Content } from "./types";

export function generateDemoAnalysis(input: AnalyzeRequest): AnalyzeResponse {
  const hasPainPoints = !!input.userPainPoints?.trim();
  const confidenceBase = hasPainPoints ? 82 : 68;
  const jitter = Math.floor(Math.random() * 7) - 3;
  const p = input.productName;

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
      score: Math.min(92, Math.max(55, confidenceBase + jitter)),
      reason: input.market === "中国大陆"
        ? "分析基于国内电商市场认知。提供具体痛点线索可提升可信度。"
        : hasPainPoints
          ? "Analysis based on provided user insights and market knowledge."
          : "Analysis based on general market knowledge. Specific insights improve confidence.",
    },
    platform_matches: buildPlatformMatches(input),
    viral_potential: buildViralPotential(input),
    content_strategy: buildContentStrategy(input),
  };
}

// ─── Scoring ───────────────────────────────────────────────
function buildScoring(input: AnalyzeRequest) {
  const isSaturated = /case|charger|cable|phone.*stand|phone.*holder/i.test(input.productName);
  const isConsumable = /food|snack|coffee|tea|oil|cream|mask|patch/i.test(input.productName);
  const isBulky = /furniture|desk|chair|sofa|mattress/i.test(input.productName);
  const isTiny = /sticker|patch|keychain|pin|badge|ring/i.test(input.productName);
  const isChina = input.market === "中国大陆";

  return {
    market_demand: {
      score: isSaturated ? 7 : 8,
      reason: isChina
        ? (isSaturated ? "品类在抖音/淘宝搜索量稳定，属于成熟品类，需要差异化突围" : "品类在国内处于上升期，抖音搜索热度增长明显")
        : (isSaturated ? "Demand is stable but growth is slowing. Differentiation needed." : "Category is in an upward trend with growing search volume."),
    },
    competition: {
      score: isSaturated ? 3 : 5,
      reason: isChina
        ? (isSaturated ? "头部品牌+白牌内卷严重，新入场需大量投流预算" : "竞争中等，存在一定品牌集中度但仍有细分空间")
        : (isSaturated ? "Top brands dominate with high review barriers." : "Moderate competition with room for niche positioning."),
    },
    profit_margin: {
      score: isBulky ? 4 : 7,
      reason: isBulky
        ? "大件产品物流仓储成本占比高，首单利润有限"
        : "采购成本可控，扣除平台佣金和物流后有合理毛利空间",
    },
    logistics: {
      score: isBulky ? 3 : isTiny ? 9 : 7,
      reason: isBulky ? "体积大重量高，仓储配送成本大" : isTiny ? "超轻小件，运费极低" : "产品标准化，适合FBA/云仓发货",
    },
    repurchase: {
      score: isConsumable ? 8 : 5,
      reason: isConsumable ? "消耗属性明显，自然复购率高" : "耐用品类，单用户购买频次低",
    },
    differentiation: {
      score: isSaturated ? 4 : 7,
      reason: isSaturated ? "同质化严重，差异更多依赖设计和品牌" : "存在微创新切口，可从材质/场景/包装突围",
    },
  };
}

// ─── Metrics ───────────────────────────────────────────────
function buildMetrics(input: AnalyzeRequest) {
  const isChina = input.market === "中国大陆";
  return {
    market_maturity: "中" as const,
    price_range: isChina ? "¥29–¥89" : input.market === "东南亚" ? "$5–$19" : "$19–$49",
    profitability: "中" as const,
    supply_chain_difficulty: "低" as const,
    shipping_risk: "低" as const,
    ad_competition: (isChina ? "高" : "中") as "低" | "中" | "高",
  };
}

// ─── User Profile ──────────────────────────────────────────
function buildUserProfile(input: AnalyzeRequest) {
  const p = input.productName;
  switch (input.market) {
    case "中国大陆":
      return {
        target_audience: `18-35岁国内年轻消费者，以${input.platform === "抖音" ? "短视频冲动消费" : input.platform === "拼多多" ? "社交裂变驱动" : "搜索比价型"}用户为主，覆盖一二线白领和下沉市场，月网购500-3000元。`,
        pain_points: [`市面${p}品质参差不齐，踩坑成本高`, "同价位缺乏差异化，选择困难", "担心实际效果与宣传不符"],
        purchase_motivation: ["解决具体场景不便（功能驱动）", "社交平台种草分享（内容驱动）", "花合理钱获超预期品质（性价比驱动）"],
      };
    case "欧美":
      return {
        target_audience: `25-45 US/EU middle-class consumers, ${input.platform === "TikTok Shop" ? "impulse buyers driven by short video" : "search-comparison shoppers"}. Annual income $40k-$80k. Influenced by YouTube reviews and Reddit communities.`,
        pain_points: [`Existing ${p} products lack premium feel at accessible prices`, "Quality inconsistency across brands creates decision fatigue", "Limited innovation in the category, products feel outdated"],
        purchase_motivation: ["Solving a specific daily friction (functional)", "Elevating lifestyle and workspace aesthetics (aspirational)", "Social proof and peer recognition (social)"],
      };
    case "东南亚":
      return {
        target_audience: `18-35 Southeast Asian mobile-first shoppers, heavy TikTok/Shopee users. Price-sensitive but willing to pay for perceived value. Influenced by live shopping and social commerce.`,
        pain_points: [`Local ${p} options limited in quality and design`, "Cross-border shipping time and return hassle", "Hard to judge true quality from listings alone"],
        purchase_motivation: ["Perceived value at accessible price (value-driven)", "Social commerce discovery and sharing (social)", "Imported quality feel at local prices (aspirational)"],
      };
    default: // 全球
      return {
        target_audience: `25-45 global consumers across markets, comfortable with cross-border shopping, seeking quality-to-price balance.`,
        pain_points: ["Current options don't satisfy specific use cases", "Quality-to-price mismatch in mid-tier segment", "Pre-purchase uncertainty without physical trial"],
        purchase_motivation: ["Solving a concrete pain point (functional)", "Enhancing daily life quality (efficiency)", "Social recognition (social)"],
      };
  }
}

// ─── Competitors ───────────────────────────────────────────
function buildCompetitors(input: AnalyzeRequest) {
  switch (input.market) {
    case "中国大陆":
      return { brands: ["小米", "华为", "网易严选", "京东京造", "名创优品"], characteristics: ["头部品牌占据搜索流量", "白牌价格内卷严重", "用户评价和种草内容对转化影响极大"] };
    case "欧美":
      return { brands: ["Anker", "Belkin", "JBL", "Ugreen", "Spigen"], characteristics: ["Top brands dominate search and review rankings", "Competition shifting from features to brand trust", "Review barriers high for new entrants"] };
    case "东南亚":
      return { brands: ["Baseus", "Vention", "Remax", "Xiaomi", "local brands"], characteristics: ["Cross-border sellers dominate mid-tier", "Local brands competing on price", "TikTok Shop lowering entry barriers for new brands"] };
    default:
      return { brands: ["Anker", "Xiaomi", "Belkin", "Baseus", "Ugreen"], characteristics: ["Global brands dominate premium tier", "Chinese brands competing on value", "Regional preferences vary significantly"] };
  }
}

// ─── Risks (market-aware) ──────────────────────────────────
function buildRisks(input: AnalyzeRequest) {
  switch (input.market) {
    case "中国大陆":
      return [{ risk: "达人投流成本持续上涨，ROI压力增大", severity: "高" as const }, { risk: "同质化竞争严重，价格内卷压缩利润", severity: "高" as const }, { risk: "平台规则频繁变化，运营策略需不断调整", severity: "中" as const }];
    case "欧美":
      return [{ risk: "Brand moats make it hard for new brands to gain trust", severity: "高" as const }, { risk: "CPC advertising costs rising, eating into margins", severity: "高" as const }, { risk: "Cross-border logistics and potential tariff changes", severity: "中" as const }];
    case "东南亚":
      return [{ risk: "客单价偏低，利润空间有限", severity: "高" as const }, { risk: "COD退单率高，物流覆盖不均", severity: "中" as const }, { risk: "支付方式和本地化需求差异大", severity: "中" as const }];
    default:
      return [{ risk: "Market fragmentation requires multi-region strategy", severity: "中" as const }, { risk: "Currency and tariff risks across markets", severity: "中" as const }, { risk: "Localization costs add operational complexity", severity: "低" as const }];
  }
}

// ─── Opportunities (market-aware) ──────────────────────────
function buildOpportunities(input: AnalyzeRequest) {
  const p = input.productName;
  switch (input.market) {
    case "中国大陆":
      return [{ opportunity: "达人直播带货", action: `与抖音/小红书达人合作，通过直播+短视频矩阵推广${p}` }, { opportunity: "节日营销节点", action: `围绕618、双11、年货节等大促节点做${p}的集中爆发` }, { opportunity: "细分人群定制", action: `针对Z世代/宝妈/银发等细分人群做${p}的差异化定位` }];
    case "欧美":
      return [{ opportunity: "Brand building via DTC", action: `Build a direct-to-consumer brand with Shopify for ${p}, bypassing platform fees` }, { opportunity: "UGC content flywheel", action: `Incentivize user-generated content to build social proof for ${p}` }, { opportunity: "Eco-friendly positioning", action: `Differentiate ${p} with sustainable materials and packaging` }];
    case "东南亚":
      return [{ opportunity: "TikTok Shop growth wave", action: `Leverage TikTok Shop's rapid growth in SEA with short-video content for ${p}` }, { opportunity: "Low-competition niches", action: `Identify underserved subcategories within ${p} market` }, { opportunity: "KOL affiliate network", action: `Build local KOL network for affiliate-driven distribution` }];
    default:
      return [{ opportunity: "Cross-market scaling", action: `Scale ${p} across markets with localized positioning` }, { opportunity: "Multi-platform presence", action: `Optimize ${p} for each region's dominant platform` }, { opportunity: "Supply chain optimization", action: `Leverage multi-market volume for better sourcing costs` }];
  }
}

// ─── Content (market × platform aware) ─────────────────────
function buildContent(input: AnalyzeRequest): Content {
  const p = input.productName;
  switch (input.platform) {
    // China
    case "抖音":
      return { douyin: { titles: [`${p}避坑！90%的人不知道的选购技巧🔥`, `用了这个${p}，我的生活效率翻倍了`, `${p}深度测评：到底值不值得买？看完就懂`], hook: `你是不是也一直在找一个好用的${p}？试了N款之后，我终于找到了答案`, comment_guide: "用过的小伙伴评论区说说你的体验👇", selling_points: ["品质升级，不输大牌", "设计用心，解决真实痛点", "性价比超高，闭眼入", "售后无忧，30天退换"] } };
    case "淘宝":
      return { taobao: { title: `${p} 高品质 便携设计 居家办公旅行必备 热销爆款`, keywords: [p, "品质", "便携", "居家好物", "高性价比"], selling_points: ["精选材质，经久耐用", "人体工学设计，使用舒适", "多场景适用，居家办公旅行", "售后无忧，急速发货"] } };
    case "京东":
      return { jd: { seo_title: `${p} 品质之选 高效便捷 京东自营 极速配送`, advantages: ["品牌直供，品质保证", "京东物流，极速送达", "30天价保，买贵退差价"], buying_reasons: ["品质生活升级首选", "自用送礼两相宜", "万千好评，口碑之选"] } };
    case "拼多多":
      return { pinduoduo: { activity_title: `🔥限时抢！${p} 品质升级不加价`, traffic_copy: `还在用旧款${p}？这款升级版让你体验翻倍！`, conversion_copy: "限时优惠，错过等一年！品质保证，不满意包退" } };
    case "小红书":
      return { xiaohongshu: [`被问爆了！这个${p}真的好用到离谱✨\n\n姐妹们！这个${p}我用了两周，从半信半疑到现在离不开，相见恨晚！\n\n🎯 适合：追求品质/效率/对生活有要求的宝子\n💡 使用感：质感不输大牌，性价比绝了\n🔥 真心建议有需的直接冲！\n\n#好物分享 #${p} #提升幸福感 #打工人必备`] };

    // US/EU
    case "Amazon":
      return { amazon: { seo_title: `${p} - Premium Quality, Ergonomic Design, Durable, Perfect for Home Office & Travel`, bullet_points: ["PREMIUM BUILD: Crafted with high-grade materials for lasting durability", "ERGONOMIC DESIGN: Thoughtfully engineered for comfort and ease of use", "MULTI-SCENARIO: Perfect for home office, travel, and everyday use", "SATISFACTION GUARANTEED: 30-day money-back, 12-month warranty"], search_terms: [p, "premium", "ergonomic", "home office", "travel essential"] } };
    case "TikTok Shop":
      return { tiktok_shop: { video_title: `The ${p} upgrade you didn't know you needed 🤯`, script: `POV: You've been using the wrong ${p} your whole life. Watch what happens when you switch to this one. (demo) Link in bio! #musthave #amazonfinds`, comment_engagement: "Tag someone who needs this upgrade 👇" } };
    case "Shopify":
      return { shopify: { brand_story: `We believe everyday tools should inspire. ${p} was born from frustration with mediocre options — so we built the one we wished existed.`, product_description: `Experience the difference with ${p}. Designed for people who refuse to compromise on quality, crafted with premium materials and obsessive attention to detail.`, ad_copy: ["Upgrade your daily routine", "Premium quality, honest price", "Designed for real life", "Join 10,000+ happy customers", "One purchase. Endless satisfaction."] } };

    // SEA
    case "Shopee":
      return { shopee: { title: `${p} - Premium Quality | Best Seller | Free Shipping | COD Available`, selling_points: ["Premium quality at affordable price", "Fast shipping from local warehouse", "COD available, no risk", "4.9★ rated by 1000+ buyers"], promo_copy: "🔥 FLASH SALE! Limited stock at this price. Grab yours before it's gone!" } };
    case "Lazada":
      return { lazada: { title: `${p} - High Quality, Trusted Brand, Fast Delivery`, advantages: ["100% Authentic Guarantee", "15-Day Easy Return", "Fast & Free Shipping", "LazMall Trusted Seller"], description: `Upgrade your lifestyle with ${p}. Quality guaranteed, fast shipping, and hassle-free returns. Join thousands of satisfied customers across Southeast Asia.` } };

    default:
      return { xiaohongshu: [`这个${p}真的太好用了！强烈推荐！`] };
  }
}

// ─── Why It Works ──────────────────────────────────────────
function buildWhyItWorks(input: AnalyzeRequest) {
  const p = input.productName;
  switch (input.market) {
    case "中国大陆":
      return { summary: `${p}切中国内消费者对"好用不贵+颜值在线"的核心诉求，借助抖音/小红书种草+成熟供应链可快速起量。`, growth_logic: "抖音种草→小红书深度测评→淘宝/京东承接搜索流量→拼多多做价格锚点→用户UGC反哺社媒" };
    case "欧美":
      return { summary: `${p} addresses the gap between premium brand pricing and consumer demand for quality at accessible prices.`, growth_logic: "TikTok viral content → Amazon search capture → Shopify brand building → UGC social proof → repeat purchases" };
    case "东南亚":
      return { summary: `${p} leverages Southeast Asia's mobile-first, social-commerce-driven market with strong price-value positioning.`, growth_logic: "TikTok/Shopee Live → flash sales → KOL affiliate network → social sharing → repeat purchase via COD trust" };
    default:
      return { summary: `${p} taps into global demand for quality products at fair prices, leveraging supply chain advantages.`, growth_logic: "Multi-platform presence → localized content → regional fulfillment → customer reviews → cross-market scaling" };
  }
}

// ─── V4: Platform Matches (enhanced) ───────────────────────
function buildPlatformMatches(input: AnalyzeRequest): PlatformMatch[] {
  switch (input.market) {
    case "中国大陆":
      return [
        { platform: "抖音", score: 9.1, grade: "★★★★★", strengths: ["短视频传播效率最高", "视觉展示强，用户决策短", "达人生态成熟"], weaknesses: ["内容更新频率要求高", "投流竞争激烈"], reason: "产品展示性强，天然适配抖音内容形态" },
        { platform: "小红书", score: 8.6, grade: "★★★★☆", strengths: ["种草心智成熟，信任度高", "女性用户占比高，消费力强", "长尾流量持续性强"], weaknesses: ["起量速度慢于抖音", "图文门槛较高"], reason: "适合品质型产品建立品牌认知和信任背书" },
        { platform: "淘宝", score: 8.0, grade: "★★★★☆", strengths: ["搜索流量稳定，转化率高", "用户购买意图明确", "成熟的营销工具"], weaknesses: ["新店冷启动难度大", "广告竞价成本高"], reason: "适合承接种草流量，作为成交主阵地" },
        { platform: "京东", score: 7.2, grade: "★★★★☆", strengths: ["用户品质预期高，客单价好", "物流体验最佳", "售后体系完善"], weaknesses: ["入驻门槛较高", "运营成本高于淘宝"], reason: "适合品牌化运营路线，提升客单价和用户信任" },
        { platform: "拼多多", score: 7.0, grade: "★★★★☆", strengths: ["下沉市场覆盖广", "社交裂变能力强", "起量速度快"], weaknesses: ["客单价偏低", "品牌调性受限"], reason: "适合走量策略，但利润空间有限" },
      ];
    case "欧美":
      return [
        { platform: "Amazon", score: 9.0, grade: "★★★★★", strengths: ["Largest search volume and trust", "FBA logistics network", "Mature advertising ecosystem"], weaknesses: ["High competition on popular keywords", "Review barriers for new products"], reason: "Best platform for scaling after initial traction, with unmatched search volume" },
        { platform: "TikTok Shop", score: 8.5, grade: "★★★★☆", strengths: ["Explosive viral potential", "Lower ad costs than Amazon", "Impulse purchase behavior"], weaknesses: ["Still maturing as e-commerce platform", "Algorithm-dependent visibility"], reason: "Ideal for product launch and viral growth; pairs well with Amazon" },
        { platform: "Shopify", score: 8.0, grade: "★★★★☆", strengths: ["Full brand control and margins", "Customer data ownership", "No platform competition on PDP"], weaknesses: ["Need to drive own traffic", "Higher technical setup"], reason: "Best for long-term brand building and maximizing customer LTV" },
      ];
    case "东南亚":
      return [
        { platform: "Shopee", score: 9.2, grade: "★★★★★", strengths: ["Largest market share in SEA", "Strong mobile experience", "Integrated logistics (SLS)"], weaknesses: ["High price competition", "Commission fees increasing"], reason: "Best platform for volume and wide market coverage" },
        { platform: "TikTok Shop", score: 9.0, grade: "★★★★★", strengths: ["Fastest growing channel", "Viral content + commerce fusion", "Young user demographic"], weaknesses: ["Content production effort high", "Platform policies evolving"], reason: "Highest growth potential, especially for visually appealing products" },
        { platform: "Lazada", score: 7.8, grade: "★★★★☆", strengths: ["Strong in TH/PH/MY markets", "Brand-focused positioning", "LazMall trust badge"], weaknesses: ["Smaller audience than Shopee", "More complex seller interface"], reason: "Good secondary channel for brand building in key markets" },
      ];
    default:
      return [
        { platform: "Amazon", score: 8.8, grade: "★★★★★", strengths: ["Global reach", "Trusted platform"], weaknesses: ["High competition"], reason: "Strongest global platform" },
        { platform: "TikTok Shop", score: 8.5, grade: "★★★★☆", strengths: ["Viral potential", "Growing commerce"], weaknesses: ["Regional availability varies"], reason: "Best for content-driven growth" },
        { platform: "Shopee", score: 8.0, grade: "★★★★☆", strengths: ["SEA dominance", "Mobile-first"], weaknesses: ["Limited outside SEA"], reason: "Essential for Southeast Asia coverage" },
        { platform: "抖音", score: 7.5, grade: "★★★★☆", strengths: ["China market reach", "Content-commerce fusion"], weaknesses: ["China-only"], reason: "Key platform for China market entry" },
        { platform: "淘宝", score: 7.2, grade: "★★★★☆", strengths: ["Largest China marketplace", "Mature ecosystem"], weaknesses: ["Competitive"], reason: "Core China e-commerce platform" },
      ];
  }
}

// ─── V4: Viral Potential (enhanced) ────────────────────────
function buildViralPotential(input: AnalyzeRequest): ViralPotential {
  const hasVisual = /phone|stand|light|lamp|mirror|case|bag|toy|plush|gadget|camera|lens/i.test(input.productName);
  const hasEmotion = /pet|dog|cat|baby|kids|gift|plush/i.test(input.productName);
  const isChina = input.market === "中国大陆";
  const isSEA = input.market === "东南亚";

  if (hasVisual && hasEmotion) {
    return {
      score: 88, grade: "A",
      dimensions: { market_demand: 9, competition: 7, profit_margin: 8, content_spread: 9 },
      reasons: isChina
        ? ["视觉冲击力强，天然适合短视频传播", "情感属性驱动社交分享", "目标用户与抖音/小红书核心用户高度重合"]
        : ["High visual appeal drives organic sharing", "Emotional connection triggers viral spread", "Content-friendly format suits TikTok and Instagram"],
    };
  }
  if (hasVisual) {
    return {
      score: 78, grade: "B",
      dimensions: { market_demand: 8, competition: 5, profit_margin: 7, content_spread: 8 },
      reasons: isChina
        ? ["产品展示性强，适合短视频和图文", "购买决策受内容种草影响大", "需配合达人测评建立信任"]
        : isSEA
          ? ["Visually suited for TikTok and live shopping", "Social commerce adoption is high", "Need KOL seeding to build initial trust"]
          : ["Strong visual demo potential for short video", "Purchase decisions influenced by content", "Influencer seeding needed for initial trust"],
    };
  }
  return {
    score: 65, grade: "B",
    dimensions: { market_demand: 6, competition: 5, profit_margin: 6, content_spread: 5 },
    reasons: isChina
      ? ["品类内容传播性中等", "用户决策偏理性", "需差异化内容策略突围"]
      : ["Moderate content virality potential", "Purchase decision is more rational", "Differentiated content strategy needed"],
  };
}

// ─── V4: Content Strategy (market-aware) ───────────────────
function buildContentStrategy(input: AnalyzeRequest): ContentStrategy {
  const hasVisual = /phone|stand|light|lamp|mirror|case|bag|toy|gadget/i.test(input.productName);

  switch (input.market) {
    case "中国大陆":
      return hasVisual
        ? { strategies: ["短视频种草", "达人测评", "直播转化"], why: "视觉展示性强，抖音短视频+小红书深度测评+直播收割是最优组合。达人背书能快速建立信任，降低用户决策门槛。" }
        : { strategies: ["痛点营销", "知识科普", "价格对比"], why: "通过痛点内容唤醒需求，专业知识建立信任，价格对比突出性价比。小红书深度种草为主，抖音信息流为辅。" };
    case "欧美":
      return hasVisual
        ? { strategies: ["UGC content marketing", "Influencer unboxing", "Brand storytelling"], why: "US/EU consumers trust peer reviews and authentic content. UGC builds social proof. Influencer unboxing generates launch buzz. Brand story differentiates from commodity sellers." }
        : { strategies: ["Pain-point marketing", "Expert review", "Comparison content"], why: "Rational buyers need evidence. Expert reviews establish credibility. Comparison content highlights value proposition and reduces decision friction." };
    case "东南亚":
      return hasVisual
        ? { strategies: ["短视频引流", "直播带货", "活动营销"], why: "东南亚TikTok渗透率高，短视频+直播是最佳流量入口。价格敏感度高，活动营销（闪购/优惠券）能有效刺激转化。" }
        : { strategies: ["价格营销", "KOL推广", "社交裂变"], why: "东南亚用户对价格敏感，价格对比+促销活动效果显著。本地KOL能快速建立信任，社交裂变降低获客成本。" };
    default:
      return { strategies: ["Scene marketing", "Influencer review", "Price comparison"], why: "Multi-market approach needs flexible, universally understood content formats that work across cultures." };
  }
}
