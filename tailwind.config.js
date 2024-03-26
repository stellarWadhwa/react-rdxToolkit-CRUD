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
        'odd-white-color': '#F5F5F5',
        'blueColor':'#0B60B0'
      }
    },
  },
  plugins: [],
}