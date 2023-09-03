import { AppData, UUID } from '@graasp/sdk';

import { ApiData } from '../types';
import configureAxios from './axios';
import {
  buildDeleteAppDataRoute,
  buildDownloadAppDataFileRoute,
  buildGetAppDataRoute,
  buildPatchAppDataRoute,
  buildPostAppDataRoute,
} from './routes';

const axios = configureAxios();

export const getAppData = async (args: ApiData): Promise<AppData[]> => {
  const { token, itemId, apiHost } = args;
  return axios
    .get(`${apiHost}/${buildGetAppDataRoute(itemId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
};

export const postAppData = (
  args: ApiData & {
    body: unknown;
  },
): Promise<AppData> => {
  const { token, itemId, apiHost, body } = args;
  return axios
    .post(`${apiHost}/${buildPostAppDataRoute({ itemId })}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
};

export const patchAppData = (
  args: ApiData & Partial<AppData> & { id: UUID },
): Promise<AppData> => {
  const { token, itemId, id, apiHost, data } = args;
  return axios
    .patch(
      `${apiHost}/${buildPatchAppDataRoute({ itemId, id })}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(({ data: newData }) => newData);
};

export const deleteAppData = (
  args: ApiData & {
    id: string;
  },
): Promise<AppData> => {
  const { token, itemId, id, apiHost } = args;
  return axios
    .delete(`${apiHost}/${buildDeleteAppDataRoute({ itemId, id })}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
};

// todo: add return type of file
// because of the bearer token, it triggers an error on s3 on redirect because the request has two auth methods
// https://github.com/axios/axios/issues/2855
// https://stackoverflow.com/questions/50861144/reactjs-remove-http-header-before-redirect/51252434#51252434
// so we removed automatic redirection for this endpoint
export const getAppDataFile = async ({
  id,
  apiHost,
  token,
}: {
  id: string;
  apiHost: string;
  token: string;
}): Promise<Blob> => {
  const url = await axios
    .get(`${apiHost}/${buildDownloadAppDataFileRoute(id)}`, {
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
