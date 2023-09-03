import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  dehydrate,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { API_ROUTES } from './api/routes';
import {
  CACHE_TIME_MILLISECONDS,
  STALE_TIME_MILLISECONDS,
} from './config/constants';
import { MUTATION_KEYS, QUERY_KEYS, buildPostMessageKeys } from './config/keys';
import configureHooks from './hooks';
import configureMutations from './mutations';
import { QueryClientConfig } from './types';

// Query client retry function decides when and how many times a request should be retried
const defaultRetryFunction = (
  failureCount: number,
  error: unknown,
): boolean => {
  // retry if the request timed out
  const codes = [StatusCodes.GATEWAY_TIMEOUT, StatusCodes.REQUEST_TIMEOUT];
  const reasons = codes.map((code) => getReasonPhrase(code));

  if (
    error instanceof Error &&
    (reasons.includes(error.message) || reasons.includes(error.name))
  ) {
    return failureCount < 3;
  }

  return false;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (config: Partial<QueryClientConfig>) => {
  const baseConfig = {
    SHOW_NOTIFICATIONS: config.SHOW_NOTIFICATIONS || false,
    keepPreviousData: config.keepPreviousData || false,
    retry: config.retry ?? defaultRetryFunction,
  };

  // define config for query client
  const queryConfig: QueryClientConfig = {
    ...baseConfig,
    isStandalone: config.isStandalone ?? false,
    GRAASP_APP_KEY: config.GRAASP_APP_KEY ?? config.GRAASP_APP_ID,
    notifier: config.notifier,
    // time until data in cache considered stale if cache not invalidated
    staleTime: config.staleTime || STALE_TIME_MILLISECONDS,
    // time before cache labeled as inactive to be garbage collected
    cacheTime: config.cacheTime || CACHE_TIME_MILLISECONDS,
  };

  // create queryClient with given config
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: config.refetchOnWindowFocus || false,
        retry: config.shouldRetry ?? queryConfig.retry,
      },
    },
  });

  // set up mutations given config
  // mutations are attached to queryClient
  const mutations = configureMutations(queryClient, queryConfig);

  // set up hooks given config
  const hooks = configureHooks(queryConfig);

  // returns the queryClient and relative instances
  return {
    API_ROUTES,
    buildPostMessageKeys,
    dehydrate,
    hooks,
    Hydrate,
    MUTATION_KEYS,
    mutations,
    QUERY_KEYS,
    queryClient,
    QueryClientProvider,
    ReactQueryDevtools,
    useMutation,
    useQuery,
  };
};
