module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          100: '#fdf6e3',
          200: '#f8e9c8',
          300: '#f3dbae',
          400: '#eecf93',
          500: '#e9c278',
          600: '#e4b65d',
          700: '#dfaa42',
          800: '#da9e27',
          900: '#d5920c',
          950: '#d08600',
        },
        ocean: '#005f73', // Example of another custom color
        brown: '#4d422f',
        sunset: {
          light: '#f9cbb1', // Add shades for more flexibility
          DEFAULT: '#f9844a',
          dark: '#c4603d',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],  
}