/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      'blackk':'#1D2639',
      'grayy':'#465975',
      'lightgrayy':'#7B8CA6',
      'wheatt':'#E0E1DD'
    }
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
