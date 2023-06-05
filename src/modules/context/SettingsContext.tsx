import { FC, ReactElement, createContext, useContext } from 'react';

import { AppSetting } from '@graasp/apps-query-client';

import {
  APP_MODE_SETTINGS_NAME,
  CHATBOT_PROMPT_SETTINGS_NAME,
  GENERAL_SETTINGS_NAME,
} from '@/config/appSettingsTypes';
import { MUTATION_KEYS, hooks, useMutation } from '@/config/queryClient';
import {
  DEFAULT_APP_MODE_SETTINGS,
  DEFAULT_CHATBOT_PROMPT_SETTINGS,
  DEFAULT_GENERAL_SETTINGS,
} from '@/config/settings';
import {
  AppModeSettings,
  ChatbotPromptAppSettings,
  ChatbotPromptSettings,
  ChatbotPromptSettingsKeys,
  GeneralSettings,
} from '@/interfaces/settings';

import Loader from '../common/Loader';

// mapping between Setting names and their data type
interface AllSettingsType {
  [GENERAL_SETTINGS_NAME]?: GeneralSettings;
  [APP_MODE_SETTINGS_NAME]?: AppModeSettings;
  [CHATBOT_PROMPT_SETTINGS_NAME]?: ChatbotPromptSettings;
}

// default values for the data property of settings by name
const defaultSettingsValues: AllSettingsType = {
  [GENERAL_SETTINGS_NAME]: DEFAULT_GENERAL_SETTINGS,
  [APP_MODE_SETTINGS_NAME]: DEFAULT_APP_MODE_SETTINGS,
  [CHATBOT_PROMPT_SETTINGS_NAME]: DEFAULT_CHATBOT_PROMPT_SETTINGS,
};

// list of the settings names
const ALL_SETTING_NAMES = [
  GENERAL_SETTINGS_NAME,
  APP_MODE_SETTINGS_NAME,
  CHATBOT_PROMPT_SETTINGS_NAME,
] as const;

// automatically generated types
type AllSettingsNameType = (typeof ALL_SETTING_NAMES)[number];
type AllSettingsDataType = AllSettingsType[keyof AllSettingsType];

export type SettingsContextType = AllSettingsType & {
  chatbotPrompt: ChatbotPromptAppSettings;
  saveSettings: (
    name: AllSettingsNameType,
    newValue: AllSettingsDataType,
  ) => void;
};

const defaultContextValue = {
  ...defaultSettingsValues,
  chatbotPrompt: {
    data: {
      [ChatbotPromptSettingsKeys.InitialPrompt]: [{}],
      [ChatbotPromptSettingsKeys.ChatbotPrompt]: '',
    },
  } as ChatbotPromptAppSettings,
  saveSettings: () => null,
};

const SettingsContext = createContext<SettingsContextType>(defaultContextValue);

type Prop = {
  children: ReactElement | ReactElement[];
};

export const SettingsProvider: FC<Prop> = ({ children }) => {
  const { mutate: postAppSetting } = useMutation<
    unknown,
    unknown,
    Partial<AppSetting>
  >(MUTATION_KEYS.POST_APP_SETTING);
  const { mutate: patchAppSetting } = useMutation<
    unknown,
    unknown,
    Partial<AppSetting>
  >(MUTATION_KEYS.PATCH_APP_SETTING);
  const {
    data: appSettingsList,
    isLoading,
    isSuccess,
  } = hooks.useAppSettings();

  const saveSettings = (
    name: AllSettingsNameType,
    newValue: AllSettingsDataType,
  ): void => {
    if (appSettingsList) {
      const previousSetting = appSettingsList.find((s) => s.name === name);
      // setting does not exist
      if (!previousSetting) {
        postAppSetting({
          data: newValue,
          name,
        });
      } else {
        patchAppSetting({
          id: previousSetting.id,
          data: newValue,
        });
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const getContextValue = (): SettingsContextType => {
    if (isSuccess) {
      const allSettings: AllSettingsType = ALL_SETTING_NAMES.reduce(
        <T extends AllSettingsNameType>(acc: AllSettingsType, key: T) => {
          const setting = appSettingsList.find((s) => s.name === key);
          const settingData = setting?.data;
          acc[key] = settingData as AllSettingsType[T];
          return acc;
        },
        {},
      );

      const chatbotPrompt = (appSettingsList.find(
        (s) => s.name === CHATBOT_PROMPT_SETTINGS_NAME,
      ) as ChatbotPromptAppSettings) || {
        data: DEFAULT_CHATBOT_PROMPT_SETTINGS,
      };

      return {
        ...allSettings,
        chatbotPrompt,
        saveSettings,
      };
    }
    return defaultContextValue;
  };

  const contextValue = getContextValue();

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType =>
  useContext<SettingsContextType>(SettingsContext);
