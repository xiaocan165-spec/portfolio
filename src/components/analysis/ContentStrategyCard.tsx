import type { ContentStrategy } from "@/lib/types";

export default function ContentStrategyCard({
  data,
}: {
  data: ContentStrategy;
}) {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">📋</span>
        <h2 className="text-[15px] font-semibold text-white/80">内容策略推荐</h2>
      </div>

      {/* Strategies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.strategies.map((s, i) => (
          <span
            key={i}
            className="text-[13px] px-3 py-1.5 rounded-lg bg-ios-blue/8 border border-ios-blue/12 text-ios-blue/80 font-medium"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Why */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
        <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-2">
          推荐原因
        </h3>
        <p className="text-[13px] text-white/55 leading-relaxed">{data.why}</p>
      </div>
    </div>
  );
}
