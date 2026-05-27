import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0f",
        "ios-blue": "#007AFF",
        "card-bg": "rgba(255,255,255,0.04)",
        "card-border": "rgba(255,255,255,0.06)",
      },
      backdropBlur: {
        card: "24px",
      },
      maxWidth: {
        content: "600px",
        section: "672px",
      },
    },
  },
  plugins: [],
};
export default config;
