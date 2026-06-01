import type { PlatformMatch } from "@/lib/types";

export default function PlatformMatchCard({
  matches,
}: {
  matches: PlatformMatch[];
}) {
  // Sort by score descending
  const sorted = [...matches].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🎯</span>
        <h2 className="text-[15px] font-semibold text-white/80">平台匹配度</h2>
      </div>

      {/* Top 3 recommended */}
      <div className="space-y-2 mb-4">
        {top3.map((m, i) => {
          const medals = ["🥇", "🥈", "🥉"];
          const bgStyles = [
            "bg-amber-500/5 border-amber-500/10",
            "bg-white/[0.02] border-white/[0.05]",
            "bg-white/[0.02] border-white/[0.05]",
          ];
          return (
            <div
              key={m.platform}
              className={`flex items-center gap-3 p-3 rounded-xl border ${bgStyles[i]}`}
            >
              <span className="text-sm shrink-0">{medals[i]}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[14px] font-medium text-white/75">
                    {m.platform}
                  </span>
                  <span className="text-[13px] font-semibold text-ios-blue tabular-nums">
                    {m.score}
                  </span>
                </div>
                <p className="text-[12px] text-white/35 leading-relaxed">
                  {m.reason}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rest platforms as bars */}
      {rest.length > 0 && (
        <div className="space-y-2 pt-3 border-t border-white/[0.05]">
          {rest.map((m) => (
            <div key={m.platform} className="flex items-center gap-3">
              <span className="text-[12px] text-white/35 w-16 shrink-0 text-right">
                {m.platform}
              </span>
              <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className="h-full rounded-full bg-white/[0.15] transition-all duration-500"
                  style={{ width: `${m.score * 10}%` }}
                />
              </div>
              <span className="text-[12px] text-white/25 tabular-nums w-6">
                {m.score}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
