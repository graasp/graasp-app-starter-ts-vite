export const GENERAL_SETTINGS_NAME = 'GENERAL_SETTINGS';
export const CODE_EXECUTION_SETTINGS_NAME = 'CODE_EXECUTION_SETTINGS';
export const CHATBOT_PROMPT_SETTINGS_NAME = 'CHATBOT_PROMPT_SETTINGS';
export const DIFF_VIEW_SETTINGS_NAME = 'DIFF_VIEW_SETTINGS';
export const APP_MODE_SETTINGS_NAME = 'APP_MODE_SETTINGS';
export const DATA_FILE_LIST_SETTINGS_NAME = 'DATA_FILE_LIST_SETTINGS';
export const INSTRUCTOR_CODE_VERSION_SETTINGS_NAME = 'INSTRUCTOR_CODE_VERSION';
export const DATA_FILE_SETTINGS_NAME = 'DATA_FILE_SETTING';

export enum CodeEditorSubmitTarget {
  Settings,
  Code,
}

export enum AppMode {
  Execute = 'Execute',
  Review = 'Review',
  Collaborate = 'Collaborate',
  Explain = 'Explain',
}

export type DataFile = {
  appSettingId: string;
  fileName: string;
  virtualPath: string;
};
