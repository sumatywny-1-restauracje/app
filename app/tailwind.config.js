/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        68: "17rem",
        84: "21rem",
        88: "22rem",
        92: "23rem",
        108: "27rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
