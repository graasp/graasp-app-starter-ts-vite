import { Context, PermissionLevel } from '@graasp/sdk';

import { PLAYER_VIEW_CY, buildDataCy } from '../../../src/config/selectors';

describe('Player View', () => {
  beforeEach(() => {
    cy.setUpApi(
      {},
      {
        context: Context.Player,
        permission: PermissionLevel.Write,
      },
    );
    cy.visit('/');
  });

  it('App', () => {
    cy.get(buildDataCy(PLAYER_VIEW_CY)).should(
      'contain.text',
      'Player as write',
    );
  });
});
