/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "575px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        nunitoSans: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        darkBlue: "hsl(209, 23%, 22%)",
        veryDarkBlueDM: "hsl(207, 26%, 17%)",
        veryDarkBlueLM: "hsl(200, 15%, 8%)",
        darkGray: "hsl(0, 0%, 52%)",
        veryLightGray: "hsl(0, 0%, 98%)",
        whiteClr: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};
