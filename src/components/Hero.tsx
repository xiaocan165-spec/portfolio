export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-24 px-5 text-center overflow-hidden scroll-mt-[48px]"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,122,255,0.06),transparent_70%)]" />

      <div className="relative animate-fade-in">
        <p className="text-[14px] font-medium tracking-widest uppercase text-ios-blue mb-4">
          Portfolio
        </p>

        {/* Name with breathing glow */}
        <div className="relative inline-block">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ios-blue/10 blur-3xl animate-breathe"
            style={{ width: "320px", height: "120px" }}
          />
          <h1 className="relative text-[56px] font-bold tracking-tight text-white leading-[1.1]">
            刘灿
          </h1>
        </div>

        <p className="mt-4 text-[20px] text-white/60 font-normal">
          AI Product Builder <span className="text-white/20">|</span> AI 内容运营
        </p>
        <p className="mt-3 text-[16px] text-white/40 max-w-lg mx-auto leading-relaxed">
          专注于 AI 内容生产、用户增长与数字品牌表达
        </p>
      </div>
    </section>
  );
}
