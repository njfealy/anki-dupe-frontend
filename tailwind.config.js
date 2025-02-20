/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./pages/Home.jsx", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    transform: true,
  },
  theme: {
    extend: {
      animation: {
        slideDown: "slideDown 1s ease-in-out",
        fadeIn: "fadeIn 0.2s ease-in-out",
        open: "open 0.2s ease-in-out",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        open: {
          "0%": { transform: "scaleY(0) translateY(-100)" },
          "100%": { transform: "scaleY(100%) translateY(0)" },
        },
      },
      fontFamily: {
        roboto: ["Roboto", "serif"],
      },
    },
  },
  plugins: [],
};
