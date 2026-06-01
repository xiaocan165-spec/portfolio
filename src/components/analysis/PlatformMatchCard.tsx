import type { PlatformMatch } from "@/lib/types";

function StarRating({ score }: { score: number }) {
  const stars = Math.round(score / 2);
  return (
    <span className="text-[11px] text-amber-400/80 tracking-wider">
      {"★".repeat(stars)}{"☆".repeat(5 - stars)}
    </span>
  );
}

export default function PlatformMatchCard({
  matches,
}: {
  matches: PlatformMatch[];
}) {
  const sorted = [...matches].sort((a, b) => b.score - a.score);

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🎯</span>
        <h2 className="text-[15px] font-semibold text-white/80">平台匹配度</h2>
      </div>

      <div className="space-y-4">
        {sorted.map((m, i) => {
          const isFirst = i === 0;
          const medals = ["🥇", "🥈", "🥉", "4", "5"];
          return (
            <div
              key={m.platform}
              className={`p-4 rounded-xl border transition-all ${
                isFirst
                  ? "bg-amber-500/[0.04] border-amber-500/[0.12]"
                  : "bg-white/[0.015] border-white/[0.04]"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm shrink-0">
                    {medals[i] || i + 1}
                  </span>
                  <span className="text-[14px] font-medium text-white/80">
                    {m.platform}
                  </span>
                  <StarRating score={m.score} />
                </div>
                <span className="text-[15px] font-bold text-ios-blue tabular-nums">
                  {m.score}
                </span>
              </div>

              {/* Reason */}
              <p className="text-[12px] text-white/40 mb-3">{m.reason}</p>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-emerald-400/70 font-medium uppercase tracking-wider">
                    优势
                  </span>
                  <ul className="mt-1.5 space-y-1">
                    {m.strengths.map((s, j) => (
                      <li
                        key={j}
                        className="text-[12px] text-white/50 flex items-start gap-1.5"
                      >
                        <span className="text-emerald-400/50 mt-0.5 shrink-0 text-[10px]">
                          +
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[11px] text-red-400/70 font-medium uppercase tracking-wider">
                    劣势
                  </span>
                  <ul className="mt-1.5 space-y-1">
                    {m.weaknesses.map((w, j) => (
                      <li
                        key={j}
                        className="text-[12px] text-white/40 flex items-start gap-1.5"
                      >
                        <span className="text-red-400/40 mt-0.5 shrink-0 text-[10px]">
                          −
                        </span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
