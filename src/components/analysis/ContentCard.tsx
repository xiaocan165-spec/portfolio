import type { Content } from "@/lib/types";

function Section({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-3">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((text, i) => (
          <li
            key={i}
            className="text-[13px] text-white/65 leading-relaxed pl-3 border-l border-white/[0.08]"
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ContentCard({ data }: { data: Content }) {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🔥</span>
        <h2 className="text-[15px] font-semibold text-white/80">内容生成</h2>
      </div>

      <div className="space-y-6">
        {/* TikTok by type */}
        <div>
          <h3 className="text-[13px] font-medium text-white/40 mb-4">
            TikTok 标题
          </h3>
          <div className="space-y-4">
            <Section title="痛点型" items={data.tiktok_pain} />
            <Section title="场景型" items={data.tiktok_scene} />
            <Section title="好奇心型" items={data.tiktok_curiosity} />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

        {/* Xiaohongshu */}
        <div>
          <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-3">
            小红书种草文案
          </h3>
          <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
            {data.xiaohongshu.map((text, i) => (
              <p
                key={i}
                className="text-[14px] text-white/70 leading-relaxed whitespace-pre-line"
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Amazon SEO */}
        <div>
          <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-3">
            Amazon SEO 标题
          </h3>
          <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
            {data.amazon_seo.map((text, i) => (
              <p
                key={i}
                className="text-[14px] text-white/70 font-medium leading-relaxed"
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Ad Copy */}
        <div>
          <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-3">
            广告卖点
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.ad_copy.map((copy, i) => (
              <span
                key={i}
                className="text-[13px] px-3 py-1.5 rounded-lg bg-ios-blue/5 border border-ios-blue/10 text-ios-blue/70"
              >
                {copy}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
