import React, {
  ForwardRefRenderFunction,
  PropsWithChildren,
  forwardRef,
} from 'react';

import { Button } from '@mui/material';

type Props = {
  dataCy?: string;
  onClick: () => void;
  disabled?: boolean;
};

const ToolbarButton: ForwardRefRenderFunction<
  HTMLButtonElement,
  PropsWithChildren<Props>
> = (props, ref) => {
  // structure the custom props from the other ones given by the tooltip
  const { dataCy, onClick, disabled, ...otherProps } = props;
  return (
    <Button
      ref={ref}
      {...otherProps}
      data-cy={dataCy}
      disabled={disabled}
      sx={{
        p: 1,
        // ensure that buttons stay as small as possible
        // MuiButton has a min-width of 64px by default
        minWidth: '0px',
      }}
      variant="outlined"
      size="medium"
      color="primary"
      onClick={onClick}
    />
  );
};

export default forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  ToolbarButton,
);
