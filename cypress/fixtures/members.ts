import { AccountType, CompleteMember } from '@graasp/sdk';

export const MEMBERS: { [key: string]: CompleteMember } = {
  ANNA: {
    id: '0f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'anna',
    type: AccountType.Individual,
    email: 'anna@graasp.org',
    extra: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastAuthenticatedAt: new Date().toISOString(),
    isValidated: true,
    enableSaveActions: true,
  },
  BOB: {
    id: '1f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'bob',
    type: AccountType.Individual,
    email: 'bob@graasp.org',
    extra: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastAuthenticatedAt: new Date().toISOString(),
    isValidated: true,
    enableSaveActions: true,
  },
};

export const CURRENT_MEMBER = MEMBERS.ANNA;
