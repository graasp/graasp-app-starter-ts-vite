import { toast } from 'react-toastify';

import { Notifier, configureQueryClient } from '@graasp/apps-query-client';

import type { AxiosError } from 'axios';

import { InfoToast, NetworkErrorToast } from '@/modules/common/CustomToasts';

import { API_HOST, GRAASP_APP_KEY, MOCK_API } from './env';

const notifier: Notifier = (data) => {
  const { payload } = data;
  if (payload) {
    // eslint-disable-next-line no-console
    console.log(data.payload);
    // axios error
    if (
      payload.error &&
      payload.error.name === 'AxiosError' &&
      (payload.error as AxiosError).response
    ) {
      const { message } = (payload.error as AxiosError).response?.data as {
        message: string;
      };
      toast.error(
        <NetworkErrorToast
          title={payload.error.message}
          description={message}
        />,
      );
    }
    toast.success(<InfoToast type={data.type} payload={payload} />);
  }
};

const {
  queryClient,
  QueryClientProvider,
  hooks,
  API_ROUTES,
  mutations,
  ReactQueryDevtools,
} = configureQueryClient({
  API_HOST,
  notifier,
  refetchOnWindowFocus: !import.meta.env.DEV,
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  staleTime: 1000, // ms
  GRAASP_APP_KEY,
  isStandalone: MOCK_API,
});

export {
  ReactQueryDevtools,
  queryClient,
  QueryClientProvider,
  hooks,
  mutations,
  API_ROUTES,
};
