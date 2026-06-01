import type { ViralPotential } from "@/lib/types";

const GRADE_COLORS: Record<string, { ring: string; text: string; bg: string }> = {
  A: { ring: "#34C759", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  B: { ring: "#FF9500", text: "text-amber-400", bg: "bg-amber-500/10" },
  C: { ring: "#FF3B30", text: "text-red-400", bg: "bg-red-500/10" },
};

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

      <div className="flex items-center gap-5">
        {/* Ring */}
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
              stroke={colors.ring}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${(angle / 360) * 207.3} 207.3`}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold tabular-nums text-white">
              {data.score}
            </span>
          </div>
        </div>

        {/* Grade + Reasons */}
        <div className="flex-1 space-y-3">
          <span
            className={`inline-flex text-xs font-bold px-3 py-1 rounded-full border ${colors.text} ${colors.bg} border-current/20`}
          >
            {data.grade}级潜力
          </span>
          <ul className="space-y-1.5">
            {data.reasons.map((r, i) => (
              <li
                key={i}
                className="text-[13px] text-white/55 leading-relaxed flex items-start gap-2"
              >
                <span className="text-white/20 mt-0.5 shrink-0">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
