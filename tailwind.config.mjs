/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1E3D59',
          dark: '#152D42',
          light: '#2A5278',
        },
        orange: {
          DEFAULT: '#E67E22',
          dark: '#CA6F1E',
          light: '#F0964A',
        },
        grey: {
          light: '#F2F3F4',
          mid: '#D5D8DC',
        },
        midblue: '#2980B9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
