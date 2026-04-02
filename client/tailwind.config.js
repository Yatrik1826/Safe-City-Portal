export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        royal: '#164C8A',
        sky: '#E6F2FF',
        steel: '#9FB6D0',
        alert: '#E53E3E'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif']
      },
      boxShadow: {
        panel: '0 25px 80px rgba(9, 38, 76, 0.18)'
      }
    }
  },
  plugins: []
};
