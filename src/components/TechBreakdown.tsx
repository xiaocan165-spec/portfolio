import React from "react";
import ArchitectureDiagram from "./ArchitectureDiagram";

export default function TechBreakdown() {
  return (
    <section id="tech" className="py-20 px-5 scroll-mt-[48px]">
      <div className="max-w-2xl mx-auto">
        <p className="section-label mb-8">Tech Breakdown</p>

        {/* 1. Architecture */}
        <div className="mb-16">
          <h3 className="text-[18px] font-semibold text-white/80 mb-6">系统架构</h3>
          <ArchitectureDiagram />
          <p className="text-[14px] text-white/40 leading-relaxed mt-6">
            用户在前端输入产品信息，Next.js API Route 接收请求后调用 OpenAI / DeepSeek 进行推理，返回结构化 JSON 数据，前端通过 React 状态管理渲染分析结果。如果 AI 服务不可用，系统自动降级到 Demo 模式，由关键词检测引擎生成 8 品类的模拟分析数据。
          </p>
        </div>

        {/* 2. Tech Implementation */}
        <div className="mb-16">
          <h3 className="text-[18px] font-semibold text-white/80 mb-6">技术实现概述</h3>
          <div className="space-y-4 text-[15px] text-white/60 leading-relaxed">
            <p>
              项目基于 Next.js 14 App Router 构建，利用 Server Component 渲染静态内容，Client Component 驱动交互式 AI 分析工具。TypeScript 实现端到端类型安全，从 API 请求到前端渲染共享类型定义。
            </p>
            <p>
              AI 层通过 OpenAI SDK v4 统一接口封装，支持 OpenAI 和 DeepSeek 双 Provider 切换。Prompt 由 buildPrompt() 动态构建，注入产品名称、市场、平台和用户痛点，输出严格 JSON Schema 的结构化分析结果。
            </p>
            <p>
              UI 层使用 Tailwind CSS 构建完整暗色主题，包含系统级 opacity 分层（背景 0% / 卡片 4% / 边框 6% / 辅助文本 40-60% / 主要文本 85%）、玻璃拟态卡片、SVG 环形评分图和顺序淡入动画。
            </p>
          </div>
        </div>

        {/* 3. Problems & Solutions */}
        <div className="mb-16">
          <h3 className="text-[18px] font-semibold text-white/80 mb-6">踩坑记录</h3>

          <div className="space-y-4">
            {/* Problem 1 */}
            <div className="card-subtle">
              <h4 className="text-[14px] font-semibold text-white/70 mb-2">
                1. AI 输出内容不稳定
              </h4>
              <p className="text-[13px] text-white/45 leading-relaxed mb-2">
                最初 AI 生成的内容经常出现风格不统一、输出长度波动、内容重复、偶尔偏题等问题，直接影响了工具的可用性。
              </p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                <span className="text-ios-blue/80">解决方案：</span>
                引入结构化 Prompt（角色设定 + 任务分解）、分角色 Prompt（分析师 / 用户研究员 / 内容创作者）、Few-shot 示例和严格的 JSON Schema 输出格式约束，逐步将生成的稳定性和可预测性提高到可用水平。
              </p>
            </div>

            {/* Problem 2 */}
            <div className="card-subtle">
              <h4 className="text-[14px] font-semibold text-white/70 mb-2">
                2. Prompt 调优成本很高
              </h4>
              <p className="text-[13px] text-white/45 leading-relaxed mb-2">
                Prompt 不是写一次就完事的。不同 temperature 对内容质量影响显著、Prompt 内指令的顺序会影响模型理解优先级、中文与英文 Prompt 的输出差异巨大——每个变量都需要反复测试。
              </p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                <span className="text-ios-blue/80">解决方案：</span>
                建立了 Prompt 版本管理习惯，将每次改动和对应的输出效果记录下来，方便回滚和对比迭代方向。
              </p>
            </div>

            {/* Problem 3 */}
            <div className="card-subtle">
              <h4 className="text-[14px] font-semibold text-white/70 mb-2">
                3. 前端动效与性能平衡
              </h4>
              <p className="text-[13px] text-white/45 leading-relaxed mb-2">
                在页面中加入了较多 Blur 模糊、Gradient 渐变、动态动画和大背景图后，移动端出现首屏加载变慢、动画掉帧的问题。
              </p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                <span className="text-ios-blue/80">解决方案：</span>
                图片压缩 + 懒加载，减少实时动画数量，利用 Tailwind 的原子化样式减少 CSS 体积，用 GPU 友好的 transform 和 opacity 动画替代 layout-triggering 的属性。
              </p>
            </div>

            {/* Problem 4 */}
            <div className="card-subtle">
              <h4 className="text-[14px] font-semibold text-white/70 mb-2">
                4. AI 接口响应速度问题
              </h4>
              <p className="text-[13px] text-white/45 leading-relaxed mb-2">
                调用大模型 API 时偶尔会遇到响应超时、返回速度慢、输出中断等异常情况，影响用户体验。
              </p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                <span className="text-ios-blue/80">解决方案：</span>
                增加了 Loading 状态动画可视化等待过程、错误处理机制捕获异常、Retry 逻辑自动重试，以及 Demo 模式作为降级方案确保工具始终可用。
              </p>
            </div>

            {/* Problem 5 */}
            <div className="card-subtle">
              <h4 className="text-[14px] font-semibold text-white/70 mb-2">
                5. 页面设计容易像模板
              </h4>
              <p className="text-[13px] text-white/45 leading-relaxed mb-2">
                初期的页面视觉停留在普通 SaaS 模板的感觉，缺乏辨识度和品质感。
              </p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                <span className="text-ios-blue/80">解决方案：</span>
                深入研究 Apple、Linear、Vercel、Stripe 等产品的设计语言，重点学习留白节奏、光影层次、字体排版和信息层级。在这个作品中实践了系统级 opacity 层级、磨砂玻璃材质和微交互细节。
              </p>
            </div>
          </div>
        </div>

        {/* 4. Takeaways */}
        <div>
          <h3 className="text-[18px] font-semibold text-white/80 mb-6">项目收获</h3>
          <div className="space-y-3">
            {[
              "对 AI 内容工作流有了更深入理解——从 Prompt 设计到输出质量控制的完整链路",
              "提升了 Prompt Engineering 能力，掌握了结构化 Prompt、Few-shot、角色设定等技巧",
              "熟悉了现代 Web 产品从设计到部署的完整开发流程",
              "学会从产品思维而不是单纯写代码去构建项目——思考用户真正需要什么",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-ios-blue/60 text-[13px] font-mono mt-0.5">
                  0{i + 1}
                </span>
                <p className="text-[15px] text-white/60 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
