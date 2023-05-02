import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type LoadingIndicatorType = {
  startLoading: () => void;
  stopLoading: () => void;
  isLoading: boolean;
};
const defaultContextValue: LoadingIndicatorType = {
  startLoading: () => null,
  stopLoading: () => null,
  isLoading: false,
};
const LoadingIndicatorContext =
  createContext<LoadingIndicatorType>(defaultContextValue);

const LoadingIndicatorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const context: LoadingIndicatorType = useMemo(
    () => ({
      startLoading: () => setIsLoading(true),
      stopLoading: () => setIsLoading(false),
      isLoading,
    }),
    [isLoading],
  );
  return (
    <LoadingIndicatorContext.Provider value={context}>
      {children}
    </LoadingIndicatorContext.Provider>
  );
};

export default LoadingIndicatorProvider;

export const useLoadingIndicator = (): LoadingIndicatorType =>
  useContext(LoadingIndicatorContext);
