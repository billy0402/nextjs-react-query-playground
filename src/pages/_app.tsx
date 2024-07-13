import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import LoadingOverlay from '@/components/LoadingOverlay';
import { queryClient } from '@/helpers/query-client';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
        <LoadingOverlay />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
