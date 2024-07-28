const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./pages/**/*.tsx", "./shared/layouts/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "hsl(var(--primary-50) / <alpha-value>)",
          100: "hsl(var(--primary-100) / <alpha-value>)",
          200: "hsl(var(--primary-200) / <alpha-value>)",
          300: "hsl(var(--primary-300) / <alpha-value>)",
          400: "hsl(var(--primary-400) / <alpha-value>)",
          500: "hsl(var(--primary-500) / <alpha-value>)",
          600: "hsl(var(--primary-600) / <alpha-value>)",
          700: "hsl(var(--primary-700) / <alpha-value>)",
          800: "hsl(var(--primary-800) / <alpha-value>)",
          900: "hsl(var(--primary-900) / <alpha-value>)",
          950: "hsl(var(--primary-950) / <alpha-value>)",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        ".starly-container": {
          marginInline: "max(0px, 50% - 360px / 2)",
          [`@media (min-width: ${theme("screens.sm")})`]: {
            marginInline: "max(0px, 50% - 640px / 2)",
          },
          [`@media (min-width: ${theme("screens.md")})`]: {
            marginInline: "max(0px, 50% - 720px / 2)",
          },
          [`@media (min-width: ${theme("screens.lg")})`]: {
            marginInline: "max(0px, 50% - 900px / 2)",
          },
          [`@media (min-width: ${theme("screens.xl")})`]: {
            marginInline: "max(0px, 50% - 1120px / 2)",
          },
          [`@media (min-width: ${theme("screens.2xl")})`]: {
            marginInline: "max(0px, 50% - 1320px / 2)",
          },
        },
      });
    }),
  ],
};
