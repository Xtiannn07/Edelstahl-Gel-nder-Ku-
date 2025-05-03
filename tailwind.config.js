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
        'bg-left': '#e7f3ff',   // Pale lavender-blue
        'bg-mid': '#f0f2f5',    // Neutral midpoint
        'bg-right': '#f5f6f7',  // Warm white-gray

        'primary': '#f8ce50',  // Dark blue
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