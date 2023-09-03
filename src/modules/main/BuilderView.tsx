import { Box, Button, Stack, Typography } from '@mui/material';

import { BUILDER_VIEW_CY } from '@/config/selectors';
import { useLocalContext } from '@/query-client';

import { useAppDataContext } from '../context/AppDataContext';

const BuilderView = (): JSX.Element => {
  const { permission } = useLocalContext();
  const { postAppData, deleteAppData, patchAppData, appData } =
    useAppDataContext();
  return (
    <div data-cy={BUILDER_VIEW_CY}>
      Builder as {permission}
      <Stack direction="column" spacing={2}>
        <Stack direction="row" justifyContent="center" spacing={1}>
          <Button
            variant="outlined"
            onClick={() =>
              postAppData({ data: { content: 'hello' }, type: 'a-type' })
            }
          >
            Post new App Data
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              const data = appData.last();
              patchAppData({
                id: data?.id || '',
                data: { content: `${data?.data.content}-` },
              });
            }}
          >
            Patch last App Data
          </Button>
          <Button
            variant="outlined"
            onClick={() => deleteAppData({ id: appData.last()?.id || '' })}
          >
            Delete last App Data
          </Button>
        </Stack>
        <Box p={2}>
          <Typography>App Data</Typography>
          <pre>{JSON.stringify(appData.toJS(), null, 2)}</pre>
        </Box>
      </Stack>
    </div>
  );
};
export default BuilderView;
