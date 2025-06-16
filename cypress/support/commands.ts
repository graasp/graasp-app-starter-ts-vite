/// <reference types="../../src/window" />
import { Database } from '@graasp/apps-query-client';
import { LocalContext } from '@graasp/sdk';

import { CURRENT_MEMBER, MEMBERS } from '../fixtures/members';
import { MOCK_SERVER_ITEM } from '../fixtures/mockItem';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      setUpApi(
        database: Partial<Database>,
        appContext: Partial<LocalContext>,
      ): void;
    }
  }
}

Cypress.Commands.add('setUpApi', (database, appContext) => {
  Cypress.on('window:before:load', (win: Window) => {
    win.indexedDB.deleteDatabase('graasp-app-cypress');
    win.appContext = {
      accountId: CURRENT_MEMBER.id,
      itemId: MOCK_SERVER_ITEM.id,
      apiHost: Cypress.env('VITE_API_HOST'),
      ...appContext,
    };
    win.database = {
      appData: [],
      appActions: [],
      appSettings: [],
      members: Object.values(MEMBERS),
      items: [MOCK_SERVER_ITEM],
      ...database,
    };
  });
});
