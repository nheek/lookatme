/** @type {import('tailwindcss').Config} */

// The Tailwind CSS configuration object

module.exports = {
  // Specify the files that Tailwind should analyze for styles
  content: [
    "./public/**/*.{js,css}",   // Include all JavaScript and CSS files in the 'public' directory
    "./views/**/*.ejs",         // Include all EJS files in the 'views' directory
  ],
  
  // Define your theme customization or extension
  theme: {
    extend: {},  // You can add custom styles or extend existing styles here
  },
  
  // Specify any additional plugins you want to use (none in this case)
  plugins: [],
}