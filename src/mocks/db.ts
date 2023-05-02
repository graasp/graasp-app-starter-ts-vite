import type { Database, LocalContext, Member } from '@graasp/apps-query-client';

import { v4 } from 'uuid';

// import { APP_DATA_TYPES } from '@/config/appDataTypes';
import { API_HOST } from '@/config/env';

export const mockContext: LocalContext = {
  apiHost: API_HOST,
  permission: 'admin',
  context: 'player',
  itemId: '1234-1234-123456-8123-123456',
  memberId: v4(),
};

export const mockMembers: Member[] = [
  {
    id: mockContext.memberId || v4(),
    name: 'ID-123',
    email: '',
    extra: {},
  },
];

// const commentBot = v4();
// const commentParent = v4();

const buildDatabase = (
  appContext: Partial<LocalContext>,
  members?: Member[],
): Database => ({
  appData: [
    // {
    //   id: commentBot,
    //   data: {
    //     content: 'This would be thee bot comment',
    //     parent: null,
    //     chatbotPromptSettingId: 'rubbish',
    //   },
    //   memberId: 'mock-member-id',
    //   type: APP_DATA_TYPES.BOT_COMMENT,
    //   itemId: appContext.itemId || '',
    //   visibility: 'member',
    //   creator: 'mock-member-id',
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // },
    // {
    //   id: commentParent,
    //   data: {
    //     content: '*Hello* this is a _comment_ on line 3',
    //     parent: commentBot,
    //   },
    //   memberId: 'mock-member-id',
    //   type: APP_DATA_TYPES.COMMENT,
    //   itemId: appContext.itemId || '',
    //   visibility: 'member',
    //   creator: 'mock-member-id',
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // },
    // {
    //   id: v4(),
    //   data: {
    //     content: '*Hello* this is a _response_ on line 3',
    //     parent: commentParent,
    //   },
    //   memberId: 'mock-member-id',
    //   type: APP_DATA_TYPES.COMMENT,
    //   itemId: appContext.itemId || '',
    //   creator: 'mock-member-id',
    //   visibility: 'member',
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // },
  ],
  appActions: [],
  members: members ?? mockMembers,
  appSettings: [
    // {
    //   id: 'e09b45ad-4391-48fd-99f1-8f0f300f4b59',
    //   name: 'CHATBOT_PROMPT_SETTINGS',
    //   itemId: '81f2dc95-1f15-48f6-92b2-913e38265270',
    //   data: {
    //     chatbotPrompt: 'Hello! I am a chatbot. Ask me anything.',
    //     initialPrompt: [
    //       {
    //         role: 'system',
    //         content: 'You are a chatbot.',
    //       },
    //     ],
    //   },
    //   creator: 'a25baa07-09e6-4c8c-a53e-9adc94937037',
    //   createdAt: '2023-04-26T09:34:16.160Z',
    //   updatedAt: '2023-04-26T09:34:16.160Z',
    // },
  ],
});

export default buildDatabase;
