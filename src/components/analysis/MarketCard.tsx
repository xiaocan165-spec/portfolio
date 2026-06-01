import type { CrossBorderMetrics } from "@/lib/types";

const METRICS: { key: keyof CrossBorderMetrics; label: string }[] = [
  { key: "market_maturity", label: "市场成熟度" },
  { key: "price_range", label: "预计售价区间" },
  { key: "profitability", label: "利润率判断" },
  { key: "supply_chain_difficulty", label: "供应链难度" },
  { key: "shipping_risk", label: "运输风险" },
  { key: "ad_competition", label: "广告竞争压力" },
];

const LEVEL_COLORS: Record<string, string> = {
  低: "text-emerald-400",
  中: "text-amber-400",
  高: "text-red-400",
};

export default function MarketCard({ metrics }: { metrics: CrossBorderMetrics }) {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🌍</span>
        <h2 className="text-[15px] font-semibold text-white/80">市场分析</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {METRICS.map(({ key, label }) => {
          const val = metrics[key];
          const isPrice = key === "price_range";
          return (
            <div key={key} className="space-y-1">
              <span className="text-[12px] text-white/30">{label}</span>
              <p
                className={`text-[14px] font-medium ${
                  isPrice ? "text-white/70" : LEVEL_COLORS[val] || "text-white/60"
                }`}
              >
                {val}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
