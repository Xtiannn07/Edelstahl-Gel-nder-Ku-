/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Oswald"', 'sans-serif'],
      },
      colors: {
        
      },
      animation: {
        bounce: 'bounce 1.5s infinite ease-in-out'
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1rem)' }
        }
      },
    },
  },
  plugins: [],
}