/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  darkMode: (classToAdd) => {
    return classToAdd ? 'dark' : false;
  },
  content: [ "./src/**/*.{html,ts}",],
  theme: {
    extend: {},
  },
  plugins: [],
}

