import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        calista: {
          blue: "#005BA4",
          "blue-dark": "#004780",
          "blue-light": "#0070c0",
          cyan: "#00AEEF",
          lime: "#8DC63F",
          charcoal: "#1A1D20",
          muted: "#636E7B",
          border: "#E2E8F0",
          light: "#F8FAFC",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
