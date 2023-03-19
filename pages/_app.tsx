// file path: pages/_app.tsx

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const config = {
    initialColorMode: 'system',
    useSystemColorMode: true
};

const theme = extendTheme({ config });

function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default App;
