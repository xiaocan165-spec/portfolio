import { AnalyzeRequest } from "./types";

export function buildPrompt(input: AnalyzeRequest): string {
  const painPointsHint = input.userPainPoints
    ? `\n用户提供的痛点线索：${input.userPainPoints}`
    : "";

  return `你是一位资深的跨境电商产品分析师和AI产品决策顾问。你服务的是中国跨境电商卖家，他们需要判断一个产品是否值得投入资源去做。

## 你的任务
分析以下产品，从商业价值、用户心理、市场竞争三个维度给出结构化判断。

## 产品信息
- 产品名称：${input.productName}
- 目标市场：${input.market}
- 销售平台：${input.platform}${painPointsHint}

## 分析要求

### 1. 市场分析
你必须像一个有10年跨境电商经验的运营总监一样思考：
- 该产品在目标市场的需求趋势如何？是上升期、饱和期还是下滑期？
- 竞争格局怎样？是否有明显的头部垄断，还是分散市场？
- 综合评估：这个产品是否值得一个中小卖家入场？
- 给出 1-10 分的推荐指数。低于5分意味着不建议做。

### 2. 用户画像
你必须像一个用户研究员一样深度分析：
- 谁会买这个产品？（年龄、性别、身份、消费能力）
- 他们最深层的痛点是什么？（不要泛泛而谈，要具体场景化的痛点）
- 他们为什么会产生购买冲动？（情绪驱动、功能驱动、社交驱动？）
- 购买动机要结合目标市场的文化特点。

### 3. 内容生成
- TikTok 标题：必须是英文，符合TikTok爆款逻辑（hook + curiosity gap + CTA），生成3-5条。
- 小红书文案：必须是中文，符合小红书种草风格（真实分享感 + 关键词布局 + 表情符号），1条即可。
- Amazon SEO标题：必须是英文，包含核心关键词，符合Amazon搜索逻辑，1条即可。

### 4. 深度洞察
- why_it_works：用一两句话解释这个产品的商业逻辑为什么成立。
- growth_logic：如果这个产品值得做，增长飞轮是什么？如果不值得做，问题出在哪？

## 输出格式
你必须严格返回以下JSON格式，不要添加任何markdown代码块标记，直接返回纯JSON：

{
  "market_analysis": {
    "trend_level": "High",
    "competition": "Low",
    "recommend_score": 8,
    "should_launch": true
  },
  "user_profile": {
    "target_audience": "详细描述",
    "pain_points": ["痛点1", "痛点2", "痛点3"],
    "purchase_motivation": ["动机1", "动机2"]
  },
  "content": {
    "tiktok": ["标题1", "标题2", "标题3"],
    "xiaohongshu": ["完整种草文案"],
    "amazon": ["SEO标题"]
  },
  "insights": {
    "why_it_works": "商业逻辑说明",
    "growth_logic": "增长逻辑说明"
  }
}

## 重要原则
1. 诚实分析：如果产品不值得做，直接说，不要为了讨好用户而给虚假高分。
2. 结合市场：欧美市场注重功能+品牌，东南亚注重性价比+社交裂变，全球市场需要平衡。
3. 具体而非空泛：痛点要场景化，动机要心理层面，分析要可执行。
4. 跨境电商逻辑：考虑物流成本、关税、本地化难度、退货率等实际问题。`;
}

export function parseAIResponse(text: string) {
  // Clean up the response - remove possible markdown code blocks
  let cleaned = text.trim();

  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }

  try {
    return JSON.parse(cleaned);
  } catch {
    // Try to extract JSON from the text
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Failed to parse AI response as JSON");
  }
}
