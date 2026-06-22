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
        // Display = Hanken Grotesk (operator-console restyle, 2026-06); body Inter; mono JetBrains.
        display: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        // Boxy operator scale — caps roundness so existing rounded-full /
        // rounded-2xl re-shape to the mockup's terminal look in one place.
        none: '0',
        sm: '0.0625rem',
        DEFAULT: '0.125rem',
        md: '0.1875rem',
        lg: '0.25rem',
        xl: '0.5rem',
        '2xl': '0.5rem',
        '3xl': '0.75rem',
        full: '0.75rem',
      },
    },
  },
  plugins: [],
};
