import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ApplicationContainer } from '../components/ApplicationContainer';

const client = new QueryClient()

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Imbento</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={client}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          
            <ApplicationContainer>
              <Component {...pageProps} />
            </ApplicationContainer>
          
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}