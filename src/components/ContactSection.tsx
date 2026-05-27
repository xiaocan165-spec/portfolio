export default function ContactSection() {
  return (
    <section id="contact" className="pt-20 pb-32 px-5 scroll-mt-[48px]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="section-label mb-8">Contact</p>

        <p className="text-[15px] text-white/50 leading-relaxed mb-8">
          如果你对我的项目感兴趣，欢迎通过以下方式联系我
        </p>

        {/* Email link card */}
        <a
          href="mailto:17701948541@163.com"
          className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[15px] text-white/70 hover:text-white hover:border-white/[0.12] transition-all"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.667 3.333h10.666c.734 0 1.334.6 1.334 1.334v6.666c0 .734-.6 1.334-1.334 1.334H2.667c-.734 0-1.334-.6-1.334-1.334V4.667c0-.734.6-1.334 1.334-1.334z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.667 4.667L8 9.333 1.333 4.667"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          17701948541@163.com
        </a>

        <p className="mt-16 text-[12px] text-white/20">
          &copy; 2025 刘灿
        </p>
      </div>
    </section>
  );
}
