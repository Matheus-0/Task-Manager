/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
    },
  },
  plugins: [],
}
