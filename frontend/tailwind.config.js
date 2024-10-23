const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'light-blue': colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),

    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};