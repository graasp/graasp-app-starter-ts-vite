import { parseStringToDate } from '@graasp/sdk';

// todo: remove
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const configureAxios = (): typeof axios => {
  axios.defaults.withCredentials = true;

  axios.defaults.transformResponse = [
    (data) => {
      try {
        const content = JSON.parse(data);
        return parseStringToDate(content);
      } catch (e) {
        // the data was a normal string and we return it
        return data;
      }
    },
  ];

  return axios;
};

export default configureAxios;
