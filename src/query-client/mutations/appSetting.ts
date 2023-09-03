import { AppSetting, convertJs } from '@graasp/sdk';
import { AppSettingRecord } from '@graasp/sdk/frontend';

import { QueryClient, useMutation } from '@tanstack/react-query';
import { List } from 'immutable';

import * as Api from '../api';
import { MUTATION_KEYS, buildAppSettingsKey } from '../config/keys';
import { getApiHost, getData, getDataOrThrow } from '../config/utils';
import {
  deleteAppSettingRoutine,
  patchAppSettingRoutine,
  postAppSettingRoutine,
  uploadAppSettingFileRoutine,
} from '../routines';
import { QueryClientConfig } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (queryClient: QueryClient, queryConfig: QueryClientConfig) => {
  const { notifier } = queryConfig;

  queryClient.setMutationDefaults(MUTATION_KEYS.POST_APP_SETTING, {
    mutationFn: (payload: Partial<AppSetting>) => {
      const apiHost = getApiHost(queryClient);
      const data = getDataOrThrow(queryClient);
      return Api.postAppSetting({ ...data, body: payload, apiHost });
    },
    onSuccess: (newData: AppSetting) => {
      const { itemId } = getData(queryClient);
      const key = buildAppSettingsKey(itemId);
      const prevData = queryClient.getQueryData<List<AppSettingRecord>>(key);
      queryClient.setQueryData(key, prevData?.push(convertJs(newData)));
      queryConfig?.notifier?.({
        type: postAppSettingRoutine.SUCCESS,
        payload: newData,
      });
    },
    onError: (error) => {
      queryConfig?.notifier?.({
        type: postAppSettingRoutine.FAILURE,
        payload: { error },
      });
    },
    onSettled: () => {
      const { itemId } = getData(queryClient);
      queryClient.invalidateQueries(buildAppSettingsKey(itemId));
    },
  });

  queryClient.setMutationDefaults(MUTATION_KEYS.PATCH_APP_SETTING, {
    mutationFn: (payload: Partial<AppSetting> & { id: string }) => {
      const apiHost = getApiHost(queryClient);
      const data = getDataOrThrow(queryClient);
      return Api.patchAppSetting({
        ...data,
        id: payload.id,
        data: payload.data,
        apiHost,
      });
    },
    onMutate: async (payload) => {
      let context = null;
      const { itemId } = getData(queryClient);
      const prevData = queryClient.getQueryData<List<AppSettingRecord>>(
        buildAppSettingsKey(itemId),
      );
      if (itemId && prevData) {
        const newData = prevData.map((appData) =>
          appData.id === payload.id
            ? appData.merge(convertJs(payload))
            : appData,
        );
        queryClient.setQueryData(buildAppSettingsKey(itemId), newData);
        context = prevData;
      }
      return context;
    },
    onSuccess: (newData) => {
      queryConfig?.notifier?.({
        type: postAppSettingRoutine.SUCCESS,
        payload: newData,
      });
    },
    onError: (error, _payload, prevData) => {
      queryConfig?.notifier?.({
        type: patchAppSettingRoutine.FAILURE,
        payload: { error },
      });

      if (prevData) {
        const { itemId } = getData(queryClient);
        const data = queryClient.getQueryData<List<AppSettingRecord>>(
          buildAppSettingsKey(itemId),
        );
        if (itemId && data) {
          queryClient.setQueryData(buildAppSettingsKey(itemId), prevData);
        }
      }
    },
    onSettled: () => {
      const data = getData(queryClient);
      queryClient.invalidateQueries(buildAppSettingsKey(data?.itemId));
    },
  });

  queryClient.setMutationDefaults(MUTATION_KEYS.DELETE_APP_SETTING, {
    mutationFn: (payload: { id: string }) => {
      const apiHost = getApiHost(queryClient);
      const data = getDataOrThrow(queryClient);
      return Api.deleteAppSetting({ ...data, id: payload.id, apiHost });
    },
    onMutate: async (payload) => {
      const { itemId } = getDataOrThrow(queryClient);
      const prevData = queryClient.getQueryData<List<AppSettingRecord>>(
        buildAppSettingsKey(itemId),
      );
      if (prevData && itemId) {
        queryClient.setQueryData(
          buildAppSettingsKey(itemId),
          prevData?.filter(({ id: appDataId }) => appDataId !== payload.id),
        );
      }
      return prevData;
    },
    onSuccess: (prevData) => {
      queryConfig?.notifier?.({
        type: deleteAppSettingRoutine.SUCCESS,
        payload: prevData,
      });
    },
    onError: (error, _payload, prevData) => {
      queryConfig?.notifier?.({
        type: deleteAppSettingRoutine.FAILURE,
        payload: { error },
      });

      if (prevData) {
        const { itemId } = getData(queryClient);
        const data = queryClient.getQueryData<List<AppSettingRecord>>(
          buildAppSettingsKey(itemId),
        );
        if (itemId && data) {
          queryClient.setQueryData(buildAppSettingsKey(itemId), prevData);
        }
      }
    },
    onSettled: () => {
      const { itemId } = getData(queryClient);
      if (itemId) {
        queryClient.invalidateQueries(buildAppSettingsKey(itemId));
      }
    },
  });

  // this mutation is used for its callback and invalidate the keys
  /**
   * @param {UUID} id parent item id wher the file is uploaded in
   * @param {error} [error] error occured during the file uploading
   */
  queryClient.setMutationDefaults(MUTATION_KEYS.APP_SETTING_FILE_UPLOAD, {
    mutationFn: async ({ error }) => {
      if (error) throw new Error(JSON.stringify(error));
    },
    onSuccess: (_result, { data, error }) => {
      if (error) {
        throw error;
      } else {
        notifier?.({
          type: uploadAppSettingFileRoutine.SUCCESS,
          payload: { data },
        });
      }
    },
    onError: (_error, { error }) => {
      notifier?.({
        type: uploadAppSettingFileRoutine.FAILURE,
        payload: { error },
      });
    },
    onSettled: () => {
      const { itemId } = getData(queryClient);
      if (itemId) {
        queryClient.invalidateQueries(buildAppSettingsKey(itemId));
      }
    },
  });

  return {
    usePostAppSetting: () =>
      useMutation<AppSetting, unknown, Partial<AppSetting>>(
        MUTATION_KEYS.POST_APP_SETTING,
      ),
    usePatchAppSetting: () =>
      useMutation<AppSetting, unknown, Partial<AppSetting> & { id: string }>(
        MUTATION_KEYS.PATCH_APP_SETTING,
      ),
    useDeleteAppSetting: () =>
      useMutation<AppSetting, unknown, { id: string }>(
        MUTATION_KEYS.DELETE_APP_SETTING,
      ),
    useUploadAppSettingFile: () =>
      useMutation<unknown, unknown, { data?: unknown; error?: unknown }>(
        MUTATION_KEYS.APP_SETTING_FILE_UPLOAD,
      ),
  };
};
