import { configureQueryClient } from '@/query-client';

import { GRAASP_APP_KEY, MOCK_API } from './env';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  ReactQueryDevtools,
  API_ROUTES,
  mutations,
} = configureQueryClient({
  notifier: (data) => {
    // eslint-disable-next-line no-console
    console.log('notifier: ', data);
  },
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  staleTime: 1000, // ms
  GRAASP_APP_KEY,
  isStandalone: MOCK_API,
});

export {
  queryClient,
  QueryClientProvider,
  hooks,
  mutations,
  ReactQueryDevtools,
  API_ROUTES,
};
