module.exports = {
  content: [
    './src/**/*.pug',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1600px'
      }
    },
    extend: {
      colors: {
        primary: '#002444',
      },
      aspectRatio: {
        '1920/1080': '1920/1080'
      }
    },
  },
  plugins: [],
};
