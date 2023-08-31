// file used for customization of tailwind 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //colors can be customized here 
      // colors: {
      //   primary: ..
      //   secondary: ..
      // }
    },
  },
  plugins: [],
}
