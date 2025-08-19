// AURA AI - Revolutionary Design System
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Revolutionary cool-toned palette for premium, futuristic feel
        slate: {
          150: '#f8fafc',
          250: '#f1f5f9',
          350: '#e2e8f0',
          450: '#cbd5e1',
          550: '#94a3b8',
          650: '#64748b',
          750: '#475569',
          850: '#334155',
          950: '#0f172a',
        },
        cyan: {
          150: '#ecfeff',
          250: '#cffafe',
          350: '#a5f3fc',
          450: '#67e8f9',
          550: '#22d3ee',
          650: '#06b6d4',
          750: '#0891b2',
          850: '#0e7490',
          950: '#164e63',
        },
        teal: {
          150: '#f0fdfa',
          250: '#ccfbf1',
          350: '#99f6e4',
          450: '#5eead4',
          550: '#2dd4bf',
          650: '#14b8a6',
          750: '#0d9488',
          850: '#0f766e',
          950: '#134e4a',
        },
        emerald: {
          150: '#ecfdf5',
          250: '#d1fae5',
          350: '#a7f3d0',
          450: '#6ee7b7',
          550: '#34d399',
          650: '#10b981',
          750: '#059669',
          850: '#047857',
          950: '#064e3b',
        },
        sky: {
          150: '#f0f9ff',
          250: '#e0f2fe',
          350: '#bae6fd',
          450: '#7dd3fc',
          550: '#38bdf8',
          650: '#0ea5e9',
          750: '#0284c7',
          850: '#0369a1',
          950: '#0c4a6e',
        },
        indigo: {
          150: '#eef2ff',
          250: '#e0e7ff',
          350: '#c7d2fe',
          450: '#a5b4fc',
          550: '#818cf8',
          650: '#6366f1',
          750: '#4f46e5',
          850: '#4338ca',
          950: '#312e81',
        },
        // Accent colors for futuristic touches
        neon: {
          blue: '#00d4ff',
          cyan: '#00ffdd',
          green: '#00ff88',
          purple: '#aa55ff',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.3)',
        'glow-cyan-lg': '0 0 50px rgba(6, 182, 212, 0.4)',
        'glow-teal': '0 0 30px rgba(20, 184, 166, 0.3)',
        'glow-teal-lg': '0 0 50px rgba(20, 184, 166, 0.4)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};