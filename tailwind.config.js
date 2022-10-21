/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        darkYellow: "#fce728",
        maroon: "#800000",
        lightGreen: "#006400ab",
        darkBlack: "#080808",
        whitesmoke: "#f5f5f5",
        boardGreen: "#177b3d",
      },
    },
  },
  plugins: [],
};
