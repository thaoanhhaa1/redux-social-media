/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            spacing: {
                1.25: '0.3125rem' /* 5px */,
                3.75: '0.9375rem' /* 15px */,
                4.5: '1.125rem' /* 18px */,
                5.5: '1.375rem' /* 22px */,
                7.5: '1.875rem' /* 30px */,
                8.5: '2.125rem' /* 34px */,
                8.75: '2.1875rem' /* 35px */,
                17.5: '4.375rem' /* 70px */,
                125: '31.25rem' /* 500px */,
            },
            height: {
                'top-bar': '4.6875rem' /* 75px */,
                inherit: 'inherit',
            },
            colors: {
                'blue-white-5': '#E9F0FF',
                'blue-white-4': '#D3E0FF',
                'blue-white-3': '#A7C1FF',
                'blue-white-2': '#7BA3FF',
                'blue-white-1': '#4F84FF',
                blue: '#2365FF',
                'blue-black-1': '#1C51CC',
                'blue-black-2': '#153D99',
                'blue-black-3': '#0E2866',
                'blue-black-4': '#071433',
                'blue-black-5': '#030A1A',
                'emerald-white-5': '#FAFCFC',
                'emerald-white-4': '#CDF1EB',
                'emerald-white-3': '#D0ECE8',
                'emerald-white-2': '#9EDFD4',
                'emerald-white-1': '#5ACDBA',
                emerald: '#03B79A',
                'emerald-black-1': '#03B79A',
                'emerald-black-2': '#026E5C',
                'emerald-black-3': '#01493E',
                'emerald-black-4': '#01251F',
                'emerald-black-5': '#00120F',
                'red-white-5': '#F9EBEC',
                'red-white-4': '#F2D7D8',
                'red-white-3': '#E6AFB2',
                'red-white-2': '#D9878B',
                'red-white-1': '#CD5F65',
                red: '#C0373E',
                'red-black-1': '#9A2C32',
                'red-black-2': '#732125',
                'red-black-3': '#4D1619',
                'red-black-4': '#260B0C',
                'red-black-5': '#130506',
                'yellow-white-5': '#FFF9E7',
                'yellow-white-4': '#FFF2CE',
                'yellow-white-3': '#FFE69E',
                'yellow-white-2': '#FED96D',
                'yellow-white-1': '#FECD3D',
                yellow: '#FEC00C',
                'yellow-black-1': '#CB9A0A',
                'yellow-black-2': '#987307',
                'yellow-black-3': '#664D05',
                'yellow-black-4': '#332602',
                'yellow-black-5': '#191301',
                'white-1': '#F2F2F2',
                'white-2': '#E5E5E5',
                'white-3': '#D9D9D9',
                'white-4': '#CCCCCC',
                'white-5': '#BFBFBF',
                'white-6': '#B3B3B3',
                'white-7': '#A6A6A6',
                'white-8': '#999999',
                'white-9': '#8C8C8C',
                'white-10': '#808080',
                black: '#0D0D0D',
                'black-1': '#191919',
                'black-2': '#262626',
                'black-3': '#333333',
                'black-4': '#404040',
                'black-5': '#4C4C4C',
                'black-6': '#595959',
                'black-7': '#666666',
                'black-8': '#737373',
                'base-white': '#FFFFFF',
                base: '#1B2730',
                'base-black': '#1A1A1B',
                'dark-black-3': '#28343E',
                'dark-black-2': '#1B2730',
                'dark-black-1': '#06141D',
                'white-45': 'rgba(255,255,255,0.#28343E)',
                'white-03': 'rgba(255,255,255,0.03)',
                'white-90': 'rgba(255,255,255,0.9)',
                'white-opacity-10': 'rgba(255,255,255,0.1)',
                'white-opacity-05': 'rgba(255,255,255,0.05)',
                'black-100': '#000',
                'black-opacity-10': 'rgba(0, 0, 0, 0.1)',
                'black-opacity-05': 'rgba(0, 0, 0, 0.05)',
                'stroke-icon': '#848183',
            },
            boxShadow: {
                'icon-btn':
                    '0 2px 8px rgba(0, 0, 0, 0.1),0 0 0 1px rgba(0, 0, 0, 0.1)',
                container: '0px 5px 45px #EBEBED',
                box: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            },
            lineHeight: {
                xs: '0.9375rem' /* 15px */,
                sm: '1.0625rem' /* 17px */,
                base: '1.1875rem' /* 19px */,
                xl: '1.5rem' /* 24px */,
                '4xl': '2.75rem /* 44px */',
            },
            borderRadius: {
                2.5: '0.625rem' /* 10px */,
            },
            transitionProperty: {
                'color-fill': 'color, fill',
            },
            fontFamily: {
                base: "'Inter', sans-serif",
            },
            keyframes: {
                spin1: {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '25%': {
                        transform: 'rotate(360deg)',
                    },
                    '30%': {
                        transform: 'rotate(370deg)',
                    },
                    '35%': {
                        transform: 'rotate(360deg)',
                    },
                    '100%': {
                        transform: 'rotate(360deg)',
                    },
                },
                spin2: {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '20%': {
                        transform: 'rotate(0deg)',
                    },
                    '30%': {
                        transform: 'rotate(-180deg)',
                    },
                    '35%': {
                        transform: 'rotate(-190deg)',
                    },
                    '40%': {
                        transform: 'rotate(-180deg)',
                    },
                    '78%': {
                        transform: 'rotate(-180deg)',
                    },
                    '95%': {
                        transform: 'rotate(-360deg)',
                    },
                    '98%': {
                        transform: 'rotate(-370deg)',
                    },
                    '100%': {
                        transform: 'rotate(-360deg)',
                    },
                },
                spin3: {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '27%': {
                        transform: 'rotate(0deg)',
                    },
                    '40%': {
                        transform: 'rotate(180deg)',
                    },
                    '45%': {
                        transform: 'rotate(190deg)',
                    },
                    '50%': {
                        transform: 'rotate(180deg)',
                    },
                    '62%': {
                        transform: 'rotate(180deg)',
                    },
                    '75%': {
                        transform: 'rotate(360deg)',
                    },
                    '80%': {
                        transform: 'rotate(370deg)',
                    },
                    '85%': {
                        transform: 'rotate(360deg)',
                    },
                    '100%': {
                        transform: 'rotate(360deg)',
                    },
                },
                spin4: {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '38%': {
                        transform: 'rotate(0deg)',
                    },
                    '60%': {
                        transform: 'rotate(-360deg)',
                    },
                    '65%': {
                        transform: 'rotate(-370deg)',
                    },
                    '75%': {
                        transform: 'rotate(-360deg)',
                    },
                    '100%': {
                        transform: 'rotate(-360deg)',
                    },
                },
            },
            animation: {
                spin1: 'spin1 3s linear infinite',
                spin2: 'spin2 3s linear 0.2s infinite',
                spin3: 'spin3 3s linear 0.3s infinite',
                spin4: 'spin4 3s linear 0.4s infinite',
            },
            zIndex: {
                1: 1,
            },
            transitionDelay: {
                0: '0ms',
            },
            backgroundImage: {
                '404-page':
                    'url(https://firebasestorage.googleapis.com/v0/b/online-multiple-choice-exam.appspot.com/o/gifs%2Fdribbble_1.gif?alt=media&token=b1d6d021-430e-42a1-a3b9-d4cfb0f0e2a8)',
            },
        },
        screens: {
            xxxs: '350px',
            xxs: '508px',
            xs: '576px',
            dl: '896px',
            gx: '1152px',
            xl: '1160px',
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
