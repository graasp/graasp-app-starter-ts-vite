import { convertJs } from '@graasp/sdk';
import { AppSettingRecord } from '@graasp/sdk/frontend';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { List } from 'immutable';

import * as Api from '../api';
import { MissingFileIdError } from '../config/errors';
import {
  buildAppSettingFileContentKey,
  buildAppSettingsKey,
} from '../config/keys';
import { getApiHost, getData, getDataOrThrow } from '../config/utils';
import { QueryClientConfig } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (queryConfig: QueryClientConfig) => {
  const { retry, cacheTime, staleTime } = queryConfig;
  const defaultOptions = {
    retry,
    cacheTime,
    staleTime,
  };
  return {
    useAppSettings: () => {
      const queryClient = useQueryClient();
      const apiHost = getApiHost(queryClient);
      const { token, itemId } = getData(queryClient, {
        shouldMemberExist: false,
      });

      return useQuery({
        queryKey: buildAppSettingsKey(itemId),
        queryFn: (): Promise<List<AppSettingRecord>> => {
          const { token: localToken, itemId: localItemId } = getDataOrThrow(
            queryClient,
            {
              shouldMemberExist: false,
            },
          );

          return Api.getAppSettings({
            itemId: localItemId,
            token: localToken,
            apiHost,
          }).then((data) => convertJs(data));
        },
        ...defaultOptions,
        enabled: Boolean(itemId) && Boolean(token),
      });
    },

    useAppSettingFile: (
      payload?: { appSettingId: string },
      { enabled = true }: { enabled?: boolean } = {},
    ) => {
      const queryClient = useQueryClient();

      const apiHost = getApiHost(queryClient);
      const { token } = getData(queryClient, { shouldMemberExist: false });

      return useQuery({
        queryKey: buildAppSettingFileContentKey(payload?.appSettingId),
        queryFn: (): Promise<Blob> => {
          const { token: localToken } = getDataOrThrow(queryClient, {
            shouldMemberExist: false,
          });

          // the following check are verified in enabled
          if (!payload?.appSettingId) {
            throw new MissingFileIdError();
          }
          const { appSettingId } = payload;
          return Api.getAppSettingFileContent({
            id: appSettingId,
            apiHost,
            token: localToken,
          }).then((data) => data);
        },
        ...defaultOptions,
        enabled: Boolean(payload?.appSettingId) && Boolean(token) && enabled,
      });
    },
  };
};
