/** @type {import('tailwindcss').Config} */


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
        "secondary-red": "#F50008",
        "dark-gray": "#1F1F1F",
        "light-gray": "#C2C2C2",
      },
      fontFamily: {
        // 'sans': ['Oswald'],
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#CC0007",
          "secondary": "#FF141A",
          "accent": "#C2C2C2",
          "neutral": "#1F1F1F",
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/typography"), 
    require("daisyui"),
  ],
};
