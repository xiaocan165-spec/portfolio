"use client";

import ProductAnalyzer from "./ProductAnalyzer";

export default function DemoSection() {
  return (
    <section id="demo" className="py-20 px-5 scroll-mt-[48px]">
      <div className="max-w-content mx-auto mb-10">
        <p className="section-label mb-4">Live Demo</p>
        <h2 className="text-[24px] font-semibold tracking-tight text-white mb-2">
          AI 跨境产品决策系统
        </h2>
        <p className="text-[15px] text-white/40 leading-relaxed">
          基于大语言模型的跨境电商产品分析工具。输入产品名称，AI 将从市场趋势、用户画像、内容策略三个维度给出结构化建议。支持 OpenAI 与 DeepSeek 双 Provider 切换，含 Demo 模式可在无 API Key 时自动降级运行。
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-10" />
      </div>

      <ProductAnalyzer />
    </section>
  );
}
