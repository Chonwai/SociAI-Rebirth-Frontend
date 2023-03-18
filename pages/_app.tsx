// file path: pages/_app.tsx

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react';
// import { theme } from '../theme';

function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default App;
