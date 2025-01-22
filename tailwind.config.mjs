/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        width: {
          thin: '1px', // Customize the thin scrollbar width
          DEFAULT: '4px', // Default scrollbar width
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    animation: {
      bounce: 'bounce 1s infinite',
    },
    keyframes: {
      bounce: {
        '0%, 100%': { transform: 'translateX(1) translateY(1)' },
        '50%': { transform: 'translateX(-1px) translateY(-1px)' },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide')
  ],

};
