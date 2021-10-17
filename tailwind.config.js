module.exports = {
  purge: [
    "./src/components/**/*.tsx",
    './src/components/**/*.styled.ts',
    './src/components/**/*.styled.tsx',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    breakpointsInspector: {
      position: ['bottom', 'right'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-breakpoints-inscpector')
  ],
}
