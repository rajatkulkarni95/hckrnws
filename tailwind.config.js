const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        system: defaultTheme.fontFamily.sans,
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        coolSans: ["Karla", ...defaultTheme.fontFamily.sans],
        serif: ["Sentinent", ...defaultTheme.fontFamily.serif],
        mono: ["Space Mono", ...defaultTheme.fontFamily.mono],
      },
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        tertiary: "var(--color-text-tertiary)",
        icon: "var(--color-text-icon)",
        code: "var(--color-text-code)",
        ...colors,
      },
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        tertiary: "var(--color-bg-tertiary)",
        hover: "var(--color-bg-hover)",
        code: "var(--color-bg-code)",
        tooltip: "var(--color-bg-tooltip)",
        ...colors,
      },
      borderColor: {
        primary: "var(--color-border-primary)",
        secondary: "var(--color-border-secondary)",
        ...colors,
      },
    },
  },
  plugins: [],
};
