import type { RiskItem } from "@/lib/types";

const SEVERITY_COLORS: Record<string, { dot: string; text: string }> = {
  低: { dot: "bg-amber-400", text: "text-amber-400" },
  中: { dot: "bg-orange-400", text: "text-orange-400" },
  高: { dot: "bg-red-400", text: "text-red-400" },
};

export default function RiskCard({ risks }: { risks: RiskItem[] }) {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">⚠️</span>
        <h2 className="text-[15px] font-semibold text-white/80">风险分析</h2>
      </div>

      <div className="space-y-3">
        {risks.map((item, i) => {
          const c = SEVERITY_COLORS[item.severity] || SEVERITY_COLORS.中;
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
            >
              <span
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${c.dot}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-white/70">{item.risk}</p>
                <span className={`text-[11px] font-medium ${c.text}`}>
                  严重程度: {item.severity}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
