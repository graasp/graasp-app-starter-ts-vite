import { convertJs } from '@graasp/sdk';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import * as Api from '../api';
import { buildAppContextKey } from '../config/keys';
import { getApiHost, getDataOrThrow } from '../config/utils';
import { AppContextRecord, QueryClientConfig } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (queryConfig: QueryClientConfig) => {
  const { retry, cacheTime, staleTime } = queryConfig;
  const defaultOptions = {
    retry,
    cacheTime,
    staleTime,
  };
  return {
    useAppContext: () => {
      const queryClient = useQueryClient();
      const apiHost = getApiHost(queryClient);
      const { itemId, token } = getDataOrThrow(queryClient, {
        shouldMemberExist: false,
      });

      return useQuery({
        queryKey: buildAppContextKey(itemId),
        queryFn: (): Promise<AppContextRecord> =>
          Api.getContext({
            itemId,
            token,
            apiHost,
          }).then((data) => convertJs(data)),
        ...defaultOptions,
      });
    },
  };
};
