/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myntra: {
          pink: '#ff3f6c',
          pinkHover: '#e6335c',
          charcoal: '#282c3f',
          gray: '#94969f',
          lightBg: '#f5f5f6',
          border: '#eaeaec',
          gold: '#ff905a',
          success: '#03a685',
        }
      },
      fontFamily: {
        sans: ['Assistant', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
