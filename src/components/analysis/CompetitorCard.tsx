import type { CompetitorAnalysis } from "@/lib/types";

export default function CompetitorCard({
  data,
}: {
  data: CompetitorAnalysis;
}) {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🏢</span>
        <h2 className="text-[15px] font-semibold text-white/80">竞品分析</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-3">
            主要竞争品牌
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.brands.map((b, i) => (
              <span
                key={i}
                className="text-[13px] px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/70 font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-3">
            竞争特点
          </h3>
          <ul className="space-y-2">
            {data.characteristics.map((c, i) => (
              <li
                key={i}
                className="text-[13px] text-white/55 leading-relaxed flex items-start gap-2"
              >
                <span className="text-white/15 mt-0.5 shrink-0">•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
