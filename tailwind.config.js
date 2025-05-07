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
      },
  },
  plugins: [],
}
