/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#016AFD",
        gray: {
          light: "#F4F7FB",
          DEFAULT: "#F7F7F7",
        },
      },
    },
  },
  plugins: [],
};
