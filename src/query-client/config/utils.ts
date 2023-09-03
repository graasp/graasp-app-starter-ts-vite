import { QueryClient } from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StatusCodes } from 'http-status-codes';
import { Record } from 'immutable';

import { LocalContext, LocalContextRecord, QueryClientConfig } from '../types';
import {
  MissingAppKeyError,
  MissingAppOriginError,
  MissingNecessaryDataError,
} from './errors';
import { AUTH_TOKEN_KEY, LOCAL_CONTEXT_KEY } from './keys';

export class MissingApiHostError extends Error {
  statusCode: number;

  constructor() {
    super(
      'Api Host is not defined. Do You have it in your .env ? Did you set up the context with useContext?',
    );
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export const getApiHost = (queryClient: QueryClient): string => {
  const context =
    queryClient.getQueryData<LocalContextRecord>(LOCAL_CONTEXT_KEY);
  const apiHost = context?.apiHost;
  if (!apiHost) {
    throw new MissingApiHostError();
  }
  return apiHost;
};

export const getData = (
  queryClient: QueryClient,
  options: { shouldMemberExist?: boolean } = {},
): { itemId: string; memberId?: string; token: string } => {
  const data =
    queryClient.getQueryData<Record<LocalContext>>(LOCAL_CONTEXT_KEY);
  if (!data) {
    throw new Error('`LocalContext` was undefined');
  }
  const token = queryClient.getQueryData<string>(AUTH_TOKEN_KEY);
  if (!token) {
    throw new MissingNecessaryDataError({ token });
  }
  const itemId = data.get('itemId');
  const memberId = data.get('memberId');

  if (options.shouldMemberExist ?? true) {
    if (!memberId) {
      // eslint-disable-next-line no-console
      console.debug('member id is not defined');
    }
  }
  if (!itemId) {
    // eslint-disable-next-line no-console
    console.error('item id is not defined');
  }
  if (!token) {
    // eslint-disable-next-line no-console
    console.error('token is not defined');
  }

  return { itemId, memberId, token };
};

export const getDataOrThrow = (
  queryClient: QueryClient,
  options: { shouldMemberExist?: boolean } = {},
): { itemId: string; memberId?: string; token: string } => {
  const { itemId, token, memberId } = getData(queryClient);
  if (!itemId || !token) {
    throw new MissingNecessaryDataError({ itemId, token });
  }
  if (options.shouldMemberExist ?? true) {
    if (!memberId) {
      throw new MissingNecessaryDataError({ itemId, token, memberId });
    }
  }
  return { itemId, token, memberId };
};

export const buildAppKeyAndOriginPayload = (
  queryConfig: QueryClientConfig,
): { key: string; origin: string } => {
  const key = queryConfig.GRAASP_APP_KEY;
  const origin = window?.location?.origin;

  if (!key) {
    throw new MissingAppKeyError();
  }
  if (!origin) {
    throw new MissingAppOriginError();
  }

  return { key, origin };
};
