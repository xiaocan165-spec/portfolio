import type { Content } from "@/lib/types";

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-wider mb-3">{label}</h3>
      {children}
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t, i) => (
        <span key={i} className="text-[13px] px-3 py-1.5 rounded-lg bg-ios-blue/5 border border-ios-blue/10 text-ios-blue/70">
          {t}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="text-[13px] text-white/65 leading-relaxed pl-3 border-l border-white/[0.08]">
          {t}
        </li>
      ))}
    </ul>
  );
}

function TextBox({ text }: { text: string }) {
  return (
    <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
      <p className="text-[14px] text-white/70 leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}

export default function ContentCard({ data }: { data: Content }) {
  // Determine which platform content is present
  const hasDouyin = data.douyin;
  const hasTaobao = data.taobao;
  const hasJD = data.jd;
  const hasPDD = data.pinduoduo;
  const hasXHS = data.xiaohongshu;
  const hasAmazon = data.amazon;
  const hasTikTokShop = data.tiktok_shop;
  const hasShopify = data.shopify;
  const hasShopee = data.shopee;
  const hasLazada = data.lazada;

  // Legacy compat
  const hasLegacyTikTok = data.tiktok_pain || data.tiktok_scene || data.tiktok_curiosity;
  const hasLegacyAmazon = data.amazon_seo;
  const hasLegacyAdCopy = data.ad_copy;

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🔥</span>
        <h2 className="text-[15px] font-semibold text-white/80">内容生成</h2>
      </div>

      <div className="space-y-6">
        {/* 抖音 */}
        {hasDouyin && (
          <Section label="抖音">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-white/25">爆款标题</span>
                <BulletList items={data.douyin!.titles} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">视频开场钩子</span>
                <TextBox text={data.douyin!.hook} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">评论区互动</span>
                <TextBox text={data.douyin!.comment_guide} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">核心卖点</span>
                <TagList items={data.douyin!.selling_points} />
              </div>
            </div>
          </Section>
        )}

        {/* 淘宝 */}
        {hasTaobao && (
          <Section label="淘宝">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-white/25">商品标题</span>
                <TextBox text={data.taobao!.title} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">搜索关键词</span>
                <TagList items={data.taobao!.keywords} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">详情卖点</span>
                <BulletList items={data.taobao!.selling_points} />
              </div>
            </div>
          </Section>
        )}

        {/* 京东 */}
        {hasJD && (
          <Section label="京东">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-white/25">SEO标题</span>
                <TextBox text={data.jd!.seo_title} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">商品优势</span>
                <BulletList items={data.jd!.advantages} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">购买理由</span>
                <BulletList items={data.jd!.buying_reasons} />
              </div>
            </div>
          </Section>
        )}

        {/* 拼多多 */}
        {hasPDD && (
          <Section label="拼多多">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-white/25">活动标题</span>
                <TextBox text={data.pinduoduo!.activity_title} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">引流文案</span>
                <TextBox text={data.pinduoduo!.traffic_copy} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">转化文案</span>
                <TextBox text={data.pinduoduo!.conversion_copy} />
              </div>
            </div>
          </Section>
        )}

        {/* 小红书 */}
        {hasXHS && (
          <Section label="小红书种草笔记">
            {data.xiaohongshu!.map((text, i) => (
              <TextBox key={i} text={text} />
            ))}
          </Section>
        )}

        {/* Amazon */}
        {hasAmazon && (
          <Section label="Amazon">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-white/25">SEO Title</span>
                <TextBox text={data.amazon!.seo_title} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">Bullet Points</span>
                <BulletList items={data.amazon!.bullet_points} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">Search Terms</span>
                <TagList items={data.amazon!.search_terms} />
              </div>
            </div>
          </Section>
        )}

        {/* TikTok Shop */}
        {hasTikTokShop && (
          <Section label="TikTok Shop">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-white/25">Video Title</span>
                <TextBox text={data.tiktok_shop!.video_title} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">Video Script</span>
                <TextBox text={data.tiktok_shop!.script} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">Comment Engagement</span>
                <TextBox text={data.tiktok_shop!.comment_engagement} />
              </div>
            </div>
          </Section>
        )}

        {/* Shopify */}
        {hasShopify && (
          <Section label="Shopify">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-white/25">Brand Story</span>
                <TextBox text={data.shopify!.brand_story} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">Product Description</span>
                <TextBox text={data.shopify!.product_description} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">Ad Copy</span>
                <TagList items={data.shopify!.ad_copy} />
              </div>
            </div>
          </Section>
        )}

        {/* Shopee */}
        {hasShopee && (
          <Section label="Shopee">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-white/25">商品标题</span>
                <TextBox text={data.shopee!.title} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">核心卖点</span>
                <BulletList items={data.shopee!.selling_points} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">促销文案</span>
                <TextBox text={data.shopee!.promo_copy} />
              </div>
            </div>
          </Section>
        )}

        {/* Lazada */}
        {hasLazada && (
          <Section label="Lazada">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-white/25">商品标题</span>
                <TextBox text={data.lazada!.title} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">商品优势</span>
                <BulletList items={data.lazada!.advantages} />
              </div>
              <div>
                <span className="text-[11px] text-white/25">详细描述</span>
                <TextBox text={data.lazada!.description} />
              </div>
            </div>
          </Section>
        )}

        {/* Legacy fallback: TikTok */}
        {hasLegacyTikTok && (
          <div>
            <h3 className="text-[13px] font-medium text-white/40 mb-4">TikTok 标题</h3>
            <div className="space-y-4">
              {data.tiktok_pain && data.tiktok_pain.length > 0 && (
                <div><span className="text-[11px] text-white/25">痛点型</span><BulletList items={data.tiktok_pain} /></div>
              )}
              {data.tiktok_scene && data.tiktok_scene.length > 0 && (
                <div><span className="text-[11px] text-white/25">场景型</span><BulletList items={data.tiktok_scene} /></div>
              )}
              {data.tiktok_curiosity && data.tiktok_curiosity.length > 0 && (
                <div><span className="text-[11px] text-white/25">好奇心型</span><BulletList items={data.tiktok_curiosity} /></div>
              )}
            </div>
          </div>
        )}

        {/* Legacy fallback: Amazon */}
        {hasLegacyAmazon && (
          <Section label="Amazon SEO 标题">
            <TextBox text={data.amazon_seo![0]} />
          </Section>
        )}

        {/* Legacy fallback: Ad Copy */}
        {hasLegacyAdCopy && (
          <Section label="广告卖点">
            <TagList items={data.ad_copy!} />
          </Section>
        )}
      </div>
    </div>
  );
}
