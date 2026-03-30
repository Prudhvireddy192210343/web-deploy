/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'appPrimaryText': '#0D121B',
        'appSecondaryText': '#4C669A',
        'appBackground': '#F8F9FC',
        'appCardBackground': '#FFFFFF',
        'appBorder': '#CFD7E7',
        'appSuccess': '#07883B',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}