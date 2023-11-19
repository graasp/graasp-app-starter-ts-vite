import { toast } from 'react-toastify';

import {
  Notifier,
  ROUTINES,
  configureQueryClient,
} from '@graasp/apps-query-client';

import type { AxiosError } from 'axios';

import { InfoToast, NetworkErrorToast } from '@/modules/common/CustomToasts';

import { API_HOST, GRAASP_APP_KEY, MOCK_API } from './env';

const {
  deleteAppDataRoutine,
  deleteAppSettingRoutine,
  getAppDataRoutine,
  getAppSettingsRoutine,
  getLocalContextRoutine,
  patchAppDataRoutine,
  patchAppSettingRoutine,
  postAppActionRoutine,
  postAppDataRoutine,
  postAppSettingRoutine,
} = ROUTINES;

const EXCLUDED_NOTIFICATION_TYPES: string[] = [
  getAppDataRoutine.SUCCESS,
  postAppDataRoutine.SUCCESS,
  patchAppDataRoutine.SUCCESS,
  deleteAppDataRoutine.SUCCESS,
  getAppSettingsRoutine.SUCCESS,
  postAppSettingRoutine.SUCCESS,
  patchAppSettingRoutine.SUCCESS,
  deleteAppSettingRoutine.SUCCESS,
  postAppActionRoutine.SUCCESS,
  getLocalContextRoutine.SUCCESS,
];

const notifier: Notifier = (data) => {
  const { payload } = data;
  if (payload) {
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
    // only info messages for types that we do not know or when we have the debug env variable
    if (
      !EXCLUDED_NOTIFICATION_TYPES.includes(data.type) ||
      import.meta.env.VITE_DEBUG
    )
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
