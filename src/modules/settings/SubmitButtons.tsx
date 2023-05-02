import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button } from '@mui/material';

import {
  SETTINGS_DIALOG_CANCEL_BUTTON_CYPRESS,
  SETTINGS_DIALOG_SAVE_BUTTON_CYPRESS,
  settingKeyDataCy,
} from '@/config/selectors';

type Props = {
  settingKey: string;
  unsavedChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
};

const SubmitButtons: FC<Props> = ({
  settingKey,
  unsavedChanges,
  onSave,
  onCancel,
}) => {
  const { t } = useTranslation();
  return (
    <Box id={settingKeyDataCy(settingKey)}>
      <Button
        sx={{ m: 1 }}
        data-cy={SETTINGS_DIALOG_CANCEL_BUTTON_CYPRESS}
        onClick={onCancel}
        color="error"
        variant="outlined"
      >
        {t('Cancel')}
      </Button>
      <Button
        sx={{ m: 1 }}
        data-cy={SETTINGS_DIALOG_SAVE_BUTTON_CYPRESS}
        onClick={onSave}
        disabled={!unsavedChanges}
        variant="outlined"
      >
        {unsavedChanges ? t('Save') : t('Saved')}
      </Button>
    </Box>
  );
};
export default SubmitButtons;
