module.exports = {
  purge: [
    "./src/components/**/*.tsx",
    "./src/components/**/*.styled.ts",
    "./src/components/**/*.styled.tsx",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        25: "#F5FAFF",
        50: "#EFF8FF",
        100: "#D1E9FF",
        200: "#B2DDFF",
        300: "#84CAFF",
        400: "#53B1FD",
        500: "#2E90FA",
        600: "#1570EF",
        700: "#175CD3",
        800: "#1849A9",
        900: "#194185",
      },
    },
    fontSize: {
      xs: ["12px", "18px"],
      sm: ["14px", "20px"],
      md: ["16px", "24px"],
      lg: ["18px", "28px"],
      xl: ["20px", "30px"],

      h6: ["24px", "32px"],
      h5: ["30px", "38px"],
      h4: ["36px", "44px"],
      h3: ["48px", "60px"],
      h2: ["60px", "72px"],
      h1: ["72px", "90px"],
    },
    extend: {},
    breakpointsInspector: {
      position: ["bottom", "right"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-breakpoints-inscpector"),
  ],
};
