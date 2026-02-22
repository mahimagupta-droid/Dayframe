/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    colors: {
      background: "var(--bg-primary)",
      card: "var(--bg-card)",
      borderPrimary: "var(--border-primary)",
      textSecondary: "var(--text-secondary)",
      accent: "var(--accent-primary)",
      highlight: "var(--accent-highlight)",
    },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
    },
  },
  plugins: [],
}