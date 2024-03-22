import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        black: "rgb(0, 0, 0)",
        black10: "#181818",
        black20: "rgba(0, 0, 0, 0.6)",
        black30: "rgb(17, 24, 39)",
        black40: "141414",
        black50: "rgb(20, 20, 20)",

        gray10: "rgb(119, 119, 119)",
        gray20: "rgb(156, 163, 175)",
        gray40: "rgba(42, 42, 42, 0.6)",

        white10: "rgba(255, 255, 255, 1)",
        white20: "rgba(243, 244, 246, 1)",
        white30: "rgb(209, 213, 219)",

        green10: "rgba(110, 231, 183, 1)",
        shadow10: "rgba(0, 0, 0, 0.3)",
        shadow20: "rgba(158, 155, 155, 0.3)",
        shadow30: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",

        red: "rgb(220, 38, 38)",
        red10: "rgba(185, 28, 28, 1)",

        blue: "rgba(75, 85, 99, 1)",
        blue20: "rgb(55, 65, 81)",
      }
    },
  },
  plugins: [],
};
export default config;
