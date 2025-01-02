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
        colors: {
          primary: "var(--color-primary)",
          accent: "var(--color-accent)"
        },
        spacing: {
          18: "4.5rem", // Example custom spacing
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
