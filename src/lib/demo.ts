import { AnalyzeRequest, AnalyzeResponse } from "./types";

/**
 * Intelligent Demo Mode
 * Generates realistic product analysis without an AI API key.
 * Makes the project runnable out of the box for demos and portfolio.
 */
export function generateDemoAnalysis(input: AnalyzeRequest): AnalyzeResponse {
  const name = input.productName.toLowerCase();
  const market = input.market;
  const platform = input.platform;

  // Detect product category from name
  const isElectronic = /phone|charger|stand|mount|holder|cable|adapter|power|battery|speaker|airpods|watch|band|case|light|lamp|fan|heater|cooler|camera|lens|drone/i.test(name);
  const isKitchen = /kitchen|cook|bake|knife|pan|pot|cup|mug|bottle|blender|grinder|slicer|peeler|timer|scale|container|jar|storage|food/i.test(name);
  const isFitness = /fitness|yoga|gym|exercise|workout|resistance|band|dumbbell|jump rope|pushup|pullup|ab|roller|massage|gun|foam/i.test(name);
  const isBeauty = /beauty|skin|face|hair|nail|makeup|brush|comb|mirror|mask|cream|serum|oil|perfume|cologne|beard|shaver/i.test(name);
  const isPet = /pet|dog|cat|leash|collar|bowl|toy|bed|carrier|groom|treat|chew/i.test(name);
  const isBaby = /baby|kids|toddler|child|infant|mom|parent|stroller|carrier|diaper|bib|pacifier/i.test(name);
  const isOutdoor = /camping|hiking|outdoor|tent|sleeping bag|lantern|flashlight|compass|backpack|travel|picnic|bbq|grill/i.test(name);
  const isHomeOffice = /desk|chair|monitor|keyboard|mouse|pad|organizer|cable|management|ergonomic|standing/i.test(name);

  // Build analysis based on category
  let category = "general";
  if (isElectronic) category = "electronic";
  else if (isKitchen) category = "kitchen";
  else if (isFitness) category = "fitness";
  else if (isBeauty) category = "beauty";
  else if (isPet) category = "pet";
  else if (isBaby) category = "baby";
  else if (isOutdoor) category = "outdoor";
  else if (isHomeOffice) category = "homeoffice";

  const analysis = getAnalysisByCategory(category, input);

  // Customize with product name
  analysis.content.tiktok = analysis.content.tiktok.map((t) =>
    t.replace(/\{product\}/gi, input.productName)
  );
  analysis.content.xiaohongshu = analysis.content.xiaohongshu.map((t) =>
    t.replace(/\{product\}/gi, input.productName)
  );
  analysis.content.amazon = analysis.content.amazon.map((t) =>
    t.replace(/\{product\}/gi, input.productName)
  );
  analysis.user_profile.target_audience =
    analysis.user_profile.target_audience.replace(
      /\{product\}/gi,
      input.productName
    );
  analysis.insights.why_it_works = analysis.insights.why_it_works.replace(
    /\{product\}/gi,
    input.productName
  );
  analysis.insights.growth_logic = analysis.insights.growth_logic.replace(
    /\{product\}/gi,
    input.productName
  );

  return analysis;
}

