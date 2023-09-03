import React, { ReactElement, createContext } from 'react';

import { UseQueryResult } from '@tanstack/react-query';

import { Token } from '../types';

const TokenContext = createContext<string>('');

interface WithTokenContextProps {
  children: ReactElement | (ReactElement | false | null)[];
  useAuthToken: (itemId: string) => UseQueryResult<Token, unknown>;
  LoadingComponent?: JSX.Element;
  onError?: (error: unknown) => void;
}

const WithTokenContext = ({
  children,
  LoadingComponent,
  onError,
  useAuthToken,
}: WithTokenContextProps): JSX.Element => {
  const itemId =
    new URL(window.location.toString()).searchParams.get('itemId') || '';

  if (!itemId) {
    const error = 'ItemId not found in querystring parameters';
    if (onError) {
      onError(error);
    } else {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  const { data: token, isLoading, isError, error } = useAuthToken(itemId);

  if (token) {
    return (
      <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
    );
  }

  if (isLoading) {
    return LoadingComponent ?? <div>loading...</div>;
  }

  if (isError) {
    if (onError) {
      onError(error);
    } else {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
  return <div>Whoops something went wrong...</div>;
};

/**
 * @deprecated
 */
interface Props {
  useAuthToken: (itemId: string) => UseQueryResult<Token, unknown>;
  LoadingComponent?: JSX.Element;
  onError?: (error: unknown) => void;
}

/**
 * @deprecated use `WithTokenContext` instead
 */
const withToken = <P extends object>(
  Component: React.ComponentType<P>,
  props: Props,
): ((childProps: P) => JSX.Element) => {
  const WithTokenComponent = (childProps: P): JSX.Element => {
    const { LoadingComponent, onError, useAuthToken } = props;

    const itemId =
      new URL(window.location.toString()).searchParams.get('itemId') || '';

    if (!itemId) {
      const error = 'ItemId not found in querystring parameters';
      if (onError) {
        onError(error);
      } else {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    const { data: token, isLoading, isError, error } = useAuthToken(itemId);

    if (token) {
      return (
        <TokenContext.Provider value={token}>
          <Component {...childProps} />
        </TokenContext.Provider>
      );
    }

    if (isLoading) {
      return LoadingComponent ?? <div>loading...</div>;
    }

    if (isError) {
      if (onError) {
        onError(error);
      } else {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    return <div>Whoops something went wrong...</div>;
  };
  return WithTokenComponent;
};
export { TokenContext, WithTokenContext, withToken };
