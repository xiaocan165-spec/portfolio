export default function ArchitectureDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      {/* Desktop: horizontal flow */}
      <svg
        viewBox="0 0 900 340"
        className="hidden sm:block w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id="arrowBlue"
            viewBox="0 0 10 7"
            refX="9"
            refY="3.5"
            markerWidth="6"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0 0L10 3.5L0 7" fill="#007AFF" />
          </marker>
          <marker
            id="arrowGray"
            viewBox="0 0 10 7"
            refX="9"
            refY="3.5"
            markerWidth="6"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0 0L10 3.5L0 7" fill="rgba(255,255,255,0.3)" />
          </marker>
        </defs>

        {/* Background dots */}
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.04)" />
        </pattern>
        <rect width="900" height="340" fill="url(#dots)" />

        {/* Row 1: Main flow */}
        {/* Browser */}
        <rect x="10" y="40" width="110" height="44" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="65" y="67" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="system-ui">Browser</text>

        <path d="M120 62L155 62" stroke="#007AFF" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />

        {/* Next.js App Router */}
        <rect x="160" y="40" width="140" height="44" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="230" y="67" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="system-ui">Next.js App Router</text>

        <path d="M300 62L335 62" stroke="#007AFF" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />

        {/* API Route */}
        <rect x="340" y="40" width="160" height="44" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="420" y="60" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="system-ui">/api/analyze-product</text>
        <text x="420" y="74" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="system-ui">POST handler</text>

        <path d="M500 62L535 62" stroke="#007AFF" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />

        {/* AI API Group */}
        <rect x="540" y="24" width="170" height="76" rx="8" fill="rgba(0,122,255,0.04)" stroke="rgba(0,122,255,0.12)" />
        <text x="625" y="44" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="system-ui">AI Providers</text>
        <rect x="552" y="52" width="68" height="36" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
        <text x="586" y="75" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="system-ui">OpenAI</text>
        <rect x="630" y="52" width="68" height="36" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
        <text x="664" y="75" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="system-ui">DeepSeek</text>

        <path d="M710 62L745 62" stroke="#007AFF" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />

        {/* JSON Parser */}
        <rect x="750" y="40" width="110" height="44" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="805" y="67" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="system-ui">JSON Parser</text>

        <path d="M860 62L888 62" stroke="#007AFF" strokeWidth="1.5" />

        {/* Arrow from AI to React state (vertical) */}
        <path d="M625 100L625 130" stroke="#007AFF" strokeWidth="1.5" />

        {/* React State */}
        <rect x="510" y="130" width="230" height="44" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="625" y="152" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="system-ui">React useState</text>
        <text x="625" y="166" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="system-ui">form / status / result state</text>

        <path d="M625 174L625 204" stroke="#007AFF" strokeWidth="1.5" />

        {/* Result Cards */}
        <rect x="460" y="204" width="330" height="44" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="625" y="226" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="system-ui">4 组分析结果卡片</text>
        <text x="625" y="240" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="system-ui">市场分析 · 用户画像 · 内容生成 · 深度洞察</text>

        {/* Row 2: Fallback path (dashed) */}
        <path d="M420 62L420 264L480 264" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeDasharray="5 3" />

        {/* Fallback label */}
        <text x="430" y="130" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="system-ui">on error</text>

        {/* Demo Data Generator */}
        <rect x="460" y="272" width="330" height="36" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 2" />
        <text x="625" y="294" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="11" fontFamily="system-ui">Demo Data Generator (8 品类 Fallback)</text>

        {/* Label */}
        <text x="450" y="16" fill="rgba(255,255,255,0.15)" fontSize="11" fontFamily="system-ui">系统架构</text>
      </svg>

      {/* Mobile: vertical flow */}
      <svg
        viewBox="0 0 280 580"
        className="block sm:hidden w-full max-w-[280px] mx-auto h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="arrowDown" viewBox="0 0 7 10" refX="3.5" refY="9" markerWidth="5" markerHeight="6" orient="auto">
            <path d="M0 0L3.5 10L7 0" fill="#007AFF" />
          </marker>
        </defs>

        <pattern id="dotsM" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.04)" />
        </pattern>
        <rect width="280" height="580" fill="url(#dotsM)" />

        {/* Browser */}
        <rect x="55" y="10" width="170" height="36" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="140" y="33" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="system-ui">Browser</text>

        <path d="M140 46L140 76" stroke="#007AFF" strokeWidth="1.5" markerEnd="url(#arrowDown)" />

        {/* Next.js */}
        <rect x="40" y="80" width="200" height="36" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="140" y="103" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="system-ui">Next.js App Router</text>

        <path d="M140 116L140 146" stroke="#007AFF" strokeWidth="1.5" markerEnd="url(#arrowDown)" />

        {/* API Route */}
        <rect x="30" y="150" width="220" height="40" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="140" y="168" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="system-ui">/api/analyze-product</text>
        <text x="140" y="182" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="system-ui">POST handler</text>

        <path d="M140 190L140 220" stroke="#007AFF" strokeWidth="1.5" markerEnd="url(#arrowDown)" />

        {/* AI Providers */}
        <rect x="30" y="224" width="96" height="40" rx="7" fill="rgba(0,122,255,0.04)" stroke="rgba(0,122,255,0.12)" />
        <text x="78" y="242" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="system-ui">AI Providers</text>
        <text x="78" y="256" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="system-ui">OpenAI / DeepSeek</text>

        {/* on error path */}
        <text x="124" y="230" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="system-ui">on error →</text>

        {/* Demo Generator (side) */}
        <rect x="154" y="224" width="96" height="40" rx="7" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 2" />
        <text x="202" y="242" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui">Demo Generator</text>
        <text x="202" y="256" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui">8 品类 Fallback</text>

        <path d="M78 264L78 284L140 284" stroke="#007AFF" strokeWidth="1.5" />
        <path d="M202 264L202 278L140 278L140 284" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeDasharray="4 3" />

        <path d="M140 284L140 308" stroke="#007AFF" strokeWidth="1.5" markerEnd="url(#arrowDown)" />

        {/* JSON Parser */}
        <rect x="55" y="312" width="170" height="36" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="140" y="335" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="system-ui">JSON Parser</text>

        <path d="M140 348L140 378" stroke="#007AFF" strokeWidth="1.5" markerEnd="url(#arrowDown)" />

        {/* React State */}
        <rect x="40" y="382" width="200" height="40" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="140" y="400" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="system-ui">React useState</text>
        <text x="140" y="414" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="system-ui">form / status / result</text>

        <path d="M140 422L140 452" stroke="#007AFF" strokeWidth="1.5" markerEnd="url(#arrowDown)" />

        {/* Result Cards */}
        <rect x="20" y="456" width="240" height="48" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="140" y="478" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="system-ui">4 组分析结果卡片</text>
        <text x="140" y="494" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="system-ui">市场分析 · 用户画像 · 内容生成 · 深度洞察</text>

        <text x="140" y="540" fill="rgba(255,255,255,0.12)" fontSize="10" fontFamily="system-ui" textAnchor="middle">系统架构图</text>
      </svg>
    </div>
  );
}
