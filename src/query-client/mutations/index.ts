import { QueryClient } from '@tanstack/react-query';

import { QueryClientConfig } from '../types';
import appActionMutations from './appAction';
import appMutations from './appData';
import appSettingMutations from './appSetting';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const configureMutations = (
  queryClient: QueryClient,
  queryConfig: QueryClientConfig,
) => ({
  ...appMutations(queryClient, queryConfig),
  ...appSettingMutations(queryClient, queryConfig),
  ...appActionMutations(queryClient, queryConfig),
});

export default configureMutations;
