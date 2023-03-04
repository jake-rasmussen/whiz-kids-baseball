/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      spacing: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      colors: {
        "red": "#CC0007",
        "secondary-red": "#FF141A",
        "dark-gray": "#1F1F1F",
        "light-gray": "#C2C2C2",

        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        rose: colors.rose,
        pink: colors.pink,
        fuchsia: colors.fuchsia,
        purple: colors.purple,
        violet: colors.violet,
        indigo: colors.indigo,
        blue: colors.blue,
        lightBlue: colors.lightBlue, // Only in Tailwind CSS <=v2.1
        sky: colors.sky, // As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`  
        cyan: colors.cyan,
        teal: colors.teal,
        emerald: colors.emerald,
        green: colors.green,
        lime: colors.lime,
        yellow: colors.yellow,
        amber: colors.amber,
        orange: colors.orange,
        slate: colors.slate,
        zinc: colors.zinc,
        gray: colors.gray,
        neutral: colors.blueGray,
        stone: colors.stone,
      },
    },
  },
  plugins: [require("daisyui")],
};
