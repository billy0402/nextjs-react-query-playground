import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { handleError } from './error';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
});
