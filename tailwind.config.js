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
        '80': '80vh',
        '50': '50vh',
        'reel-lg': '450px',
        'reel-md': '240px',
        'reel-sm': '150px',
        'slot-lg': '150px',
        'slot-md': '80px',
        'slot-sm': '50px',
        '90p': '90%'
      },
      fontSize: {
        '100': '100px',
        '80': '80px',
      },
      width: {
        "4/5": "80%", 
        "9/10": "90%",
        'slot-lg': '150px',
        'slot-md': '80px',
        'slot-sm': '50px',
      }
    },
  },
  plugins: [],
}

