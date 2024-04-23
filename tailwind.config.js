/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f9f9f9',
          100: '#ececec',
          200: '#e3e3e3',
          300: '#cdcdcd',
          400: '#b4b4b4',
          500: '#9b9b9b',
          600: '#676767',
          700: '#424242',
          750: '#2f2f2f',
          800: '#212121',
          900: '#171717',
          950: '#0d0d0d'
        },
        black: '#000000',
        white: '#ffffff'
      },
      ringWidth: {
        DEFAULT: '3px',
      },
      ringColor: {
        DEFAULT: '#cdcdcd',
        focus: '#cdcdcd'
      }
    }
  },
  plugins: [],
}