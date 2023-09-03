import createRoutine from './utils';

export const getAppDataRoutine = createRoutine('GET_APP_DATA');
export const postAppDataRoutine = createRoutine('POST_APP_DATA');
export const patchAppDataRoutine = createRoutine('PATCH_APP_DATA');
export const deleteAppDataRoutine = createRoutine('DELETE_APP_DATA');

export const uploadAppDataFileRoutine = createRoutine('UPLOAD_FILE');
export const downloadFileRoutine = createRoutine('DOWNLOAD_FILE');
