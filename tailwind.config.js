const plugin = require("tailwindcss/plugin");
import fluidPlugin, { extract, screens, fontSize } from 'fluid-tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: {
    files: ["./src/pages/**/*.{ts,tsx}", "./src/shared/components/**/*.tsx", "./src/shared/layouts/**/*.tsx"],
    extract
  },
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens,
    fontSize,
    extend: {
      colors: {
        primary: {
          50: "color(display-p3 var(--primary-50) / <alpha-value>)",
          100: "color(display-p3 var(--primary-100) / <alpha-value>)",
          200: "color(display-p3 var(--primary-200) / <alpha-value>)",
          300: "color(display-p3 var(--primary-300) / <alpha-value>)",
          400: "color(display-p3 var(--primary-400) / <alpha-value>)",
          500: "color(display-p3 var(--primary-500) / <alpha-value>)",
          600: "color(display-p3 var(--primary-600) / <alpha-value>)",
          700: "color(display-p3 var(--primary-700) / <alpha-value>)",
          800: "color(display-p3 var(--primary-800) / <alpha-value>)",
          900: "color(display-p3 var(--primary-900) / <alpha-value>)",
          950: "color(display-p3 var(--primary-950) / <alpha-value>)",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--kb-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--kb-accordion-content-height)' },
          to: { height: 0 },
        },
        'content-show': {
          from: { opacity: 0, transform: 'scale(0.96)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        'content-hide': {
          from: { opacity: 1, transform: 'scale(1)' },
          to: { opacity: 0, transform: 'scale(0.96)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'content-show': 'content-show 0.2s ease-out',
        'content-hide': 'content-hide 0.2s ease-out',
      },
    },
  },
  plugins: [
    fluidPlugin,
    require("tailwindcss-inner-border"),
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
      addComponents({
        '.no-scrollbar': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
        },
      });
    }),
    require('tailwindcss-animate'),
  ],
};
