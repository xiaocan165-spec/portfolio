import { AnalyzeRequest } from "./types";

export function buildPrompt(input: AnalyzeRequest): string {
  const painPointsHint = input.userPainPoints
    ? `\n用户提供的痛点线索：${input.userPainPoints}`
    : "";

  const isChina = input.market === "中国大陆";
  const isOverseas = input.market === "欧美" || input.market === "东南亚";

  // Platform list for matching
  const platforms = isChina
    ? ["抖音", "淘宝", "京东", "拼多多", "小红书"]
    : isOverseas
      ? ["Amazon", "TikTok Shop", "Shopee", "Lazada"]
      : ["Amazon", "TikTok Shop", "Shopee", "Lazada", "抖音", "淘宝", "京东", "拼多多", "小红书"];

  const platformList = platforms.map((p) => `"${p}"`).join(" / ");

  if (isChina) {
    return buildChinaPrompt(input, platformList, platforms, painPointsHint);
  }
  return buildOverseasPrompt(input, platformList, platforms, painPointsHint);
}

// ─── 中国大陆专用 Prompt ───────────────────────────────────
function buildChinaPrompt(
  input: AnalyzeRequest,
  platformList: string,
  platforms: string[],
  painPointsHint: string
): string {
  return `你是一位资深国内电商运营顾问，拥有10年抖音/淘宝/拼多多运营经验。你的任务是深度分析一个产品，给出结构化数据。

## 产品信息
- 产品名称：${input.productName}
- 目标市场：中国大陆
- 销售平台：${input.platform}${painPointsHint}

## 核心原则（必须遵守）
1. 你只负责评分和分析，绝对不能输出"建议入场"或"不建议入场"——这个判断由系统程序自动计算。
2. 每一项评分必须有具体原因，不能空泛。
3. 分析必须结合国内电商环境（抖音兴趣电商/淘宝搜索电商/拼多多社交电商）。
4. 所有输出必须是中文，禁止出现英文。
5. 诚实分析，不讨好用户。
6. 输出固定JSON格式，不含markdown标记。

## 分析依据
- 国内消费趋势（抖音热点/小红书种草/拼多多爆款逻辑）
- 国内电商竞争情况（头部品牌/白牌竞争/价格带分布）
- 国内用户购买习惯（短视频决策/直播下单/搜索比价）
- 国内内容营销环境（内容种草→直播转化→私域复购）

## 输出JSON格式（严格按此结构）

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
    "pain_points": ["", "", ""],
    "purchase_motivation": ["", "", ""]
  },
  "competitor_analysis": {
    "brands": ["", "", ""],
    "characteristics": ["", "", ""]
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
  "content": {
    "tiktok_pain":        ["", "", ""],
    "tiktok_scene":       ["", "", ""],
    "tiktok_curiosity":   ["", "", ""],
    "xiaohongshu":        [""],
    "amazon_seo":         [""],
    "ad_copy":            ["", "", "", "", ""]
  },
  "why_it_works": {
    "summary": "",
    "growth_logic": ""
  },
  "confidence": {
    "score": 0,
    "reason": ""
  },
  "platform_matches": [
    { "platform": "平台名", "score": 0, "reason": "" }
  ],
  "viral_potential": {
    "score": 0,
    "grade": "",
    "reasons": ["", "", ""]
  },
  "content_strategy": {
    "strategies": ["", "", ""],
    "why": ""
  }
}

## 各字段填写规范

### 1. scoring（六维评分，每项0-10分）
- market_demand：国内市场需求强度。考虑抖音/淘宝搜索热度、品类趋势、季节波动。
- competition：竞争友好度。分数高=竞争低（蓝海），分数低=竞争激烈（红海）。考虑头部品牌垄断、白牌内卷程度。
- profit_margin：利润空间。考虑拿货成本、平台佣金、快递费用、投流成本占比。
- logistics：物流友好度。分数高=发货简单（小件/标品/退货率低），分数低=物流困难（大件/易碎/高退货）。
- repurchase：复购潜力。消耗品/配件类分数高。耐用品分数低。
- differentiation：差异化空间。能否在包装、场景、人群、功能上做出差异。

### 2. cross_border_metrics（市场运营指标）
- market_maturity：国内该品类市场成熟度（"低"/"中"/"高"）
- price_range：预计售价区间，国内用¥，如"¥29–¥69"
- profitability：利润率判断（"低"/"中"/"高"）
- supply_chain_difficulty：供应链难度（"低"/"中"/"高"）
- shipping_risk：发货风险（"低"/"中"/"高"），考虑退换货率
- ad_competition：投流竞争压力（"低"/"中"/"高"），考虑千次曝光成本

### 3. user_profile（用户画像）
- target_audience：国内目标用户，含年龄、性别、城市层级、消费能力、常用平台。注意国内用户特点（一二线vs下沉市场、Z世代vs宝妈群体）。
- pain_points：3个具体场景化国内用户痛点
- purchase_motivation：3个购买动机（情绪/功能/社交/性价比驱动）

### 4. competitor_analysis（竞品分析）
- brands：国内主要竞争品牌3-5个（用真实国内品牌，如小米/华为/完美日记/三只松鼠/Ubras等）
- characteristics：竞争特点3条

### 5. risks（风险分析）
3条风险，结合国内电商环境（如：平台规则变化、价格内卷、退货率高、达人合作成本上升）

### 6. opportunities（增长机会）
3条增长机会，每条包含opportunity标题和action具体行动建议

### 7. content（内容生成——全部中文）
- tiktok_pain：抖音痛点型标题3条（中文，直击痛点+解决方案）
- tiktok_scene：抖音场景型标题3条（中文，具体使用场景+产品效果）
- tiktok_curiosity：抖音好奇心型标题3条（中文，悬念+好奇心+引导）
- xiaohongshu：小红书种草文案1条（真实分享风+关键词+表情符号）
- amazon_seo：商品SEO标题1条（中文，含核心搜索词）
- ad_copy：广告卖点5条（中文短句，直击痛点/场景）

### 8. why_it_works（商业逻辑）
- summary：100字以内的商业化总结（中文）
- growth_logic：增长飞轮（获客→转化→复购路径，结合国内平台特点）

### 9. confidence（可信度）
- score：0-100。有userPainPoints时偏高（78-88），无则偏低（60-75）
- reason：可信度依据（中文）

### 10. platform_matches（平台匹配度——对所有${platforms.length}个平台打分）
对以下每个平台给出匹配度评分（0-10分），按分数从高到低排列：
${platforms.map((p, i) => `${i + 1}. ${p}`).join("\n")}
- score：匹配度分数，基于产品特性和平台用户匹配度
- reason：为什么适合/不适合这个平台（中文，一句话）

### 11. viral_potential（爆款潜力）
- score：0-100的爆款潜力指数
- grade：潜力等级，"A"/"B"/"C"（A≥80, B≥60, C<60）
- reasons：3条判断依据（如：内容传播性强、用户决策门槛低、价格带匹配平台主流）

### 12. content_strategy（内容策略推荐）
- strategies：推荐3种内容打法，从以下选择：痛点营销/场景营销/达人测评/开箱体验/价格对比/知识科普/情感共鸣/热点借势
- why：为什么推荐这些打法（中文，结合产品特点解释）

## 国内评分参考
| 维度 | 低分表现 | 高分表现 |
|------|----------|----------|
| 市场需求 | 抖音搜索量低，品类下行 | 抖音/淘宝搜索增长，品类上升期 |
| 竞争 | 头部垄断，价格战白热化 | 市场分散，无绝对头部品牌 |
| 利润 | 投流+佣金吃掉60%以上 | 毛利空间>40% |
| 物流 | 大件/易碎/退货率>30% | 小件标品/退货率<10% |
| 复购 | 耐用品，单次消费 | 消耗品/快消品，月度复购 |
| 差异化 | 完全标品，白牌价格战 | 存在微创新/场景/人群细分切口 |

直接返回JSON，不要任何markdown包裹。`;
}

