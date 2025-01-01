module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/globals.css",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px", // Custom breakpoint for extra small screens
      },
      colors: {
        primary: "#c9b037", // Customize this for your branding
        secondary: "#3b3a36",
      },
      spacing: {
        18: "4.5rem", // Example custom spacing
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
