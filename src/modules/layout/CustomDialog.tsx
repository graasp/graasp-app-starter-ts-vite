import React, { FC, MutableRefObject, ReactElement, RefObject } from 'react';

import {
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from '@mui/material';

import {
  CUSTOM_DIALOG_ACTIONS_CYPRESS,
  CUSTOM_DIALOG_CONTENT_CY,
  CUSTOM_DIALOG_TITLE_CYPRESS,
} from '@/config/selectors';

type RefType =
  | null
  | MutableRefObject<HTMLElement | undefined>
  | RefObject<HTMLElement | undefined>;

const getPlacedModalStyle = (
  anchor: RefType,
): { [key: string]: string | number } => {
  if (anchor?.current) {
    const { top = 0 } = anchor.current.getBoundingClientRect();
    return {
      position: 'fixed',
      top: top - 50,
    };
  }
  return {};
};

const StyledDialogTitle = styled(DialogTitle)({});

type Props = {
  open: boolean;
  title: string | ReactElement;
  content: ReactElement | string;
  actions?: ReactElement;
  onClose?: () => void;
  dataCy?: string;
  keepMounted?: boolean;
  fullScreen?: boolean;
  maxWidth?: Breakpoint;
  noPadding?: boolean;
  anchor?: RefType;
};

const CustomDialog: FC<Props> = ({
  open,
  title,
  content,
  actions,
  onClose,
  dataCy,
  keepMounted = true,
  fullScreen = false,
  maxWidth = 'sm',
  noPadding = false,
  anchor = null,
}) => (
  <Dialog
    keepMounted={keepMounted}
    data-cy={dataCy}
    fullWidth
    fullScreen={fullScreen}
    maxWidth={maxWidth}
    open={open}
    onClose={onClose}
    PaperProps={anchor ? { style: getPlacedModalStyle(anchor) } : {}}
  >
    <StyledDialogTitle data-cy={CUSTOM_DIALOG_TITLE_CYPRESS}>
      {title}
    </StyledDialogTitle>
    <DialogContent
      data-cy={CUSTOM_DIALOG_CONTENT_CY}
      sx={noPadding ? { py: 0 } : {}}
    >
      {content}
    </DialogContent>
    <DialogActions data-cy={CUSTOM_DIALOG_ACTIONS_CYPRESS}>
      {actions}
    </DialogActions>
  </Dialog>
);

export default CustomDialog;
