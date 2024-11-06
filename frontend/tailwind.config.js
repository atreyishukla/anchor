/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'primary':  ["DM Sans", "serif"],

      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2859ff",
          "secondary": "#000000",
          "accent": "#151515",
         "neutral": "#1e1e1e",
          "base-100": "#101010",
          "info": "#ffffff",
          "success": "#00ff00",
          "warning": "yellow",
          "error": "red",
          "Tcolor": "white",
        },

         lighttheme: {
          "primary": "#2859ff", 
          "secondary": "#FFFCF8",
          "accent": "#F4F5FC",
          "neutral": "#1e1e1e",
          "base-100": "#FFFCF8",
          "info": "#2859ff",
          "success": "#00ff00",
          "warning": "yellow",
          "error": "red",
          "Tcolor": "white",
        },

        },
      ],
    },
  
  plugins: [daisyui],

  
}

