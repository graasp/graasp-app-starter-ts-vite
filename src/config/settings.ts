import { Context, PermissionLevel } from '@graasp/sdk';

import {
  AppModeSettings,
  AppModeSettingsKeys,
  ChatCompletionMessage,
  ChatbotPromptSettings,
  ChatbotPromptSettingsKeys,
  DataFileListSettings,
  DataFileListSettingsKeys,
  GeneralSettings,
  GeneralSettingsKeys,
} from '@/interfaces/settings';

import { AppMode } from './appSettingsTypes';
import { PYTHON, REVIEW_MODE_INDIVIDUAL } from './constants';
import { AppView } from './layout';

export const DEFAULT_APP_MODE = AppMode.Execute;
export const DEFAULT_APP_VIEW = AppView.CodeReview;

export const DEFAULT_CONTEXT = Context.BUILDER;
export const DEFAULT_PERMISSION = PermissionLevel.Read;
export const DEFAULT_LINE_HIDDEN_STATE = false;

export const DEFAULT_CONTEXT_API_HOST = '';
export const DEFAULT_CONTEXT_ITEM_ID = '';
export const DEFAULT_CONTEXT_LANGUAGE = 'en';
export const DEFAULT_CONTEXT_STANDALONE = false;
export const DEFAULT_CONTEXT_OFFLINE = false;
export const DEFAULT_CONTEXT_DEV = false;
export const DEFAULT_CONTEXT_SETTINGS = {};

// default values
export const DEFAULT_SHOW_HEADER_SETTING = false;
export const DEFAULT_SHOW_TOOLBAR_SETTING = true;
export const DEFAULT_SHOW_VERSION_NAVIGATION_SETTING = false;
export const DEFAULT_SHOW_EDIT_BUTTON_SETTING = false;
export const DEFAULT_SHOW_RUN_BUTTON_SETTING = false;
export const DEFAULT_SHOW_VISIBILITY_BUTTON_SETTING = true;
export const DEFAULT_ALLOW_COMMENTS_SETTING = true;
export const DEFAULT_ALLOW_REPLIES_SETTING = true;
export const DEFAULT_ALLOW_COMMENT_REPORTING = true;
export const DEFAULT_PROGRAMMING_LANGUAGE_SETTING = PYTHON;
export const DEFAULT_CODE_SETTING = '';
export const DEFAULT_COMMIT_MESSAGE_SETTING = '';
export const DEFAULT_COMMIT_DESCRIPTION_SETTING = '';
export const DEFAULT_MAX_COMMENT_LENGTH_SETTING = 300;

export const DEFAULT_REVIEW_MODE_SETTING = REVIEW_MODE_INDIVIDUAL;

// default settings object
export const DEFAULT_GENERAL_SETTINGS: GeneralSettings = {
  [GeneralSettingsKeys.AllowReplies]: DEFAULT_ALLOW_REPLIES_SETTING,
  [GeneralSettingsKeys.AllowCommentsReporting]: DEFAULT_ALLOW_COMMENT_REPORTING,
  [GeneralSettingsKeys.MaxCommentLength]: DEFAULT_MAX_COMMENT_LENGTH_SETTING,
};

// app mode setting
export const DEFAULT_APP_MODE_SETTINGS: AppModeSettings = {
  [AppModeSettingsKeys.Mode]: DEFAULT_APP_MODE,
};

// app mode setting
export const DEFAULT_DATA_FILE_LIST_SETTINGS: DataFileListSettings = {
  [DataFileListSettingsKeys.Files]: [],
};

// chatbot prompt setting
export const DEFAULT_CHATBOT_PROMPT_SETTINGS: ChatbotPromptSettings = {
  [ChatbotPromptSettingsKeys.InitialPrompt]: [] as ChatCompletionMessage[],
  [ChatbotPromptSettingsKeys.ChatbotPrompt]: '',
};
