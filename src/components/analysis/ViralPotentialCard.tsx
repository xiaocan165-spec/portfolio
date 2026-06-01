import type { ViralPotential } from "@/lib/types";

const GRADE_COLORS: Record<string, { ring: string; text: string; bg: string }> = {
  A: { ring: "#34C759", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  B: { ring: "#FF9500", text: "text-amber-400", bg: "bg-amber-500/10" },
  C: { ring: "#FF3B30", text: "text-red-400", bg: "bg-red-500/10" },
};

const DIM_LABELS: { key: keyof ViralPotential["dimensions"]; label: string }[] = [
  { key: "market_demand", label: "市场需求" },
  { key: "competition", label: "竞争压力" },
  { key: "profit_margin", label: "利润空间" },
  { key: "content_spread", label: "内容传播" },
];

function MiniBar({ value }: { value: number }) {
  const color = value >= 8 ? "#34C759" : value >= 5 ? "#FF9500" : "#FF3B30";
  return (
    <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden flex-1">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${value * 10}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function ViralPotentialCard({
  data,
}: {
  data: ViralPotential;
}) {
  const colors = GRADE_COLORS[data.grade] || GRADE_COLORS.B;
  const angle = (data.score / 100) * 360;

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">⚡</span>
        <h2 className="text-[15px] font-semibold text-white/80">爆款潜力</h2>
      </div>

      {/* Score + Grade */}
      <div className="flex items-center gap-5 mb-5">
        <div className="relative w-[72px] h-[72px] flex-shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="33" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="40" cy="40" r="33" fill="none" stroke={colors.ring} strokeWidth="5" strokeLinecap="round"
              strokeDasharray={`${(angle / 360) * 207.3} 207.3`}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold tabular-nums text-white">{data.score}</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className={`inline-flex text-xs font-bold px-3 py-1 rounded-full border ${colors.text} ${colors.bg} border-current/20`}>
            {data.grade}级潜力
          </span>
          <ul className="space-y-1">
            {data.reasons.map((r, i) => (
              <li key={i} className="text-[12px] text-white/45 leading-relaxed flex items-start gap-1.5">
                <span className="text-white/15 mt-0.5 shrink-0">•</span>{r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dimension breakdown */}
      <div className="pt-4 border-t border-white/[0.05]">
        <h3 className="text-[11px] font-medium text-white/25 uppercase tracking-wider mb-3">
          评分依据
        </h3>
        <div className="space-y-2.5">
          {DIM_LABELS.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-[12px] text-white/40 w-16 shrink-0">{label}</span>
              <MiniBar value={data.dimensions[key]} />
              <span className="text-[12px] text-white/30 tabular-nums w-4 text-right">
                {data.dimensions[key]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
