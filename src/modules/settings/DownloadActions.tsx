import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CloudDownload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { saveAs } from 'file-saver';

import { hooks } from '@/config/queryClient';
import { DOWNLOAD_ACTIONS_BUTTON_CY } from '@/config/selectors';

const DownloadActions: FC = () => {
  const { t } = useTranslation();
  const [actionsRequested, setActionsRequested] = useState(false);

  const { refetch } = hooks.useAppActions({ enabled: false });

  useEffect(
    () => {
      if (actionsRequested) {
        // fetch actions
        refetch().then(({ data }) => {
          const actions = data;
          const dataBlob = new Blob([JSON.stringify(actions?.toJS())] || [], {
            type: 'text/plain;charset=utf-8',
          });
          const fileName = `${new Date().toISOString()}_app_actions.json`;
          saveAs(dataBlob, fileName);
        });
        setActionsRequested(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actionsRequested],
  );

  return (
    <LoadingButton
      data-cy={DOWNLOAD_ACTIONS_BUTTON_CY}
      onClick={() => setActionsRequested(true)}
      loading={actionsRequested}
      startIcon={<CloudDownload />}
    >
      {actionsRequested ? t('Downloading') : t('Download Actions')}
    </LoadingButton>
  );
};
export default DownloadActions;
