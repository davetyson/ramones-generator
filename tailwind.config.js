/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'rotate': 'spin 3s linear infinite',
        'fade' : 'fadeInOut 4s linear',
      },
      keyframes: theme => ({
        fadeInOut: {
          '0%' : { opacity: '0%' },
          '20%' : { opacity: '100%' },
          '80%' : { opacity: '100%' },
          '100%' : { opacity: '0%' },
        }
      }),
      colors: {
        customGreen: '#A8E557',
      },
    },
  },
  plugins: [],
}

