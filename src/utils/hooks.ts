import React from 'react';

export type UpdateArgument<T extends object> =
  | T
  | ((previousArg: T) => Partial<T>);

/* istanbul ignore next */
export function useObjectState<T extends object>(
  initialValue: T,
): [T, (arg: UpdateArgument<T>) => void] {
  const [state, setState] = React.useState(initialValue);

  const handleUpdate = React.useCallback((arg: UpdateArgument<T>) => {
    if (typeof arg === 'function') {
      setState((s) => {
        const newState = arg(s);

        return {
          ...s,
          ...newState,
        };
      });
    }

    if (typeof arg === 'object') {
      setState((s) => ({
        ...s,
        ...arg,
      }));
    }
  }, []);

  return [state, handleUpdate];
}
