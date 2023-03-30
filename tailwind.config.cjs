/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': "#131921",
        'dark-secondary': "#232f3e",
        'main': "#e3e6e6",
        'light-primary': "#37475a",
        'yellow-accent': "#febd69",
        'yellow-disabled': '#fffae0',
        'yellow-main': "#ffd814",
        'orange-accent': "#f08804",
        'header': '#fefefe',
        'gray-main': '#999999',
        'gray-accent': "#f0f2f2",
        'gray-text': '#565959',
        'gray-border': '#bbbfbf',
        'link-blue': '#007185',
        'link-red': '#B12704',
        'success-green': '#007600',
        'phone-blue': '#8dd6e2',
        'phone-green': '#a4e6cd',
        'dark-green': '#037c8a',
        'light-green': '#c6f2e3'
      },
      minHeight: {
        'unset': 'unset'
      }
    },
  },
  plugins: [],
}
