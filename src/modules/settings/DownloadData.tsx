import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CloudDownload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { saveAs } from 'file-saver';

import { hooks } from '@/config/queryClient';
import { DOWNLOAD_DATA_BUTTON_CY } from '@/config/selectors';

const DownloadData: FC = () => {
  const { t } = useTranslation();
  const [dataRequested, setDataRequested] = useState(false);

  const { refetch } = hooks.useAppData();

  useEffect(
    () => {
      if (dataRequested) {
        // fetch data
        refetch().then(({ data }) => {
          const appData = data;
          const appDataBlob = new Blob(
            [JSON.stringify(appData?.toJS())] || [],
            {
              type: 'text/plain;charset=utf-8',
            },
          );
          const fileName = `${new Date().toISOString()}_app_data.json`;
          saveAs(appDataBlob, fileName);
        });
        setDataRequested(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataRequested],
  );

  return (
    <LoadingButton
      data-cy={DOWNLOAD_DATA_BUTTON_CY}
      onClick={() => setDataRequested(true)}
      loading={dataRequested}
      startIcon={<CloudDownload />}
    >
      {dataRequested ? t('Downloading') : t('Download Data')}
    </LoadingButton>
  );
};
export default DownloadData;
