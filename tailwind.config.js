/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'odd-color':"#E78895",
        'odd-white-color': '#FFF7F1'
      }
    },
  },
  plugins: [],
}