import type { OpportunityItem } from "@/lib/types";

export default function OpportunityCard({
  items,
}: {
  items: OpportunityItem[];
}) {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🚀</span>
        <h2 className="text-[15px] font-semibold text-white/80">增长机会</h2>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/[0.06]"
          >
            <h3 className="text-[14px] font-medium text-emerald-300/80 mb-1.5">
              {item.opportunity}
            </h3>
            <p className="text-[13px] text-white/50 leading-relaxed">
              {item.action}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
