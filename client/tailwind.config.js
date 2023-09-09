/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans'], // 'Roboto' debe coincidir con el nombre de la fuente de Google
      },
    },
  },
  plugins: [],
}