function getAnalysisByCategory(
  category: string,
  input: AnalyzeRequest
): AnalyzeResponse {
  const templates: Record<string, AnalyzeResponse> = {
    electronic: {
      market_analysis: {
        trend_level: "High",
        competition: "High",
        recommend_score: 7,
        should_launch: true,
      },
      user_profile: {
        target_audience:
          "25-40岁欧美科技爱好者和数码产品用户，以男性为主（65%），年收入$40k-$80k，追求便捷和效率的人群。在{product}这类产品上，购买决策受Reddit、YouTube测评影响大。",
        pain_points: [
          "现有产品设计粗糙，与Apple生态不匹配",
          "充电/连接不稳定，影响日常使用体验",
          "安装复杂，需要额外工具或打孔",
          "同类产品价格虚高，性价比不足",
        ],
        purchase_motivation: [
          "提升桌面/家居科技感（审美驱动）",
          "解决具体使用场景中的不便（功能驱动）",
          "在社交圈中获得认同和讨论（社交驱动）",
          "花小钱获得明显的生活品质提升（性价比驱动）",
        ],
      },
      content: {
        tiktok: [
          "Stop holding your {product} like it's 2019 💀 This changes everything. #tech #gadget",
          "The {product} hack they don't want you to know about 👀 Link in bio!",
          "POV: You finally found a {product} that actually works 🤯 #amazonfinds",
          "Rate my setup 1-10 after I added this {product} 🔥 #desksetup #productivity",
          "Your {product} is the problem. Here's the fix. 🎯 #lifehack #musthave",
        ],
        xiaohongshu: [
          "被问爆了！这个{product}真的好用到离谱✨\n\n姐妹们！之前一直觉得这种产品是智商税，直到自己真的用了一个月...只能说相见恨晚！\n\n🎯 适合人群：经常出差/桌面收纳强迫症/追求效率的打工人都给我冲！\n\n💡 使用感受：质感完全不输大牌，性价比真的绝了。用了一周同事都在问链接😂\n\n#好物分享 #提升幸福感 #{product} #打工人必备 #跨境电商",
        ],
        amazon: [
          "{product} - Premium Magnetic Stand Compatible with MagSafe, Adjustable Angle, Strong Hold, Desk Mount for Home Office, Works with All Smartphones",
        ],
      },
      insights: {
        why_it_works:
          "{product}切中了消费电子配件市场的一个核心矛盾：用户需要高品质的Apple生态体验，但不想支付Apple官方的高溢价。通过精准的工业设计和制造优势，可以实现90%的体验、40%的价格，这是中国供应链出海的标准打法。",
        growth_logic:
          "第一阶段通过TikTok短视频种草获取初始用户评价；第二阶段优化Amazon SEO关键词截获品类搜索流量；第三阶段利用用户UGC内容反哺社媒传播，形成内容-流量-转化的增长飞轮。关键指标是前100单的用户评分，如果低于4.3星则需要立即优化产品。",
      },
    },
    kitchen: {
      market_analysis: {
        trend_level: "Medium",
        competition: "High",
        recommend_score: 6,
        should_launch: true,
      },
      user_profile: {
        target_audience:
          "28-45岁欧美家庭主妇和烹饪爱好者，以女性为主（70%），关注健康饮食和厨房效率，受Instagram美食博主和Pinterest影响大。",
        pain_points: [
          "传统工具操作繁琐，浪费时间",
          "收纳占用空间，小厨房不友好",
          "食材处理不均匀影响成品质量",
          "清洗困难，容易藏污纳垢",
        ],
        purchase_motivation: [
          "节省烹饪准备时间（效率驱动）",
          "产出专业级的烹饪效果（成就驱动）",
          "在社交媒体分享美食（内容驱动）",
          "提升家庭生活品质（生活方式驱动）",
        ],
      },
      content: {
        tiktok: [
          "This {product} will save you 20 mins every meal 🤯 #kitchenhack #cooking",
          "Stop chopping like a caveman. {product} is the upgrade you need 🔪",
          "The {product} that went viral for a reason 👀 #amazonmusthaves",
          "Meal prep just got 10x easier with this {product} 🥗 #mealprep",
          "I can't believe I didn't buy this {product} sooner 💀 #kitchengadgets",
        ],
        xiaohongshu: [
          "厨房小白秒变主厨！这个{product}真的太好用了🔥\n\n作为一个每天加班到8点的上班族，做饭最大的障碍就是备菜1小时吃饭10分钟...这个{product}真的救了我的命！\n\n✨ 15分钟搞定3道菜的备料\n✨ 清洗超方便，水一冲就干净\n✨ 颜值在线，摆在厨房就是装饰\n\n真心建议所有懒人姐妹人手一个！\n\n#厨房好物 #烹饪神器 #{product} #懒人必备 #独居生活",
        ],
        amazon: [
          "{product} - Professional-Grade Kitchen Tool, Stainless Steel, Ergonomic Design, Easy Clean, Space-Saving Storage, Perfect for Home Cooks & Meal Prep",
        ],
      },
      insights: {
        why_it_works:
          "{product}的成功逻辑在于将'节省时间'这个刚需转化为可感知的产品体验。在现代生活中，烹饪时间被严重压缩，任何能显著降低备菜时间的产品都有巨大的市场空间。同时厨房用品天然具有'礼物属性'和高复购率。",
        growth_logic:
          "核心增长策略是人传人——厨房用品天然适合社交传播。在TikTok通过before/after对比视频展示效率差异，在小红书通过美食成品图吸引搜索流量。Amazon端通过长尾关键词布局（如'kitchen gifts for mom'）获取礼品搜索流量。",
      },
    },
    fitness: {
      market_analysis: {
        trend_level: "High",
        competition: "Medium",
        recommend_score: 8,
        should_launch: true,
      },
      user_profile: {
        target_audience:
          "22-38岁欧美健身人群，男女比例均衡，追求居家健身效率，受Instagram和TikTok健身博主影响大，年健身消费$200-$800。",
        pain_points: [
          "健身房费用高且时间受限",
          "居家健身缺乏指导和动力",
          "设备占地大，收纳困难",
          "廉价器材使用体验差，容易受伤",
        ],
        purchase_motivation: [
          "低成本替代健身房（经济驱动）",
          "随时随地的健身自由（自由驱动）",
          "看到身材变化的成就感（结果驱动）",
          "在社交媒体展示健身成果（社交驱动）",
        ],
      },
      content: {
        tiktok: [
          "The {product} that replaced my gym membership 🏋️ #homegym #fitness",
          "3 moves with the {product} that changed my body in 30 days 🔥",
          "Stop wasting money on gyms. This {product} pays for itself 💯",
          "POV: You found the only {product} you actually need 👀 #fitnesstips",
          "The {product} hack fitness influencers don't share 🤫 #workout",
        ],
        xiaohongshu: [
          "在家练出马甲线！这个{product}真的比健身房香多了💪\n\n作为一个社恐＋懒人，去健身房真的是双重折磨...直到入了这个{product}，才发现原来在家也可以高效训练！\n\n🔥 占地不到0.5㎡，租房党友好\n🔥 可调节难度，新手到大神都适用\n🔥 跟着APP练，相当于请了私教\n\n坚持30天已经看到线条变化了！姐妹们冲就完了！\n\n#居家健身 #{product} #瘦身打卡 #健身好物 #坚持就是胜利",
        ],
        amazon: [
          "{product} - Professional-Grade Home Fitness Equipment, Adjustable Resistance, Portable Design, App-Guided Workouts Included, Perfect for Full Body Training at Home",
        ],
      },
      insights: {
        why_it_works:
          "{product}的成功根基在于全球居家健身趋势的不可逆增长。后疫情时代，大量消费者已经习惯在家健身，但他们需要的不是大型器械，而是便携、多功能、高性价比的解决方案。这个市场在欧美正从early majority向late majority过渡。",
        growth_logic:
          "健身产品的增长核心是「效果可视化」。通过30天挑战赛等UGC活动，让用户主动发布before/after照片，形成社交证明的飞轮。Amazon端通过FBA发货优势（健身器材退货率较高，快速配送降低退货意愿）和A+内容页面提升转化。",
      },
    },
    beauty: {
      market_analysis: {
        trend_level: "High",
        competition: "High",
        recommend_score: 6,
        should_launch: true,
      },
      user_profile: {
        target_audience:
          "18-35岁欧美女性，重视个人护理和外貌管理，受社交媒体美妆博主深度影响，月均美妆消费$30-$150，对成分和品牌故事有要求。",
        pain_points: [
          "大牌产品价格过高，性价比不足",
          "成分不透明，担心过敏或伤害皮肤",
          "效果宣传夸张但实际使用感差",
          "包装不够高级，缺少仪式感",
        ],
        purchase_motivation: [
          "获得媲美大牌的护肤/美妆效果（效果驱动）",
          "社交圈中获得赞美和关注（社交驱动）",
          "犒劳自己、提升自信（情绪驱动）",
          "对Clean Beauty和可持续理念的认同（价值观驱动）",
        ],
      },
      content: {
        tiktok: [
          "This {product} is why my skin is GLOWING ✨ #skincare #beautyfinds",
          "The {product} that broke TikTok (for a reason) 👀 #viralmakeup",
          "Dermatologists hate this {product} hack 💀 #skincaretips",
          "Budget-friendly {product} that looks EXPENSIVE 💅 #dupe #beauty",
          "GRWM using only the {product} that changed my life 🔥 #grwm #makeup",
        ],
        xiaohongshu: [
          "无限回购！这个{product}真的不输大牌，用一次就爱上💕\n\n先说一下我的肤质：混油皮+敏感肌，超级挑产品。之前一直用某大牌平替（¥800+），直到朋友推荐了{product}...\n\n用了一个月的真实感受：\n✨ 质地太舒服了，吸收快不黏腻\n✨ 成分表干净，敏感肌友好\n✨ 包装质感满分，摆梳妆台太好看\n\n最重要的是：价格只有大牌的1/3！这个羊毛必须薅！\n\n#护肤分享 #{product} #性价比好物 #敏感肌护肤 #美妆推荐",
        ],
        amazon: [
          "{product} - Premium Quality, Dermatologist-Tested, Clean Ingredients, Cruelty-Free, Suitable for Sensitive Skin, Professional Results at Home",
        ],
      },
      insights: {
        why_it_works:
          "{product}站在两个趋势的交汇点：一是Clean Beauty在欧美的持续升温，二是消费者从'大牌崇拜'向'成分主义'的理性迁移。通过强调成分透明度和使用效果而非品牌溢价，可以抢占DTC美妆赛道的心智空间。",
        growth_logic:
          "美妆产品的增长引擎是KOC（关键意见消费者）驱动的信任链。通过免费寄样给中小量级博主换取真实测评内容，在TikTok和Instagram形成内容矩阵。当用户搜索产品名时，看到的不是官方广告而是真实的种草内容，转化率会大幅提升。",
      },
    },
    pet: {
      market_analysis: {
        trend_level: "High",
        competition: "Medium",
        recommend_score: 8,
        should_launch: true,
      },
      user_profile: {
        target_audience:
          "25-45岁欧美宠物主人，视宠物为家庭成员（Pet Humanization），愿意为宠物的舒适和健康支付溢价，年宠物消费$500-$2000+。",
        pain_points: [
          "宠物用品质量差，容易被咬坏",
          "清洁麻烦，异味难去除",
          "宠物不配合使用,买了等于白买",
          "缺乏针对特定品种/体型的适配产品",
        ],
        purchase_motivation: [
          "让宠物更舒适健康（关爱驱动）",
          "在宠物社群中获得认可（社交驱动）",
          "解决具体养宠痛点（功能驱动）",
          "宠物用品的礼物和分享属性（情感驱动）",
        ],
      },
      content: {
        tiktok: [
          "My dog's reaction to this {product} is PRICELESS 🐕 #dogsoftiktok #petfinds",
          "Best $20 I ever spent on my cat 😭 {product} is a game changer #catsoftiktok",
          "The {product} every pet parent needs ASAP 🐾 #pettok #amazonfinds",
          "Stop buying cheap pet stuff. Your furbaby deserves {product} 💯",
          "Pet owner hack #47: Get the {product}. Thank me later. 🎯",
        ],
        xiaohongshu: [
          "养宠3年最值得的投入！这个{product}直接提升人宠幸福感🐱\n\n养猫3年踩了无数坑，最头疼的就是...（你懂的）。直到被宠友群安利了这个{product}，感觉之前的钱都白花了！\n\n🐾 我家猫用了之后的变化：\n✨ 明显更愿意主动去用\n✨ 再也没出现过之前的尴尬情况\n✨ 清洗巨方便，不费妈\n\n真诚分享给每一个养宠人，早买早享受！\n\n#养宠好物 #{product} #铲屎官必备 #猫咪好物 #养狗必备",
        ],
        amazon: [
          "{product} for Dogs & Cats - Premium Quality, Durable & Safe Materials, Easy to Clean, Vet-Recommended Design, Perfect for All Breeds and Sizes",
        ],
      },
      insights: {
        why_it_works:
          "{product}吃透了'宠物拟人化'（Pet Humanization）这个千亿美元级别的消费趋势。欧美宠物主人将宠物视为家庭成员，因此他们的消费逻辑与婴儿用品高度相似——安全、舒适、品牌信任比价格更重要。这是一个高客单价、高复购率的赛道。",
        growth_logic:
          "宠物产品的增长飞轮是'宠物社群裂变+Amazon Subscribe & Save'。宠物用品天然适合订阅制（消耗品每月复购），在Amazon上设置Subscribe & Save折扣可以有效锁定长期客户。内容侧通过宠物可爱视频自然植入产品，UGC素材获取成本极低。",
      },
    },
    outdoor: {
      market_analysis: {
        trend_level: "High",
        competition: "Medium",
        recommend_score: 7,
        should_launch: true,
      },
      user_profile: {
        target_audience:
          "25-40岁欧美户外运动爱好者，热爱露营、徒步、探险，追求轻量化和多功能性，受YouTube户外频道和REI文化影响深。",
        pain_points: [
          "户外装备笨重，不利于长途携带",
          "多功能产品往往每个功能都做不好",
          "价格跨度大，很难判断性价比",
          "极端环境下产品可靠性的担忧",
        ],
        purchase_motivation: [
          "探索自然的自由感（精神驱动）",
          "在户外社群中获得认可和分享（社交驱动）",
          "对装备技术参数和设计的热衷（极客驱动）",
          "安全感和可靠性的需求（安全驱动）",
        ],
      },
      content: {
        tiktok: [
          "The {product} I trust at 10,000 feet 🏔️ #outdoorgear #camping",
          "Packing light just got real with this {product} 🎒 #backpacking",
          "Survived a storm with THIS {product} ⛈️ #campinglife #musthave",
          "The {product} that replaced 5 things in my pack 🤯 #ultralight",
          "REI employees gatekeep this {product} and now I know why 👀",
        ],
        xiaohongshu: [
          "户外人必入！这个{product}让我露营体验直接拉满⛺\n\n周末去了一趟莫干山露营，带了新入的{product}，结果同行的老户外都被种草了！\n\n🏕️ 两天一夜实测体验：\n✨ 轻到离谱，随身带着完全不累\n✨ 关键时刻真的好用，安全感满满\n✨ 设计细节用心了，一看就是懂户外的人做的\n\n户外装备不一定要最贵的，但一定要可靠的。这个真的可以冲！\n\n#户外露营 #{product} #露营装备 #户外好物 #轻量化",
        ],
        amazon: [
          "{product} - Ultralight Outdoor Gear for Camping & Hiking, Weather-Resistant, Multi-Functional Design, Compact & Portable, Trusted by Outdoor Enthusiasts",
        ],
      },
      insights: {
        why_it_works:
          "{product}的成功建立在欧美户外文化的基础上——户外活动在美国不是小众爱好，而是主流生活方式。超过50%的美国人在2023年参与了至少一次户外活动。这个市场不仅体量大，而且消费者对装备的消费意愿很强，因为他们将装备视为'安全投资'而非可有可无的消费。",
        growth_logic:
          "户外产品的增长是典型的'口碑+社群'模式。1个满意的用户会向整个露营小组推荐产品。在YouTube上合作户外博主做深度测评（而非简单开箱），建立产品专业信任度。Amazon端通过'户外装备'品类节点和礼品季（父亲节、圣诞节）做大促转化。",
      },
    },
    homeoffice: {
      market_analysis: {
        trend_level: "Medium",
        competition: "High",
        recommend_score: 6,
        should_launch: true,
      },
      user_profile: {
        target_audience:
          "25-50岁欧美远程办公人群，包括科技从业者、自由职业者、混合办公白领，追求效率与舒适并存，受YouTube Desk Setup文化和r/battlestations社区影响。",
        pain_points: [
          "长期伏案导致颈椎腰椎不适",
          "桌面线缆杂乱影响专注力",
          "显示器高度不合适导致驼背",
          "现有产品与Apple/Mac生态不协调",
        ],
        purchase_motivation: [
          "提升每天8小时的工作体验（体验驱动）",
          "在社交媒体展示完美桌面（展示驱动）",
          "用专业设备提升自我认同感（身份驱动）",
          "雇主提供的居家办公补贴刺激消费（政策驱动）",
        ],
      },
      content: {
        tiktok: [
          "Your WFH setup needs this {product} upgrade 💻 #desksetup #wfh",
          "The {product} that fixed my back pain after 2 years 😭 #ergonomics",
          "Clean desk = clean mind. This {product} is a MUST 🧘 #productivity",
          "$50 {product} that makes your desk look like you earn 6 figures 💅",
          "Day 1 vs Day 30 after getting the {product} 🔥 #desksetupgoals",
        ],
        xiaohongshu: [
          "居家办公3年的血泪经验：这个{product}真的不能省💻\n\n作为一名每天伏案10h+的程序员，之前一直凑合用公司发的装备，直到腰开始抗议...\n\n做了无数功课后入了{product}，用了三个月后想说：早买早受益！\n\n💡 最直观的改变：\n✨ 脖子和肩膀再也没疼过\n✨ 桌面干净了心情都好了\n✨ 视频会议的背景终于不用糊了\n\n居家办公人，投资自己的身体永远不亏！\n\n#居家办公 #{product} #桌面改造 #程序员好物 #办公效率",
        ],
        amazon: [
          "{product} - Ergonomic Design for Home Office, Adjustable & Sturdy, Cable Management Included, Compatible with Standing Desk Setup, Professional Workspace Upgrade",
        ],
      },
      insights: {
        why_it_works:
          "{product}对冲的是远程办公普及带来的'居家健康焦虑'。混合办公模式在欧美已成为常态，但大多数人的家里并没有配备符合人体工学的办公设备。当颈椎痛、腰疼成为远程工作者的普遍痛点时，任何能缓解这些问题的产品都有稳定的需求基础。",
        growth_logic:
          "居家办公产品的增长策略是'内容即广告'。Desk Setup内容在YouTube和TikTok上天然具有高完播率（观众喜欢看前后对比），产品在视频中自然展示即可获得流量。Amazon端通过'home office essentials'等品类关键词卡位，同时利用企业采购（Amazon Business）获取B2B订单。",
      },
    },
    general: {
      market_analysis: {
        trend_level: "Medium",
        competition: "Medium",
        recommend_score: 6,
        should_launch: true,
      },
      user_profile: {
        target_audience:
          "25-45岁欧美中产阶级消费者，习惯于在线购物，受社交媒体广告和产品测评影响，追求性价比和品质的平衡，月均网购消费$100-$500。",
        pain_points: [
          "市面上同类产品品质参差不齐，选择困难",
          "对产品实际效果缺乏信心，担心踩坑",
          "退换货流程繁琐，试错成本高",
          "希望找到高性价比的解决方案",
        ],
        purchase_motivation: [
          "解决某个具体的生活痛点（功能驱动）",
          "提升生活品质和效率（效率驱动）",
          "在社交圈中获得认可（社交驱动）",
          "花合理的钱获得超预期的体验（价值驱动）",
        ],
      },
      content: {
        tiktok: [
          "This {product} solves a problem you didn't know you had 🤯 #lifehack",
          "I tested {product} for 30 days. Here's the truth. 👀 #review",
          "The one {product} you need in your life right now 🔥 #amazonfinds",
          "Stop scrolling. This {product} is worth every penny 💯 #musthave",
          "Your life before vs after {product} 📈 #glowup #productivity",
        ],
        xiaohongshu: [
          "相见恨晚！这个{product}真的提升了我的生活质量✨\n\n大家好！今天分享一个我用了2周的好东西——{product}。一开始也是半信半疑，但用了之后真的后悔没早买！\n\n📝 真实使用体验：\n✨ 解决了我一直以来的XXX烦恼\n✨ 质量完全超出价格预期\n✨ 颜值高，平时放着就是装饰\n\n如果你也在纠结要不要入手，我可以负责任地说：值得！\n\n#好物分享 #{product} #提升幸福感 #生活好物 #性价比推荐",
        ],
        amazon: [
          "{product} - Premium Quality, Multi-Purpose Design, Durable Construction, Easy to Use, Perfect for Home & Office, Satisfaction Guaranteed",
        ],
      },
      insights: {
        why_it_works:
          "{product}的商业模式基于跨境电商的核心优势：中国成熟的供应链体系可以以极低的成本生产出品质接近品牌货的产品。只要在产品设计和质检上做好把控，就能以'30%的价格、80%的体验'切入市场，这是中国卖家出海的底层逻辑。",
        growth_logic:
          "标准增长路径分三步：第一步，小批量测试（500-1000单）验证产品-市场匹配；第二步，通过TikTok短视频种草和Amazon PPC广告放大流量；第三步，收集用户反馈迭代产品，申请设计专利建立壁垒，从'卖货'模式升级为'品牌'模式。",
      },
    },
  };

  const base = templates[category] || templates.general;

  // Adjust for market
  if (input.market === "东南亚") {
    base.market_analysis.recommend_score = Math.min(
      10,
      base.market_analysis.recommend_score + 1
    );
    base.market_analysis.competition = "Low";
    if (base.market_analysis.trend_level === "Medium")
      base.market_analysis.trend_level = "High";
    base.user_profile.purchase_motivation.push("价格敏感，追求极致性价比（市场驱动）");
  }

  return base;
}
