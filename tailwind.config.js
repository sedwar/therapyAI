// tailwind.config.js - Enhanced for AURA AI Companion
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                // Legacy colors for compatibility
                'lavender': '#E6E6FA',
                'sage': '#9CAF88',
                'cream': '#FFF5E1',
                'teal': '#28B2B2',
                'gold': '#E6C200',
                'charcoal': '#1C1C1C',
                'coolGray': '#E0E0E0',
                
                // New AURA AI companion palette
                'aura': {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    500: '#667eea',
                    600: '#5a67d8',
                    700: '#4c51bf',
                    800: '#434190',
                    900: '#3c366b'
                },
                'nova': {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706'
                },
                'sage-new': {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    500: '#10b981',
                    600: '#059669'
                },
                'phoenix': {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    500: '#ef4444',
                    600: '#dc2626'
                },
                'mira': {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    500: '#8b5cf6',
                    600: '#7c3aed'
                },
                'zen': {
                    50: '#ecfeff',
                    100: '#cffafe',
                    500: '#06b6d4',
                    600: '#0891b2'
                }
            },
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
            },
            animation: {
                'bounce-gentle': 'bounce 2s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                }
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(102, 126, 234, 0.4)',
                'glow-lg': '0 0 40px rgba(102, 126, 234, 0.6)',
            }
        },
    },
    plugins: [],
};