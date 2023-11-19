import type { Database, LocalContext } from '@graasp/apps-query-client';
import {
  CompleteMember,
  DiscriminatedItem,
  ItemType,
  PermissionLevel,
} from '@graasp/sdk';

import { API_HOST } from '@/config/env';

export const defaultMockContext: LocalContext = {
  apiHost: API_HOST,
  permission: PermissionLevel.Admin,
  context: 'builder',
  itemId: '1234-1234-123456-8123-123456',
  memberId: 'mock-member-id',
};

export const mockMembers: CompleteMember[] = [
  {
    id: defaultMockContext.memberId || '',
    name: 'current-member',
    email: '',
    extra: {},
    type: 'individual',
    createdAt: new Date('1996-09-08T19:00:00').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mock-member-id-2',
    name: 'mock-member-2',
    email: '',
    extra: {},
    type: 'individual',
    createdAt: new Date('1995-02-02T15:00:00').toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockItem: DiscriminatedItem = {
  id: defaultMockContext.itemId,
  name: 'app-starter-ts-vite',
  description: null,
  path: '',
  settings: {},
  type: ItemType.APP,
  extra: { [ItemType.APP]: { url: 'http://localhost:3002' } },
  creator: mockMembers[0],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const buildDatabase = (members?: CompleteMember[]): Database => ({
  appData: [],
  appActions: [
    {
      id: 'cecc1671-6c9d-4604-a3a2-6d7fad4a5996',
      type: 'admin-action',
      member: mockMembers[0],
      createdAt: new Date().toISOString(),
      item: mockItem,
      data: { content: 'hello' },
    },
    {
      id: '0c11a63a-f333-47e1-8572-b8f99fe883b0',
      type: 'other-action',
      member: mockMembers[1],
      createdAt: new Date().toISOString(),
      item: mockItem,
      data: { content: 'other member' },
    },
  ],
  members: members ?? mockMembers,
  appSettings: [],
  items: [mockItem],
});

export default buildDatabase;
