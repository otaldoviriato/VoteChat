/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3498db', // Azul
        secondary: '#2ecc71', // Verde
        tertiary: '#e74c3c', // Vermelho
        quaternary: '#f39c12', // Amarelo
        background: '#3593d6', // Backgroung
        backgroundDark: '#d3ecff'
        // Adicione outras cores estilosas conforme necessário
      },
    },
  },
  plugins: [],
}
