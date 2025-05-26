/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-text-color': '#6B3572',
        'custom-text-color2': '#6B3572',
        'custom-text-color-active': '#90a6a2',
        'custom-s1': '#fffcfc',
        'custom-e1': '#fff8f3',
        'custom-e2': '#ffecd8',
        'custom-s3': '#ffe4c8',
        'custom-e3': '#f7f0e3',
        'custom-s4': '#dae3d1',
        'custom-e4': '#b8c0b0',
        'custom-s5': '#ffefe2',
        'custom-e5': '#4b7475',
      },
    },
  },
  plugins: [],
};

