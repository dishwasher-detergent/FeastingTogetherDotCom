const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",  
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        slate: {
          1000: '#060912'
        }
      }
    },
  },
  plugins: [
    require("okiedesign")
  ],
}
