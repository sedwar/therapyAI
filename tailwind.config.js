// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'lavender': '#E6E6FA',
                'sage': '#9CAF88',
                'cream': '#FFF5E1',
                // New brand colors for the tech-chic theme
                'teal': '#28B2B2',
                'gold': '#E6C200',
                'charcoal': '#1C1C1C',
                'coolGray': '#E0E0E0',
            },
            screens: {
                'sm': '640px',
                'md': '768px',
            },
        },
    },
    plugins: [],
};