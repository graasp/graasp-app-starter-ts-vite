import { CurrentMember, ItemType, Member, PermissionLevel } from '@graasp/sdk';

import { API_HOST } from '@/config/env';
import type { Database, LocalContext } from '@/query-client';

export const defaultMockContext: LocalContext = {
  apiHost: API_HOST,
  permission: PermissionLevel.Admin,
  context: 'builder',
  itemId: '1234-1234-123456-8123-123456',
  memberId: 'mock-member-id',
};

export const mockMembers: CurrentMember[] = [
  {
    id: defaultMockContext.memberId || '',
    name: 'current-member',
    email: '',
    extra: {},
    type: 'individual',
    createdAt: new Date('1996-09-08T19:00:00'),
    updatedAt: new Date(),
  },
  {
    id: 'mock-member-id-2',
    name: 'mock-member-2',
    email: '',
    extra: {},
    type: 'individual',
    createdAt: new Date('1995-02-02T15:00:00'),
    updatedAt: new Date(),
  },
];

const buildDatabase = (
  appContext: Partial<LocalContext>,
  members?: Member[],
): Database => ({
  appContext: { ...defaultMockContext, ...appContext },
  appData: [],
  appActions: [
    {
      id: 'cecc1671-6c9d-4604-a3a2-6d7fad4a5996',
      type: 'admin-action',
      memberId: mockMembers[0].id,
      createdAt: new Date(),
      itemId: defaultMockContext.itemId,
      data: { content: 'hello' },
    },
    {
      id: '0c11a63a-f333-47e1-8572-b8f99fe883b0',
      type: 'other-action',
      memberId: mockMembers[1].id,
      createdAt: new Date(),
      itemId: defaultMockContext.itemId,
      data: { content: 'other member' },
    },
  ],
  members: members ?? mockMembers,
  appSettings: [],
  items: [
    {
      id: defaultMockContext.itemId,
      name: 'app-starter-ts-vite',
      description: null,
      path: '',
      settings: {},
      type: ItemType.APP,
      extra: { [ItemType.APP]: { url: 'http://localhost:3002' } },
      creator: mockMembers[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
});

export default buildDatabase;
