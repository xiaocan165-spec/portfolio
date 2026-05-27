const FOCUS_AREAS = [
  "AI Product",
  "AIGC 内容系统",
  "Prompt Engineering",
  "AI + Web 应用",
  "数字产品设计",
  "内容增长与用户体验",
];

const TECH_STACK = [
  {
    category: "Frontend",
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "Backend / Runtime",
    skills: ["Node.js", "REST API"],
  },
  {
    category: "AI / Workflow",
    skills: ["OpenAI API", "Prompt Engineering", "AI Content Workflow", "Claude Code", "Cursor"],
  },
  {
    category: "Design",
    skills: ["Figma", "Framer", "UI/UX Design"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Vercel", "Notion"],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-5 scroll-mt-[48px]">
      <div className="max-w-2xl mx-auto">
        <p className="section-label mb-8">About</p>

        {/* Bio */}
        <div className="space-y-4 text-[15px] text-white/60 leading-relaxed border-l border-white/[0.08] pl-4 mb-12">
          <p>
            我是一名专注于 AI 产品与内容方向的创作者，主要关注 AI 驱动的内容生产、自动化工作流与现代 Web 产品体验。
          </p>
          <p>
            目前正在持续构建 AI 相关项目，包括 AI 内容生成、产品 Landing Page、数字化品牌表达以及基于大模型的应用实践。熟悉从产品视觉设计、前端开发到 AI 工作流搭建的完整流程。
          </p>
          <p>
            希望通过技术、设计与 AI 的结合，构建真正具有表达力与效率的数字产品。
          </p>
        </div>

        {/* Focus Areas */}
        <div className="mb-12">
          <h3 className="text-[12px] font-medium tracking-widest uppercase text-white/30 mb-4">
            关注方向
          </h3>
          <div className="flex flex-wrap gap-2">
            {FOCUS_AREAS.map((area) => (
              <span
                key={area}
                className="skill-tag"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-[12px] font-medium tracking-widest uppercase text-white/30 mb-6">
            Tech Stack
          </h3>
          <div className="space-y-5">
            {TECH_STACK.map((group) => (
              <div key={group.category}>
                <h4 className="text-[13px] font-medium text-white/40 mb-2.5">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
