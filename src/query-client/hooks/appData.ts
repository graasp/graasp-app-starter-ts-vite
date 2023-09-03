import { convertJs } from '@graasp/sdk';
import { AppDataRecord } from '@graasp/sdk/frontend';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { List } from 'immutable';

import * as Api from '../api';
import { MissingFileIdError } from '../config/errors';
import { buildAppDataKey, buildFileContentKey } from '../config/keys';
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
    useAppData: (refetchInterval: number | false = false) => {
      const queryClient = useQueryClient();

      const apiHost = getApiHost(queryClient);
      const { itemId } = getData(queryClient);

      return useQuery({
        queryKey: buildAppDataKey(itemId),
        queryFn: (): Promise<List<AppDataRecord>> => {
          const { token } = getDataOrThrow(queryClient);
          return Api.getAppData({ itemId, token, apiHost }).then((data) =>
            convertJs(data),
          );
        },
        ...defaultOptions,
        refetchInterval,
      });
    },

    useAppDataFile: (
      payload?: { fileId: string },
      { enabled = true }: { enabled?: boolean } = {},
    ) => {
      const queryClient = useQueryClient();
      const apiHost = getApiHost(queryClient);

      return useQuery({
        queryKey: buildFileContentKey(payload?.fileId),
        queryFn: () => {
          const { token } = getDataOrThrow(queryClient);

          if (!payload?.fileId) {
            throw new MissingFileIdError();
          }
          const { fileId } = payload;
          return Api.getAppDataFile({ id: fileId, apiHost, token }).then(
            (data) => data,
          );
        },
        ...defaultOptions,
        enabled,
      });
    },
  };
};
