// The PostCSS configuration object

module.exports = {
  // Specify the plugins to be used
  plugins: [
    // Include Tailwind CSS as a PostCSS plugin
    require("tailwindcss"),

    // Include Autoprefixer as a PostCSS plugin
    require("autoprefixer"),
  ],
};
