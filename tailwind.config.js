// tailwind.config.js
module.exports = {
  darkMode: 'class',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        dark: '#1f2937', // Custom dark color
        'dark-gray': '#4B5563', // Custom dark gray color
      },
      textColor: theme => ({
        ...theme('colors'),
        'dark-gray': '#4B5563', // Custom dark gray color
      }),
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Example of using Roboto font
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