// ─── 海外市场 Prompt（V2 增强版）───────────────────────────
function buildOverseasPrompt(
  input: AnalyzeRequest,
  platformList: string,
  platforms: string[],
  painPointsHint: string
): string {
  const marketNote =
    input.market === "欧美"
      ? "欧美市场：消费者注重品牌故事、产品质量、售后服务、环保理念"
      : input.market === "东南亚"
        ? "东南亚市场：价格敏感度高、社交裂变快、移动端购物主导、物流基础设施参差不齐"
        : "全球市场：需要平衡不同区域的需求差异，考虑多语言、多物流体系";

  return `你是一位资深跨境电商选品顾问，拥有10年Amazon/TikTok运营经验。你的任务是深度分析一个产品，给出结构化数据。

## 产品信息
- 产品名称：${input.productName}
- 目标市场：${input.market}
- 销售平台：${input.platform}${painPointsHint}

## 核心原则（必须遵守）
1. 你只负责评分和分析，绝对不能输出"建议入场"或"不建议入场"——这个判断由系统程序自动计算。
2. 每一项评分必须有具体原因，不能空泛。
3. ${marketNote}
4. 诚实分析，不讨好用户。
5. 输出固定JSON格式，不含markdown标记。

## 输出JSON格式（严格按此结构）

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
    "pain_points": ["", "", ""],
    "purchase_motivation": ["", "", ""]
  },
  "competitor_analysis": {
    "brands": ["", "", ""],
    "characteristics": ["", "", ""]
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
  "content": {
    "tiktok_pain":        ["", "", ""],
    "tiktok_scene":       ["", "", ""],
    "tiktok_curiosity":   ["", "", ""],
    "xiaohongshu":        [""],
    "amazon_seo":         [""],
    "ad_copy":            ["", "", "", "", ""]
  },
  "why_it_works": {
    "summary": "",
    "growth_logic": ""
  },
  "confidence": {
    "score": 0,
    "reason": ""
  },
  "platform_matches": [
    { "platform": "平台名", "score": 0, "reason": "" }
  ],
  "viral_potential": {
    "score": 0,
    "grade": "",
    "reasons": ["", "", ""]
  },
  "content_strategy": {
    "strategies": ["", "", ""],
    "why": ""
  }
}

## 各字段填写规范

### 1. scoring（六维评分，每项0-10分）
- market_demand：目标市场需求强度。考虑搜索量、趋势走向、季节性。
- competition：竞争友好度。分数高=竞争低/机会大（蓝海8-9分），分数低=红海激烈。
- profit_margin：利润空间。考虑采购成本、平台佣金、跨境物流、广告成本占比。
- logistics：物流友好度。分数高=物流简单（小件轻量），分数低=物流困难（大件易碎需认证）。
- repurchase：复购潜力。消耗品/配件分数高，耐用品分数低。
- differentiation：差异化空间。是否存在微创新切入点、包装升级、场景细分可能。

### 2. cross_border_metrics（跨境电商指标）
- market_maturity：市场成熟度（"低"/"中"/"高"）
- price_range：预计售价区间，用$，如"$29–$49"
- profitability：利润率判断（"低"/"中"/"高"）
- supply_chain_difficulty：供应链难度（"低"/"中"/"高"）
- shipping_risk：运输风险（"低"/"中"/"高"），考虑体积重量易损性
- ad_competition：广告竞争压力（"低"/"中"/"高"），考虑CPC成本

### 3. user_profile（用户画像）
- target_audience：目标受众，含年龄、性别、身份、消费能力、受哪些平台影响
- pain_points：3个具体场景化痛点
- purchase_motivation：3个购买动机（情绪/功能/社交/价值观驱动）

### 4. competitor_analysis（竞品分析）
- brands：目标市场主要竞争品牌3-5个
- characteristics：竞争特点3条

### 5. risks（风险分析）
3条风险，每条含risk描述和severity（"低"/"中"/"高"）

### 6. opportunities（增长机会）
3条机会，每条含opportunity标题和action具体行动建议

### 7. content（内容生成）
- tiktok_pain：痛点型标题3条（英文，hook+痛点+解决方案）
- tiktok_scene：场景型标题3条（英文，场景+产品+结果）
- tiktok_curiosity：好奇心型标题3条（英文，悬念+CTA）
- xiaohongshu：中文种草文案1条
- amazon_seo：英文SEO标题1条
- ad_copy：英文广告卖点5条（短句）

### 8. why_it_works（商业逻辑）
- summary：100字以内商业化总结
- growth_logic：增长飞轮逻辑

### 9. confidence（可信度）
- score：0-100。有userPainPoints时偏高（78-88），无则偏低（60-75）
- reason：可信度依据

### 10. platform_matches（平台匹配度）
对以下每个平台给出匹配度评分（0-10分），按分数从高到低排列：
${platforms.map((p, i) => `${i + 1}. ${p}`).join("\n")}
- score：匹配度分数
- reason：为什么适合/不适合（英文或中文，与市场语言一致）

### 11. viral_potential（爆款潜力）
- score：0-100
- grade："A"/"B"/"C"（A≥80, B≥60, C<60）
- reasons：3条判断依据

### 12. content_strategy（内容策略推荐）
- strategies：推荐3种内容打法，从：pain marketing / scene marketing / influencer review / unboxing / price comparison / knowledge sharing 中选择
- why：推荐原因

## 评分参考基准
| 维度 | 低分(0-3) | 高分(8-10) |
|------|-----------|------------|
| 市场需求 | 搜索量下滑 | 搜索量增长，需求旺盛 |
| 竞争 | 头部垄断，价格战 | 市场分散，无绝对头部 |
| 利润 | 成本>60% | 成本<30%，利润可观 |
| 物流 | 大件/易碎/高退货 | 小件/轻量/标准化 |
| 复购 | 买一次用5年 | 月度回购 |
| 差异化 | 完全标品 | 有微创新/场景细分切口 |

直接返回JSON，不要任何markdown包裹。`;
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
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        // fall through
      }
    }
    throw new Error("Failed to parse AI response as JSON");
  }
}
