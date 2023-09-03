import { AppSetting } from '@graasp/sdk';

import { ApiData } from '../types';
import configureAxios from './axios';
import {
  buildDeleteAppSettingRoute,
  buildDownloadAppSettingFileRoute,
  buildGetAppSettingsRoute,
  buildPatchAppSettingRoute,
  buildPostAppSettingRoute,
} from './routes';

const axios = configureAxios();

export const getAppSettings = async (args: ApiData): Promise<AppSetting[]> => {
  const { token, itemId, apiHost } = args;
  return axios
    .get(`${apiHost}/${buildGetAppSettingsRoute(itemId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
};

export const postAppSetting = (
  args: ApiData & {
    body: unknown;
  },
): Promise<AppSetting> => {
  const { token, itemId, apiHost, body } = args;
  return axios
    .post(`${apiHost}/${buildPostAppSettingRoute({ itemId })}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
};

export const patchAppSetting = (
  args: ApiData & {
    id: string;
    data: unknown;
  },
): Promise<AppSetting> => {
  const { token, itemId, id, apiHost, data } = args;
  return axios
    .patch(
      `${apiHost}/${buildPatchAppSettingRoute({ itemId, id })}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(({ data: newData }) => newData);
};

export const deleteAppSetting = (
  args: ApiData & {
    id: string;
  },
): Promise<AppSetting> => {
  const { token, itemId, id, apiHost } = args;
  return axios
    .delete(`${apiHost}/${buildDeleteAppSettingRoute({ itemId, id })}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
};

// todo: add return type for file
// todo: add public route
// because of the bearer token, it triggers an error on s3 on redirect because the request has two auth methods
// https://github.com/axios/axios/issues/2855
// https://stackoverflow.com/questions/50861144/reactjs-remove-http-header-before-redirect/51252434#51252434
// so we removed automatic redirection for this endpoint
export const getAppSettingFileContent = async ({
  id,
  apiHost,
  token,
}: {
  id: string;
  apiHost: string;
  token: string;
}): Promise<Blob> => {
  const url = await axios
    .get(`${apiHost}/${buildDownloadAppSettingFileRoute(id)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
  return axios
    .get(url, {
      responseType: 'blob',
      withCredentials: false,
    })
    .then(({ data }) => data);
};
