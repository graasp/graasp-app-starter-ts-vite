import { QueryClientConfig } from '../types';
import configureAppsHooks from './app';
import configureAppActionHooks from './appAction';
import configureAppDataHooks from './appData';
import configureAppSettingHooks from './appSetting';
import configurePostMessageHooks from './postMessage';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (queryConfig: QueryClientConfig) => ({
  ...configureAppsHooks(queryConfig),
  ...configureAppDataHooks(queryConfig),
  ...configurePostMessageHooks(queryConfig),
  ...configureAppSettingHooks(queryConfig),
  ...configureAppActionHooks(queryConfig),
});
