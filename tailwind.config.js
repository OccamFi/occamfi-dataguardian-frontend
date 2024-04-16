/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("tailwindcss-inner-border")],
  theme: {
    extend: {
      boxShadow: {
        xs: "box-shadow: 0px 1px 2px 0px #1018280D",
      },
      colors: {
        athensGray: "#EAECF0",
        dodgerBlue: {
          DEFAULT: "#5891FF",
          dark: "#357aff",
          light: "#689cff",
        },
        fiord: "#475467",
        gullGray: "#98A2B3",
        mineShaft: "#2B2B2B",
        mischka: "#D0D5DD",
        paleSky: "#667085",
        oxfordBlue: "#344054",
      },
    },
  },
};
