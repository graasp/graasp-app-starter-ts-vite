import { AppSetting } from '@graasp/apps-query-client';

import { AppMode, DataFile } from '@/config/appSettingsTypes';

// general settings keys
export enum GeneralSettingsKeys {
  AllowReplies = 'allowReplies',
  AllowCommentsReporting = 'allowCommentReporting',
  MaxCommentLength = 'maxCommentLength',
}

// App Mode Setting keys
export enum AppModeSettingsKeys {
  Mode = 'mode',
}

// App Mode Setting keys
export enum DataFileListSettingsKeys {
  Files = 'files',
}

// Chatbot Prompt Setting keys
export enum ChatbotPromptSettingsKeys {
  InitialPrompt = 'initialPrompt',
  ChatbotPrompt = 'chatbotPrompt',
}

// type of general settings
export type GeneralSettings = {
  [GeneralSettingsKeys.AllowReplies]: boolean;
  [GeneralSettingsKeys.AllowCommentsReporting]: boolean;
  [GeneralSettingsKeys.MaxCommentLength]: number;

  // used to allow access using settings[settingKey] syntax
  [key: string]: unknown;
};

export type AppModeSettings = {
  [AppModeSettingsKeys.Mode]: AppMode;

  // used to allow access using settings[settingKey] syntax
  [key: string]: unknown;
};

export type DataFileListSettings = {
  [DataFileListSettingsKeys.Files]: DataFile[];

  // used to allow access using settings[settingKey] syntax
  [key: string]: unknown;
};

export type ChatCompletionMessageRoles = 'system' | 'user' | 'assistant';

export type ChatCompletionMessage = {
  role: ChatCompletionMessageRoles;
  content: string;
};

export type ChatbotPromptSettings = {
  [ChatbotPromptSettingsKeys.InitialPrompt]: ChatCompletionMessage[];
  [ChatbotPromptSettingsKeys.ChatbotPrompt]: string;

  // used to allow access using settings[settingKey] syntax
  [key: string]: unknown;
};
export type ChatbotPromptAppSettings = AppSetting & {
  data: ChatbotPromptSettings;
};
