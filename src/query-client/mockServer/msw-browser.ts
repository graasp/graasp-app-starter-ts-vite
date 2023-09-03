import { SetupWorker, setupWorker } from 'msw';

import { Database, LocalContext } from '../types';
import { buildMockLocalContext } from './fixtures';
import { buildMSWMocks } from './msw-handlers';

export const mockServiceWorkerServer = ({
  appContext,
  database,
}: {
  appContext: Partial<LocalContext> & Pick<LocalContext, 'itemId'>;
  database?: Database;
}): { worker: SetupWorker; resetDB: (data: Database) => void } => {
  const fullAppContext = buildMockLocalContext(appContext);
  const mswMocks = buildMSWMocks(fullAppContext, database);
  mswMocks.db.on('populate', (transaction) => {
    if (database) {
      // seed database with data
      // eslint-disable-next-line no-console
      console.log('Populating the DB with provided mock data');
      transaction.table('item').bulkAdd(database?.items);
      transaction.table('member').bulkAdd(database?.members);
      transaction.table('appData').bulkAdd(database?.appData);
      transaction.table('appAction').bulkAdd(database?.appActions);
      transaction.table('appSetting').bulkAdd(database?.appSettings);
      transaction.table('appContext').bulkAdd([database?.appContext]);
    } else {
      // eslint-disable-next-line no-console
      console.log('There was no data to populate the database');
    }
  });

  // This configures a Service Worker with the given request handlers.
  const worker = setupWorker(...mswMocks.handlers);
  worker.start({ waitUntilReady: true, onUnhandledRequest: 'warn' });

  return { worker, resetDB: mswMocks.db.resetDB };
};
