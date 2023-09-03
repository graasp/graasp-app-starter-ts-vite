import { ReactNode } from 'react';

interface AutoResizerProps {
  useAutoResize: (itemId: string) => void;
  itemId: string;
  children?: ReactNode | ReactNode[];
}

export const AutoResizer = ({
  useAutoResize,
  itemId,
  children,
}: AutoResizerProps): JSX.Element => {
  useAutoResize(itemId);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
