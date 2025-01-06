module.exports = {
  content: [
    './src/**/*.pug',
  ],
  safelist: ['flex', 'hidden', 'block'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#002444',
        secondary: '#9CAAB2',
      },
      aspectRatio: {
        '1920/1080': '1920/1080',
        '1920/560': '1920/560',
        '390/572': '390/572',
        'gallery': '1240/800',
        '600/900': '600/900',
        '500/650': '500/650',
        '1200/720': '1200/720'
      }
    },
  },
  plugins: [],
};
