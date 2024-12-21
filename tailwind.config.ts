/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // For pages in your `pages` folder
    "./app/**/*.{js,ts,jsx,tsx}", // For files in the `app` folder (if using App Router in Next.js)
    "./components/**/*.{js,ts,jsx,tsx}", // For components in your `components` folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
