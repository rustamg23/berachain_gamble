/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.5)', // Пример текстовой тени
      },
      fontFamily: {
        'Bowlby': ['Bowlby One', 'sans-serif'],
      },
      height: {
        '14': '272px',
        '17': '17rem',
      },
      fontSize: {
        '100': '100px',
        '80': '80px',
      },
      width: {
        "4/5": "80%", 
        "9/10": "90%"
      }
    },
  },
  plugins: [],
}

