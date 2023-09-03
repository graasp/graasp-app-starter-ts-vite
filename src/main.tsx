import React from 'react';
import ReactDOM from 'react-dom/client';

import * as Sentry from '@sentry/react';

// todo: use from apps-query-client
import { mockApi } from '@/query-client';

import { MOCK_API } from './config/env';
import { generateSentryConfig } from './config/sentry';
import './index.css';
import buildDatabase, { defaultMockContext, mockMembers } from './mocks/db';
import Root from './modules/Root';
import { MockSolution } from './query-client/mockServer/mockServer';

Sentry.init({
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  ...generateSentryConfig(),
});

// setup mocked api for cypress or standalone app
/* istanbul ignore next */
if (MOCK_API) {
  mockApi(
    {
      externalUrls: [],
      appContext: window.Cypress ? window.appContext : defaultMockContext,
      database: window.Cypress
        ? window.database
        : buildDatabase(defaultMockContext, mockMembers),
    },
    MockSolution.ServiceWorker,
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
