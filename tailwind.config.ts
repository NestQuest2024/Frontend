import type {Config} from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                "2xl": "1440px",
            },
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'blue': '#1D4ED8',
                'black': '#000000',
                'nav_grey': '#CBD5E1',
                'white': '#FFFFFF'
            },
            textColor: {
                'white': '#FFFFFF',
                'black': '#000000'
            },
            borderRadius: {
                '20': '20px',
                '2': '2px'
            },
            padding: {
                'normal': '6px 20px 6px 20px',
                'navbar': '10px'
            },
            plugins: [],
        },
    },
}

export default config