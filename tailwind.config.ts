import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-medium": "#257180",
        "blue-dark": "#0f2d33",
        "orange-medium": "#FD8B51",
        "cream-light": "#F2E5BF",
        "bone-white": "#F9F6EE",
      },
      fontFamily: {
        "permanent-marker": "var(--font-permanent-marker)",
        karla: "var(--font-karla)",
        acme: "var(--font-acme)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
