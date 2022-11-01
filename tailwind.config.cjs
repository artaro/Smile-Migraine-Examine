/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        subPrimary: "#179B97",
        secondary: "#6C6C6C",
        infoBlue: "#0679E0",
        infoYellow: "#FDC72F",
        infoOrange: "#FC5605",
        greenButton: "#25AC67",
        lightGreenButton: "#C8F2D9",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        notoSans: ["Noto Sans Thai", "Noto Sans"],
      },
      fontWeight: {
        weight400: "400",
        weight500: "500",
        weight600: "600",
        weight700: "700",
        weight800: "800",
        weight900: "900",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
