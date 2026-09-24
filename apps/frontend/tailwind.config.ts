import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#ffffff',
        mist: '#f5f5f7',
        ink: {
          DEFAULT: '#1d1d1f',
          2: '#6e6e73',
          3: '#86868b',
        },
        hairline: '#d2d2d7',
        night: {
          DEFAULT: '#000000',
          2: '#161617',
          3: '#2c2c2e',
        },
        navy: '#2a4759',
        ember: {
          DEFAULT: '#f79b72',
          ink: '#b4532a',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-text)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        spring: 'cubic-bezier(0.34, 1.36, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
