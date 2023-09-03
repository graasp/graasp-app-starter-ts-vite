import { ApiData, AppContext } from '../types';
import configureAxios from './axios';
import { buildGetContextRoute } from './routes';

const axios = configureAxios();

export const getContext = async (args: ApiData): Promise<AppContext> => {
  const { token, itemId, apiHost } = args;
  return axios
    .get(`${apiHost}/${buildGetContextRoute(itemId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
};
