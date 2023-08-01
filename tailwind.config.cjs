/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist:[
    'flex',
    'items-center',
    'justify-center',
    'h-screen',
    'w-screen',
  ]
}