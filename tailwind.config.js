/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // for Next.js App Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"  // in case you add pages dir
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#60a5fa",  // light blue
          DEFAULT: "#2563eb", // primary blue
          dark: "#1e40af"    // dark blue
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.05)"
      }
    }
  },
  plugins: []
}
