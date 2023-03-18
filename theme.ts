import { extendBaseTheme, mergeThemeOverride } from '@chakra-ui/theme-utils';
import chakraTheme from '@chakra-ui/theme';

const {
    Select,
    Tabs,
    Spinner,
    Popover,
    Progress,
    NumberInput,
    PinInput,
    Menu,
    Modal,
    Link,
    Form,
    FormError,
    FormLabel,
    Heading,
    Button,
    Input,
    Checkbox,
    Skeleton,
    Drawer,
    Container,
    Divider,
    CloseButton,
    Alert,
    Avatar,
    Textarea
    // Badge,
} = chakraTheme.components;

const colors = {
    white: '#fff',
    primary: {
        50: '#f4ffdb',
        100: '#e6ffae',
        200: '#dbff7d',
        300: '#d3ff4b',
        400: '#cfff1a',
        500: '#a6e600',
        600: '#75b300',
        700: '#4b8000',
        800: '#264d00',
        900: '#091b00'
    },
    secondary: '#00D7AD',
    tertiary: '#00D7AD',
    black: {
        50: '#000',
        100: '#000',
        200: '#000',
        300: '#000',
        400: '#000',
        500: '#000',
        600: '#000',
        700: '#000',
        800: '#000',
        900: '#000'
    },
    teal: {
        '50': '#EEF7F2',
        '100': '#CFE8DA',
        '200': '#B0D9C2',
        '300': '#91CAAB',
        '400': '#72BB93',
        '500': '#53AC7B',
        '600': '#428A62',
        '700': '#32674A',
        '800': '#214531',
        '900': '#112219'
    },
    red: {
        '50': '#FFE6E7',
        '100': '#FEB9BA',
        '200': '#FD8B8E',
        '300': '#FD5E62',
        '400': '#FC3136',
        '500': '#FC030A',
        '600': '#C90308',
        '700': '#970206',
        '800': '#650104',
        '900': '#320102'
    },
    yellow: {
        '50': '#FFFDE5',
        '100': '#FFF8B8',
        '200': '#FFF48A',
        '300': '#FFF05C',
        '400': '#FFEB2E',
        '500': '#FFE700',
        '600': '#CCB900',
        '700': '#998B00',
        '800': '#665C00',
        '900': '#332E00'
    },
    blue: {
        '50': '#EBEDF9',
        '100': '#C8CCEF',
        '200': '#A4ABE5',
        '300': '#818ADA',
        '400': '#5D69D0',
        '500': '#3949C6',
        '600': '#2E3A9E',
        '700': '#222C77',
        '800': '#171D4F',
        '900': '#0B0F28'
    }
};

const fonts = {
    heading: `'Outfit', sans-serif`,
    body: `'Outfit', sans-serif`,
    mono: `'Outfit', sans-serif`
};

const components = {
    Select,
    Drawer,
    Divider,
    CloseButton,
    Alert,
    Avatar,
    Tabs,
    // Spinner,
    Textarea,
    Popover,
    Progress,
    NumberInput,
    PinInput,
    Menu,
    Modal,
    Link,
    Form,
    FormError,
    FormLabel,
    Heading,
    Input,
    Checkbox,
    Skeleton,
    // Badge,
    Text: {
        baseStyle: {
            color: '#001430'
        }
    },
    Spinner: mergeThemeOverride(Spinner, {
        sizes: {
            '2xl': {
                width: '12rem',
                height: '12rem'
            }
        }
    }),
    Button: mergeThemeOverride(Button, {
        baseStyle: {
            fontWeight: 700
        },
        sizes: {
            lg: {
                // height: 'auto',
                py: 5,
                px: 8,
                fontSize: 16
            },
            xl: {
                py: 5,
                px: 10,
                height: 'auto',
                fontSize: 18
            }
        }
    }),
    Container: mergeThemeOverride(Container, {
        defaultProps: {
            size: 'md'
        },
        sizes: {
            sm: {
                maxWidth: 'sm'
            },
            md: {
                maxWidth: 'lg'
            },
            lg: {
                maxWidth: 'xl'
            },
            xl: {
                maxWidth: '2xl'
            },
            '2xl': {
                maxWidth: '3xl'
            },
            '3xl': {
                maxWidth: '4xl'
            },
            '4xl': {
                maxWidth: '5xl'
            },
            '5xl': {
                maxWidth: '6xl'
            },
            '6xl': {
                maxWidth: '7xl'
            }
        }
    })
};

export const theme = extendBaseTheme({
    components,
    colors,
    fonts
});
