import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito sans", "ui-sans-serif", "sans-serif"],
        sans2: ["Rubik", "sans-serif"],
      },
      colors: {
        pastel: {
          red: "#ff6961",
          orange: "#ff8f3d",
          blue: "#50c6f2",
          green: "#6bf18a",
          purple: "#e58ef9",
          pink: "#f8c8dc",
        },
      },
    },
  },
};
