const forIn = require('lodash/forIn')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    content: ['./src/**/*.js', './src/*.js', './public/*.html'],
  },
  theme: {
    fontFamily: {
      body: ['sans-serif', 'Lato'],
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        codecov: {
          red: '#CE2019',
          orange: '#FFC273',
          footer: '#07111b',
        },
        ds: {
          gray: {
            darkest: '#1f2d3d',
            dark: '#3c4858',
            DEFAULT: '#c0ccda',
            light: '#e0e6ed',
            lightest: '#f9fafc',
          }
          gray: {
            darkest: '#1f2d3d',
            dark: '#3c4858',
            DEFAULT: '#c0ccda',
            light: '#e0e6ed',
            lightest: '#f9fafc',
          }
        },
        gray: {
          100: '#F7F8FB',
          200: '#EAEBEF',
          300: '#C7CBD1',
          400: '#999FA7',
          500: '#68737E',
          600: '#394754',
          800: '#222F3D',
          900: '#0E1B29',
        },
        pink: {
          100: '#FF4A89',
          500: '#F01F7A',
          900: '#D10D62',
        },
        blue: {
          100: '#52B7FF',
          200: '#0095FF',
          400: '#0088E9',
          600: '#0071C2',
          800: '#015896',
          900: '#002D4D',
        },
        warning: {
          900: '#473610',
          500: '#CA8E00',
          100: '#FFEBD2',
        },
        success: {
          100: '#DEFFE8',
          500: '#73FF9E',
          700: '#27B340',
          900: '#0E1B29',
        },
        error: {
          100: '#FFEDF0',
          500: '#FF9B9B',
          900: '#590808',
        },
        info: {
          100: '#DFF2FF',
          500: '#A3D9FF',
          900: '#013B65',
        },
      },
      boxShadow: {
        card: '0 7px 20px 0 rgba(34,47,61,0.05)',
      },
      screens: {
        print: { raw: 'print' },
      },
    },
  },
  variants: {
    extend: {
      textColor: ['disabled'],
      margin: ['responsive', 'last'],
      opacity: ['disabled', 'hover'],
      cursor: ['disabled'],
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
      borderRadius: ['focus', 'last'],
      borderStyle: ['first'],
      borderColor: ['first'],
      borderWidth: ['first'],
      padding: ['responsive', 'last'],
      backgroundColor: ['disabled'],
    },
  },
  plugins: [plugin(caretColorPlugin)],
}

function caretColorPlugin({ addUtilities, theme }) {
  // inspired by https://github.com/Naoray/tailwind-caret-color
  // which doesn't work for v2
  const colors = theme('colors')
  const newUtilities = {}
  forIn(colors, (variants, colorName) => {
    if (typeof variants === 'string') {
      // no variant for the color, it's directly the color
      newUtilities[`.caret-${colorName}`] = {
        'caret-color': variants,
      }
    } else {
      // map each variant of the color
      forIn(variants, (color, variantName) => {
        newUtilities[`.caret-${colorName}-${variantName}`] = {
          'caret-color': color,
        }
      })
    }
  })
  addUtilities(newUtilities)
}
