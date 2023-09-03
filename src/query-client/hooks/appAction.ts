import { convertJs } from '@graasp/sdk';
import { AppActionRecord } from '@graasp/sdk/frontend';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { List } from 'immutable';

import * as Api from '../api';
import { buildAppActionsKey } from '../config/keys';
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
    useAppActions: ({ enabled = true }: { enabled?: boolean } = {}) => {
      const queryClient = useQueryClient();
      const apiHost = getApiHost(queryClient);
      const { itemId } = getData(queryClient);

      return useQuery({
        queryKey: buildAppActionsKey(itemId),
        queryFn: (): Promise<List<AppActionRecord>> => {
          const { token } = getDataOrThrow(queryClient);

          return Api.getAppActions({ itemId, token, apiHost }).then((data) =>
            convertJs(data),
          );
        },
        ...defaultOptions,
        enabled,
      });
    },
  };
};
