"use client";

import { useState } from "react";
import type {
  AnalyzeRequest,
  AnalyzeResponse,
  AnalysisStatus,
} from "@/lib/types";
import { generateDemoAnalysis } from "@/lib/demo";
import { buildPrompt, parseAIResponse } from "@/lib/ai";

const MARKETS = ["欧美", "东南亚", "全球"] as const;
const PLATFORMS = ["TikTok", "Amazon", "Xiaohongshu"] as const;

function ScoreRing({ score }: { score: number }) {
  const angle = (score / 10) * 360;
  const color =
    score >= 7 ? "#34C759" : score >= 5 ? "#FF9500" : "#FF3B30";

  return (
    <div className="relative w-[72px] h-[72px] flex-shrink-0">
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        <circle
          cx="40" cy="40" r="33"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="5"
        />
        <circle
          cx="40" cy="40" r="33"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${(angle / 360) * 207.3} 207.3`}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold tracking-tight text-white">
          {score}
        </span>
      </div>
    </div>
  );
}

function TrendBadge({ level }: { level: string }) {
  const config: Record<string, { label: string; className: string }> = {
    High: {
      label: "高增长",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    Medium: {
      label: "稳定期",
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    Low: {
      label: "低需求",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };
  const c = config[level] || config.Low;
  return (
    <span
      className={`inline-flex text-xs font-medium px-3 py-1 rounded-full border ${c.className}`}
    >
      {c.label}
    </span>
  );
}

function LaunchBadge({ should }: { should: boolean }) {
  return should ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      建议入场
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
      不建议做
    </span>
  );
}

export default function ProductAnalyzer() {
  const [form, setForm] = useState<AnalyzeRequest>({
    productName: "",
    market: "欧美",
    platform: "TikTok",
    userPainPoints: "",
  });
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productName.trim()) return;

    setStatus("loading");
    setError("");
    setResult(null);

    const aiApiKey = process.env.NEXT_PUBLIC_AI_API_KEY;
    const aiBaseUrl = process.env.NEXT_PUBLIC_AI_BASE_URL || "https://api.deepseek.com";
    const aiModel = process.env.NEXT_PUBLIC_AI_MODEL || "deepseek-chat";

    // If API key is configured, try AI first, fallback to demo on failure
    if (aiApiKey) {
      try {
        const prompt = buildPrompt(form);
        const res = await fetch(`${aiBaseUrl}/v1/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aiApiKey}`,
          },
          body: JSON.stringify({
            model: aiModel,
            messages: [
              {
                role: "system",
                content:
                  "You are a senior cross-border e-commerce product analyst. You output ONLY valid JSON, no markdown, no code blocks, no extra text.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 2000,
          }),
        });

        if (!res.ok) {
          throw new Error(`AI API error: ${res.status}`);
        }

        const completion = await res.json();
        const rawResponse = completion.choices?.[0]?.message?.content || "";

        if (rawResponse) {
          const aiParsed = parseAIResponse(rawResponse);
          if (
            aiParsed.market_analysis &&
            aiParsed.user_profile &&
            aiParsed.content &&
            aiParsed.insights
          ) {
            setResult(aiParsed);
            setStatus("success");
            return;
          }
        }
        throw new Error("AI returned invalid data");
      } catch (aiErr) {
        console.warn("AI API failed, using demo fallback:", aiErr);
      }
    }

    // Fallback to client-side demo mode
    try {
      const demoResult = generateDemoAnalysis(form);
      setResult(demoResult);
      setStatus("success");
    } catch {
      setError("AI暂时无法分析，请稍后再试");
      setStatus("error");
    }
  };

  const updateField = <K extends keyof AnalyzeRequest>(
    key: K,
    value: AnalyzeRequest[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-content mx-auto px-5">
      {/* Input Card */}
      <div className="glass-card p-6 mb-6 transition-card">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-[13px] font-medium text-white/50 mb-2">
              产品名称
            </label>
            <input
              type="text"
              value={form.productName}
              onChange={(e) => updateField("productName", e.target.value)}
              placeholder="例如: Magnetic Phone Stand, 磁吸手机支架..."
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-white/15 transition-all focus:border-ios-blue/40"
              required
            />
          </div>

          {/* Market & Platform row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-white/50 mb-2">
                目标市场
              </label>
              <select
                value={form.market}
                onChange={(e) =>
                  updateField(
                    "market",
                    e.target.value as AnalyzeRequest["market"]
                  )
                }
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[15px] text-white appearance-none cursor-pointer transition-all focus:border-ios-blue/40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23ffffff40' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: "36px",
                }}
              >
                {MARKETS.map((m) => (
                  <option key={m} value={m} className="bg-[#1c1c1e]">
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-white/50 mb-2">
                销售平台
              </label>
              <select
                value={form.platform}
                onChange={(e) =>
                  updateField(
                    "platform",
                    e.target.value as AnalyzeRequest["platform"]
                  )
                }
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[15px] text-white appearance-none cursor-pointer transition-all focus:border-ios-blue/40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23ffffff40' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: "36px",
                }}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p} className="bg-[#1c1c1e]">
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pain points (optional) */}
          <div>
            <label className="block text-[13px] font-medium text-white/50 mb-2">
              用户痛点{" "}
              <span className="text-white/20 font-normal">(选填)</span>
            </label>
            <textarea
              value={form.userPainPoints}
              onChange={(e) =>
                updateField("userPainPoints", e.target.value)
              }
              placeholder="描述你知道的用户痛点，帮助 AI 更精准分析..."
              rows={3}
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-white/15 resize-none transition-all focus:border-ios-blue/40"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading" || !form.productName.trim()}
            className="w-full bg-ios-blue text-white font-semibold text-[15px] py-3.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle
                    cx="8" cy="8" r="6"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 2a6 6 0 0 1 6 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                分析中...
              </span>
            ) : (
              "开始分析"
            )}
          </button>
        </form>
      </div>

      {/* Error State */}
      {status === "error" && (
        <div className="glass-card p-5 mb-6 animate-fade-in border-red-500/20">
          <p className="text-[14px] text-red-400/80 text-center">{error}</p>
        </div>
      )}

      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="space-y-4 animate-fade-in">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6">
              <div className="h-4 w-24 bg-white/[0.04] rounded mb-4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 bg-white/[0.03] rounded w-full animate-pulse" />
                <div className="h-3 bg-white/[0.03] rounded w-3/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {status === "success" && result && (
        <div className="space-y-4">
          {/* Card 1: Market Analysis */}
          <div className="glass-card p-6 transition-card animate-fade-in">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">📊</span>
              <h2 className="text-[15px] font-semibold text-white/80">
                市场分析
              </h2>
            </div>

            <div className="flex items-start gap-5">
              <ScoreRing score={result.market_analysis.recommend_score} />
              <div className="flex-1 space-y-3 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <TrendBadge level={result.market_analysis.trend_level} />
                  <span className="text-[13px] text-white/30">
                    竞争程度:{" "}
                    <span className="text-white/60">
                      {result.market_analysis.competition === "Low"
                        ? "低竞争"
                        : "高竞争"}
                    </span>
                  </span>
                </div>
                <LaunchBadge should={result.market_analysis.should_launch} />
              </div>
            </div>
          </div>

          {/* Card 2: User Profile */}
          <div className="glass-card p-6 transition-card animate-fade-in-delay-1">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">👤</span>
              <h2 className="text-[15px] font-semibold text-white/80">
                用户画像
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-2">
                  目标受众
                </h3>
                <p className="text-[14px] text-white/70 leading-relaxed">
                  {result.user_profile.target_audience}
                </p>
              </div>

              <div>
                <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-2">
                  核心痛点
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.user_profile.pain_points.map((p, i) => (
                    <span
                      key={i}
                      className="text-[13px] px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/60"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-2">
                  购买动机
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.user_profile.purchase_motivation.map((m, i) => (
                    <span
                      key={i}
                      className="text-[13px] px-3 py-1.5 rounded-lg bg-ios-blue/5 border border-ios-blue/10 text-ios-blue/70"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Content */}
          <div className="glass-card p-6 transition-card animate-fade-in-delay-2">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">🔥</span>
              <h2 className="text-[15px] font-semibold text-white/80">
                内容生成
              </h2>
            </div>

            <div className="space-y-5">
              {/* TikTok */}
              <div>
                <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-3">
                  TikTok 爆款标题
                </h3>
                <ul className="space-y-2">
                  {result.content.tiktok.map((title, i) => (
                    <li
                      key={i}
                      className="text-[14px] text-white/70 leading-relaxed pl-3 border-l border-white/[0.08]"
                    >
                      {title}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Xiaohongshu */}
              <div>
                <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-3">
                  小红书种草文案
                </h3>
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
                  {result.content.xiaohongshu.map((text, i) => (
                    <p
                      key={i}
                      className="text-[14px] text-white/70 leading-relaxed"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Amazon */}
              <div>
                <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-3">
                  Amazon SEO 标题
                </h3>
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
                  {result.content.amazon.map((title, i) => (
                    <p
                      key={i}
                      className="text-[14px] text-white/70 font-medium leading-relaxed"
                    >
                      {title}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Insights */}
          <div className="glass-card p-6 transition-card animate-fade-in-delay-3">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">💡</span>
              <h2 className="text-[15px] font-semibold text-white/80">
                深度洞察
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-2">
                  商业逻辑
                </h3>
                <p className="text-[14px] text-white/70 leading-relaxed">
                  {result.insights.why_it_works}
                </p>
              </div>
              <div>
                <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-2">
                  增长逻辑
                </h3>
                <p className="text-[14px] text-white/70 leading-relaxed">
                  {result.insights.growth_logic}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state hint */}
      {status === "idle" && (
        <p className="text-center text-[13px] text-white/15 mt-8">
          输入产品信息，AI 将为你分析商业价值与营销策略
        </p>
      )}
    </div>
  );
}
