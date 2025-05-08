/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#2F855A',
          secondary: '#38A169',
        },
        animation: {
          'slow-rotate': 'slow-rotate 5s ease-in-out infinite',
        },
        keyframes: {
          'slow-rotate': {
            '0%': { transform: 'rotate(-5deg)' },
            '50%': { transform: 'rotate(5deg)' },
            '100%': { transform: 'rotate(-5deg)' },
          },
        },
      },
    },
    plugins: [],
  }
  