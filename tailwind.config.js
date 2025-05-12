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
        dotInactive: '#d1d5db',   // Gray for inactive dots
        dotActive: '#dc2626',     // Red for active dots
        dotHover: '#f87171',      // Light red for hover
        arrowBg: '#4B5563',       // Default arrow color (gray-700)
        arrowHover: '#374151',    // Hover color (gray-800)
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
  variants: {
    extend: {
      textAlign: ['rtl', 'ltr'],
      margin: ['rtl', 'ltr'],
      padding: ['rtl', 'ltr'],
    },
  },
};
