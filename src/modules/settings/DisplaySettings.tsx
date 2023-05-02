import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Divider, Stack, TextField, Typography } from '@mui/material';

import {
  ALLOW_REPLIES_SWITCH_CYPRESS,
  SETTING_MAX_COMMENT_LENGTH,
} from '@/config/selectors';
import { GeneralSettings, GeneralSettingsKeys } from '@/interfaces/settings';
import SettingsSwitch from '@/modules/settings/SettingsSwitch';

type Props = {
  localSettings: GeneralSettings;
  changeSetting: (settingKey: string, newValue: string | boolean) => void;
};

const DisplaySettings: FC<Props> = ({ localSettings, changeSetting }) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Typography variant="subtitle2">
        {t('Define Interaction Mode')}
      </Typography>

      <SettingsSwitch
        settingKey={GeneralSettingsKeys.AllowReplies}
        value={localSettings[GeneralSettingsKeys.AllowReplies]}
        label={t('Allow Replies')}
        dataCy={ALLOW_REPLIES_SWITCH_CYPRESS}
        changeSetting={changeSetting}
      />

      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2">{t('Maximum comment length')}</Typography>
      <TextField id={SETTING_MAX_COMMENT_LENGTH} type="number" />
    </Stack>
  );
};
export default DisplaySettings;
