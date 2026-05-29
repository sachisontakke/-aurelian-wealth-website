/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#091210',
        pine: '#0d4f45',
        spruce: '#173f39',
        mint: '#d9f1e9',
        mist: '#f4f7f5',
        pearl: '#fbfcfb',
        graphite: '#26302c',
        gold: '#c6a15b',
        ember: '#d86f56',
        aqua: '#73c9b7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        soft: '0 22px 60px rgba(9, 18, 16, 0.14)',
        line: '0 1px 0 rgba(9, 18, 16, 0.08)',
      },
      animation: {
        floaty: 'floaty 8s ease-in-out infinite',
        draw: 'draw 7s ease-in-out infinite',
        rise: 'rise 10s linear infinite',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        draw: {
          '0%': { strokeDashoffset: '640' },
          '45%, 65%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-640' },
        },
        rise: {
          '0%': { transform: 'translateY(12px)', opacity: '0.2' },
          '45%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-42px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
