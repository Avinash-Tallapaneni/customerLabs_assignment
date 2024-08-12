/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        teal: "#088395",
        aqua: "#37B7C3",
        midnight: "#071952",
        dark: "#111827",
        paleBlue: "#EBF4F6",
        danger: "#F87171",




        sand: "#F9DBBA",
        skyBlue: "#5B99C2",
        oceanBlue: "#1A4870",
        navy: "#1F316F",
        midnight: "#071952",
        teal: "#088395",
        aqua: "#37B7C3",
        paleBlue: "#EBF4F6",

        primary: "#4F46E5",
        secondary: "#3B82F6",
        accent: "#FBBF24",
        background: "#F9FAFB",
        text: "#111827",
        success: "#34D399",
      },
    },
  },
  plugins: [],
};
