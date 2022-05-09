import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient()

export default function MyApp({ Component, pageProps }) {
  return (
  <QueryClientProvider client={client}>
    <>
      <Component {...pageProps} />
    </>
  </QueryClientProvider>
  )
}