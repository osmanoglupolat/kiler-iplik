module.exports = {
  content: [
    './src/**/*.pug',
  ],
  safelist: ['flex', 'hidden', 'block'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1600px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#002444',
      },
      aspectRatio: {
        '1920/1080': '1920/1080',
        '390/572': '390/572'
      }
    },
  },
  plugins: [],
};
