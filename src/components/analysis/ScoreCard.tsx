import type { Scoring, Decision, AnalysisConfidence } from "@/lib/types";

function DimBar({
  label,
  dim,
}: {
  label: string;
  dim: { score: number; reason: string };
}) {
  const color =
    dim.score >= 7 ? "#34C759" : dim.score >= 5 ? "#FF9500" : "#FF3B30";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-white/60">{label}</span>
        <span className="text-[13px] font-semibold tabular-nums" style={{ color }}>
          {dim.score}/10
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${dim.score * 10}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-[12px] text-white/30 leading-relaxed">{dim.reason}</p>
    </div>
  );
}

function DecisionBadge({ decision }: { decision: Decision }) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    强烈推荐: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
    },
    建议入场: {
      bg: "bg-emerald-500/8",
      text: "text-emerald-300",
      border: "border-emerald-500/15",
    },
    谨慎评估: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/20",
    },
    不建议入场: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/20",
    },
  };

  const c = colors[decision.level] || colors.谨慎评估;

  return (
    <div
      className={`inline-flex flex-col items-center gap-1 px-6 py-3 rounded-2xl ${c.bg} border ${c.border}`}
    >
      <span className={`text-2xl font-bold tabular-nums ${c.text}`}>
        {decision.average_score}
      </span>
      <span className={`text-[12px] font-medium ${c.text}`}>
        {decision.level}
      </span>
    </div>
  );
}

export default function ScoreCard({
  scoring,
  decision,
  confidence,
}: {
  scoring: Scoring;
  decision: Decision;
  confidence: AnalysisConfidence;
}) {
  const DIMS: { key: keyof Scoring; label: string }[] = [
    { key: "market_demand", label: "市场需求" },
    { key: "competition", label: "竞争友好度" },
    { key: "profit_margin", label: "利润空间" },
    { key: "logistics", label: "物流友好度" },
    { key: "repurchase", label: "复购潜力" },
    { key: "differentiation", label: "差异化空间" },
  ];

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">📊</span>
        <h2 className="text-[15px] font-semibold text-white/80">综合评分</h2>
      </div>

      {/* Decision badge */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <DecisionBadge decision={decision} />
        </div>
        <div className="text-right">
          <p className="text-[12px] text-white/30">分析可信度</p>
          <p className="text-[14px] font-semibold text-white/50 tabular-nums">
            {confidence.score}%
          </p>
        </div>
      </div>

      <p className="text-[13px] text-white/50 mb-5">{decision.label}</p>

      {/* Dimension bars */}
      <div className="space-y-4">
        {DIMS.map(({ key, label }) => (
          <DimBar key={key} label={label} dim={scoring[key]} />
        ))}
      </div>

      {/* Confidence note */}
      <div className="mt-5 pt-4 border-t border-white/[0.05]">
        <p className="text-[12px] text-white/25">{confidence.reason}</p>
      </div>
    </div>
  );
}
