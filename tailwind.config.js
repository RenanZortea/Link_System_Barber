/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-once': 'spin 0.2s ease',
        'down-up': 'down-up 1s ease-in-out',
        'up-down': 'up-down 1s ease-in-out',
        'bounce': 'bounce 0.2s',
        'chart-animation': 'openFromCenter 0.5s ease-in-out',
        
      },
      keyframes: {
        'openFromCenter': {
            'from': {
              transform:'scaleX(0)',
            },
            'to': {
              transform:'scaleX(1)',
            }
          },
  
        'down-up': {
          '0%': { transform: 'translateY(200%)' },
          '25%': { transform: 'translateY(-7%)' },
          '50%': { transform: 'translateY(0)' },
        },
        'up-down': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(100%)' },
        },
        'bounce': {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
      },
      colors: {
        'blue-darker': '#000033',
        'blue-almost-dark': '#06066d',
        'gray-darker': '#171C28',
        'gradient-dark-1': '#020020',
        'gradient-dark-2': '#0c0425',
        'gradient-dark-3': '#000416',
        dark: { // Dark mode colors
          'blue-darker': '#000099',
          'blue-almost-dark': '#0606aa',
        },
      }
    },
  },
  plugins: [],
}