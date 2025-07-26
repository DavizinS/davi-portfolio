/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        galaxy: '#0f0c29',
        purple: '#7e5bef',
        space: '#1f1b2e',
      },
      backgroundImage: {
        galaxy: "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)",
      },
    },
  },
  plugins: [],
}
