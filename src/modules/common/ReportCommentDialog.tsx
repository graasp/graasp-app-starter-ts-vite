import React, { FC, RefObject, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack, TextField, Typography } from '@mui/material';

import { Button } from '@graasp/ui';

import CustomDialog from '../layout/CustomDialog';

type Props = {
  commentRef: RefObject<HTMLElement | undefined>;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSendReport: (reason: string) => void;
};

const ReportCommentDialog: FC<Props> = ({
  commentRef,
  open,
  setOpen,
  onSendReport,
}) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState('');

  const reasonInputControl = (
    <TextField
      fullWidth
      placeholder={`${t('Reason')}…`}
      onChange={(e) => setReason(e.target.value)}
      value={reason}
    />
  );

  return (
    <CustomDialog
      open={open}
      title={t('Report a comment')}
      content={
        <Stack direction="column" spacing={1}>
          <Typography variant="body1">
            {t('Please provide below the reason for reporting this comment')}
          </Typography>
          {reasonInputControl}
        </Stack>
      }
      onClose={() => {
        setOpen(false);
      }}
      actions={
        <>
          <Button
            color="error"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            {t('Cancel')}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              // send the report with the reason
              onSendReport(reason);
              // close dialog
              setOpen(false);
            }}
          >
            {t('Report')}
          </Button>
        </>
      }
      anchor={commentRef}
    />
  );
};

export default ReportCommentDialog;
