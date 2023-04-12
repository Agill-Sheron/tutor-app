import { extendTheme } from 'native-base';

const customTheme = extendTheme({
    colors: {
        backgroundColor: '#E3F2F9',
        primary: {
            50: '#ffe9ed',
            100: '#f0c5cc',
            200: '#e09ea9',
            300: '#d37987',
            400: '#c55465',
            500: '#ab3a4b',
            600: '#862c3a',
            700: '#611f2a',
            800: '#3b1118',
            900: '#1b0206',
        },
    },
});

export default customTheme;

