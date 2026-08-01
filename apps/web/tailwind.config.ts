import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand palette
        primary: {
          DEFAULT: '#0052CC',
          hover: '#0065FF',
        },
        brand: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0052CC',
          600: '#0047B3',
          700: '#003D99',
          800: '#003380',
          900: '#002966',
        },
        teal: {
          50: '#E6FCFF',
          100: '#B3F5FF',
          200: '#80EEFF',
          300: '#4DE7FF',
          400: '#00B8D9',
          500: '#00A3C2',
          600: '#008EAA',
          700: '#007A93',
          800: '#00657B',
          900: '#005164',
        },
        amber: {
          50: '#FFF8E6',
          100: '#FFECB3',
          200: '#FFE080',
          300: '#FFD44D',
          400: '#FFC81A',
          500: '#FFAB00',
          600: '#E69A00',
          700: '#CC8900',
          800: '#B37800',
          900: '#996700',
        },
        surface: {
          DEFAULT: '#0A2540',
          card: '#102A45',
          elevated: '#173654',
          hover: '#1F4263',
          border: '#234B73',
          'border-light': '#2D5B8A',
        },
        dark: {
          DEFAULT: '#0A2540',
          surface: '#172B4D',
        },
        accent: {
          DEFAULT: '#00B8D9',
          hover: '#00C7E6',
        },
        bg: {
          DEFAULT: '#0A2540',
        },
        card: {
          DEFAULT: '#FFFFFF',
        },
        border: {
          DEFAULT: '#DFE1E6',
        },
        text: {
          main: '#F4F5F7',
          sub: '#97A0AF',
          primary: '#F4F5F7',
          secondary: '#C1C7D0',
          muted: '#8993A4',
        },
        status: {
          success: '#36B37E',
          warning: '#FFAB00',
          danger: '#FF5630',
          info: '#00B8D9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-brand': '0 0 20px -5px rgba(0, 82, 204, 0.5)',
        'glow-teal': '0 0 20px -5px rgba(0, 184, 217, 0.5)',
        'card-hover': '0 8px 24px 0 rgba(0, 0, 0, 0.4)',
        enterprise: '0 1px 3px 0 rgba(9, 30, 66, 0.13), 0 0 1px 0 rgba(9, 30, 66, 0.31)',
        'enterprise-hover': '0 4px 12px 0 rgba(9, 30, 66, 0.15), 0 0 1px 0 rgba(9, 30, 66, 0.31)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
