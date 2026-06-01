"use client";

import { useState } from "react";
import type { AnalyzeRequest, AnalyzeResponse, AnalysisStatus } from "@/lib/types";
import { buildPrompt, parseAIResponse } from "@/lib/ai";
import { generateDemoAnalysis } from "@/lib/demo";
import { computeDecision } from "@/lib/decision";
import ScoreCard from "./analysis/ScoreCard";
import MarketCard from "./analysis/MarketCard";
import UserCard from "./analysis/UserCard";
import CompetitorCard from "./analysis/CompetitorCard";
import RiskCard from "./analysis/RiskCard";
import OpportunityCard from "./analysis/OpportunityCard";
import ContentCard from "./analysis/ContentCard";

const MARKETS = ["欧美", "东南亚", "全球"] as const;
const PLATFORMS = ["TikTok", "Amazon", "Xiaohongshu"] as const;

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

    // NOTE: These are hardcoded for GitHub Pages static export.
    // Will be moved to server-side env vars after migrating to Vercel + custom domain.
    const aiApiKey = "sk-172a16523d0d414b8eb15454acee4dba";
    const aiBaseUrl = "https://api.deepseek.com";
    const aiModel = "deepseek-chat";

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
            temperature: 0.3,
            max_tokens: 3000,
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
            aiParsed.scoring &&
            aiParsed.cross_border_metrics &&
            aiParsed.user_profile &&
            aiParsed.competitor_analysis &&
            aiParsed.risks &&
            aiParsed.opportunities &&
            aiParsed.content &&
            aiParsed.why_it_works &&
            aiParsed.confidence
          ) {
            setResult(aiParsed);
            setStatus("success");
            return;
          }
        }
        throw new Error("AI returned invalid data structure");
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
      {/* ── Input Card ─────────────────────────────────── */}
      <div className="glass-card p-6 mb-6 transition-card">
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-white/50 mb-2">
                目标市场
              </label>
              <select
                value={form.market}
                onChange={(e) =>
                  updateField("market", e.target.value as AnalyzeRequest["market"])
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
                  updateField("platform", e.target.value as AnalyzeRequest["platform"])
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

          <div>
            <label className="block text-[13px] font-medium text-white/50 mb-2">
              用户痛点 <span className="text-white/20 font-normal">(选填)</span>
            </label>
            <textarea
              value={form.userPainPoints}
              onChange={(e) => updateField("userPainPoints", e.target.value)}
              placeholder="描述你知道的用户痛点，帮助 AI 更精准分析..."
              rows={3}
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-white/15 resize-none transition-all focus:border-ios-blue/40"
            />
          </div>

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

      {/* ── Error State ────────────────────────────────── */}
      {status === "error" && (
        <div className="glass-card p-5 mb-6 animate-fade-in border-red-500/20">
          <p className="text-[14px] text-red-400/80 text-center">{error}</p>
        </div>
      )}

      {/* ── Loading Skeleton ───────────────────────────── */}
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

      {/* ── Results ────────────────────────────────────── */}
      {status === "success" && result && (
        <div className="space-y-4">
          <ScoreCard
            scoring={result.scoring}
            decision={computeDecision(result.scoring)}
            confidence={result.confidence}
          />
          <MarketCard metrics={result.cross_border_metrics} />
          <UserCard profile={result.user_profile} />
          <CompetitorCard data={result.competitor_analysis} />
          <RiskCard risks={result.risks} />
          <OpportunityCard items={result.opportunities} />
          <ContentCard data={result.content} />
        </div>
      )}

      {/* ── Empty state ────────────────────────────────── */}
      {status === "idle" && (
        <p className="text-center text-[13px] text-white/15 mt-8">
          输入产品信息，AI 将为你分析商业价值与营销策略
        </p>
      )}
    </div>
  );
}
