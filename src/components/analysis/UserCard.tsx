import type { UserProfile } from "@/lib/types";

export default function UserCard({ profile }: { profile: UserProfile }) {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">👤</span>
        <h2 className="text-[15px] font-semibold text-white/80">用户画像</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-2">
            目标受众
          </h3>
          <p className="text-[14px] text-white/70 leading-relaxed">
            {profile.target_audience}
          </p>
        </div>

        <div>
          <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-2">
            核心痛点
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.pain_points.map((p, i) => (
              <span
                key={i}
                className="text-[13px] px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/60"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-2">
            购买动机
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.purchase_motivation.map((m, i) => (
              <span
                key={i}
                className="text-[13px] px-3 py-1.5 rounded-lg bg-ios-blue/5 border border-ios-blue/10 text-ios-blue/70"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
