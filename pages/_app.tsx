import '../styles/globals.css';

import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
