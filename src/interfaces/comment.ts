import { AppData } from '@graasp/apps-query-client';

import { APP_DATA_TYPES } from '../config/appDataTypes';

export type VisibilityVariants = 'member' | 'item';

export interface CommentAppData {
  data: {
    line: number;
    codeId: string;
    content: string;
    parent: string;
    multiline?: {
      start: number;
      end: number;
    };
    chatbotPromptSettingId?: string;
  };
  type: APP_DATA_TYPES.COMMENT | APP_DATA_TYPES.BOT_COMMENT;
  visibility?: VisibilityVariants;
}
export type CommentType = AppData & CommentAppData;
