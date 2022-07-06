//import '../styles/globals.css' // No tailwind
import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GetServerSidePropsContext } from 'next';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ApplicationContainer } from '../components/ApplicationContainer';
import { getCookie, setCookies } from 'cookies-next';
import NextNProgress from "nextjs-progressbar";
const client = new QueryClient()

export default function App(props: AppProps & { colorScheme: ColorScheme}) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  return (
    <>
      <Head>
        <title>Imbento</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Head>
      <meta name="google-site-verification" content="nLJ6QZVyl-8o5oYiY6GUslM2xBZyzrmk2KrQeySyOaA" />
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
            <NotificationsProvider>
              <ApplicationContainer>
              <NextNProgress color="red"/>
                <Component {...pageProps} />
              </ApplicationContainer>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});