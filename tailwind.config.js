/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        cairo: "'Cairo Variable', sans-serif",
      },
      colors: {
        primary: {
          50: "#ceefce",
          100: "#9dde9d",
          200: "#6cce6c",
          300: "#3bbd3b",
          400: "#0aad0a",
          500: "#099c09",
          600: "#088a08",
          700: "#077907",
          800: "#066806",
          900: "#055705",
          950: "#033403",
        },
      },
      screens: {
        "2xl": "1230px",
      },
    },
  },
  plugins: [],
};
