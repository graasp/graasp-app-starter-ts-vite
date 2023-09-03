import React, { ReactElement, createContext, useContext } from 'react';

import { Context, PermissionLevel, convertJs } from '@graasp/sdk';

import { UseQueryResult } from '@tanstack/react-query';

import { LocalContext, LocalContextRecord } from '../types';
import { AutoResizer } from './AutoResizer';

const defaultContextValue: LocalContext = {
  apiHost: '',
  itemId: '',
  memberId: '',
  settings: {},
  dev: false,
  offline: false,
  lang: 'en',
  context: Context.Builder,
  standalone: false,
  permission: PermissionLevel.Read,
};

const LocalContextContext = createContext<LocalContextRecord>(
  convertJs(defaultContextValue),
);

interface WithLocalContextProps {
  children: ReactElement;
  useGetLocalContext: (
    itemId: string,
    defaultValue: LocalContext,
  ) => UseQueryResult<LocalContextRecord, unknown>;
  LoadingComponent?: React.ReactElement;
  defaultValue: LocalContext;
  onError?: (error: unknown) => void;
  useAutoResize?: (itemId: string) => void;
}

const WithLocalContext = ({
  LoadingComponent,
  defaultValue,
  useGetLocalContext,
  onError,
  useAutoResize,
  children,
}: WithLocalContextProps): JSX.Element => {
  const itemId =
    new URL(window.location.toString()).searchParams.get('itemId') || '';
  const {
    data: context,
    isLoading,
    isError,
    error,
  } = useGetLocalContext(itemId, defaultValue);
  if (context) {
    return (
      <LocalContextContext.Provider value={context}>
        {useAutoResize ? (
          <AutoResizer itemId={itemId} useAutoResize={useAutoResize}>
            {children}
          </AutoResizer>
        ) : (
          children
        )}
      </LocalContextContext.Provider>
    );
  }

  if (isLoading) {
    return LoadingComponent ?? <div>Loading LocalContext...</div>;
  }

  if (isError) {
    if (onError) {
      onError(error);
    } else {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
  return (
    <div>
      Could not get `LocalContext`. Check if you have mocking enabled, or if you
      are running in an iframe, that the parent window replies to your messages
    </div>
  );
};

// **********************************************************************
//
// Do NOT use/change/update what is bellow here, it will be removed soon.
//
// **********************************************************************

/**
 * @deprecated
 */
interface Props {
  useGetLocalContext: (
    itemId: string,
    defaultValue: LocalContext,
  ) => UseQueryResult<LocalContextRecord, unknown>;
  LoadingComponent?: React.ReactElement;
  defaultValue: LocalContext;
  onError?: (error: unknown) => void;
  useAutoResize?: (itemId: string) => void;
}

/**
 * @deprecated use `WithLocalContext` instead
 */
const withContext = <P extends object>(
  Component: React.ComponentType<P>,
  props: Props,
): ((childProps: P) => JSX.Element) => {
  const WithContextComponent = (childProps: P): JSX.Element => {
    const {
      LoadingComponent,
      defaultValue,
      useGetLocalContext,
      onError,
      useAutoResize,
    } = props;

    const itemId =
      new URL(window.location.toString()).searchParams.get('itemId') || '';
    const {
      data: context,
      isLoading,
      isError,
      error,
    } = useGetLocalContext(itemId, defaultValue);
    if (context) {
      const children = <Component {...childProps} />;

      return (
        <LocalContextContext.Provider value={context}>
          {useAutoResize ? (
            <AutoResizer itemId={itemId} useAutoResize={useAutoResize}>
              {children}
            </AutoResizer>
          ) : (
            children
          )}
        </LocalContextContext.Provider>
      );
    }

    if (isLoading) {
      return LoadingComponent ?? <div>Loading LocalContext...</div>;
    }

    if (isError) {
      if (onError) {
        onError(error);
      } else {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    return (
      <div>
        Could not get `LocalContext`. Check if you have mocking enabled, or if
        you are running in an iframe, that the parent window replies to your
        messages
      </div>
    );
  };
  return WithContextComponent;
};

const useLocalContext = (): LocalContextRecord =>
  useContext(LocalContextContext);

export { useLocalContext, WithLocalContext, withContext };
