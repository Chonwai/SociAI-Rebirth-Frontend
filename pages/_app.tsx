// file path: pages/_app.tsx

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import { StepsTheme as Steps } from 'chakra-ui-steps';
import Script from 'next/script';

const isDev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production';

const config = {
    initialColorMode: 'system',
    useSystemColorMode: true
};

const theme = extendTheme({
    config,
    ...{
        components: {
            Steps
        }
    }
});

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
            />
            <Script
                id="Google Tag Manager"
                dangerouslySetInnerHTML={{
                    __html: `
                                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_TRACKING_ID}');
                        `
                }}
            />
            <Script
                id="Google Analytics"
                dangerouslySetInnerHTML={{
                    __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                              page_path: window.location.pathname,
                            });
                        `
                }}
            />
            <Script
                id="Clarity"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: ` (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "gmdy6hqyj8");`
                }}
            />
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_TRACKING_ID}`}
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                ></iframe>
            </noscript>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
                <Analytics />
            </ChakraProvider>
        </>
    );
}

export default App;
