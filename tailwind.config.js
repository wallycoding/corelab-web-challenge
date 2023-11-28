/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        capuccino: {
          100: '#F0F2F5',
          200: '#455A64',
          300: '#4F4F4D',
          400: '#464646',
          500: '#FFE3B3',
          600: '#D9D9D9',
          700: '#9A9A9A',
          800: '#333333',
          900: '#50656E',
        },
        'sticky-notes': {
          'light-gray': '#979797',
          'light-blue': '#9DD6FF',
          beige: '#A99A7C',
          'mint-green': '#B9FFDD',
          'sky-blue': '#BAE2FF',
          'dove-gray': '#CDCDCD',
          'light-green': '#DAFF8B',
          'light-purple': '#ECA1FF',
          'light-red': '#F99494',
          'light-orange': '#FFA285',
          'light-peach': '#FFCAB9',
          'light-yellow': '#FFE8AC',
        },
      },
    },
  },
}
