import { Context, PermissionLevel } from '@graasp/sdk';

import { ANALYTICS_VIEW_CY, buildDataCy } from '../../../src/config/selectors';

describe('Analytics View', () => {
  beforeEach(() => {
    cy.setUpApi(
      {},
      {
        context: Context.Analytics,
        permission: PermissionLevel.Admin,
      },
    );
    cy.visit('/');
  });

  it('App', () => {
    cy.get(buildDataCy(ANALYTICS_VIEW_CY)).should(
      'contain.text',
      'Analytics as admin',
    );
  });
});
