/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0f3',
          100: '#cce1e8',
          200: '#99c3d1',
          300: '#66a5ba',
          400: '#3387a3',
          500: '#00698c',
          600: '#005470',
          700: '#003f54',
          800: '#002a38',
          900: '#00151c',
        },
        dark: {
          bg: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          text: '#c9d1d9',
          muted: '#8b949e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
