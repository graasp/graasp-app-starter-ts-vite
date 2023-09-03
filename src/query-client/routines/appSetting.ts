import createRoutine from './utils';

export const getAppSettingsRoutine = createRoutine('GET_APP_SETTINGS');
export const postAppSettingRoutine = createRoutine('POST_APP_SETTING');
export const patchAppSettingRoutine = createRoutine('PATCH_APP_SETTING');
export const deleteAppSettingRoutine = createRoutine('DELETE_APP_SETTING');
export const uploadAppSettingFileRoutine = createRoutine(
  'UPLOAD_APP_SETTING_FILE',
);
