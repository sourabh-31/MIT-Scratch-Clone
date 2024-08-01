/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accentColor: "#855cd6",
        accentBorder: "#c6bdef",
        primaryText: "#575e75",
        primaryBorder: "#c4ccd9",
        secondaryBorder: "#d1d5db",
      },
    },
  },
  plugins: [],
};
