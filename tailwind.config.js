const plugin = require('tailwindcss/plugin')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      './src/components/**/*.js',
      './src/components/**.js',
      './public/*.html',
    ],
  },
  theme: {
    fontFamily: {
      body: ['sans-serif', 'Lato'],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        codecov: {
          red: "#CE2019",
          orange: "#FFC273",
        },
        gray: {
          100: "#F7F8FB",
          200: "#EAEBEF",
          300: "#C7CBD1",
          400: "#999FA7",
          500: "#68737E",
          600: "#394754",
          800: "#222F3D",
          900: "#0E1B29",
        },
        pink: {
          100: "#FF4A89",
          500: "#F01F7A",
          900: "#D10D62",
        },
        blue: {
          100: "#52B7FF",
          200: "#0095FF",
          400: "#0088E9",
          600: "#0071C2",
          800: "#015896",
          900: "#002D4D",
        },
        warning: {
          900: "#473610",
          500: "#CA8E00",
          100: "#FFEBD2",
        },
        success: {
          100: "#DEFFE8",
          500: "#73FF9E",
          900: "#0E1B29",
        },
        error: {
          100: "#FFEDF0",
          500: "#FF9B9B",
          900: "#590808",
        },
        info: {
          100: "#DFF2FF",
          500: "#A3D9FF",
          900: "#013B65",
        },
      },
      boxShadow: {
        card: "0 7px 20px 0 rgba(34,47,61,0.05)",
      },
    },
  },
  variants: {
    margin: ['responsive', 'last']
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        html: {
          fontFamily: config('theme.fontFamily.body'),
          fontSize: '16px',
          fontSize: '1rem',
        },
      })
    }),
  ],
}
