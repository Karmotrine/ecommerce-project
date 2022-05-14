//import '../styles/globals.css'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { ApplicationContainer } from '../components/ApplicationContainer';


const client = new QueryClient()

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <>
      <Head>
        <title>Imbento</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={client}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{colorScheme,
              breakpoints: {
                xs: 500,
                sm: 800,
                md: 1000,
                lg: 1200,
                xl: 1400,
              },
            }}
          >
              <ApplicationContainer>
                <Component {...pageProps} />
              </ApplicationContainer>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
      
    </>
  );
}