/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        inherit: "inherit",
      },
      width: {
        clamp: "clamp(5rem, 6.5rem, 8rem)",
      },
      fontSize: {
        clamp: "clamp(0.75rem, 0.8rem, 1rem)",
      },
    },
  },
  plugins: [],
};
