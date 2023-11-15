import { Box, Button, Stack, Typography } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';

import { hooks, mutations } from '../../config/queryClient';

const AppSettingsDisplay = (): JSX.Element => {
  const { data: appSetting } = hooks.useAppSettings();
  return (
    <Box p={2}>
      <Typography>App Setting</Typography>
      {appSetting ? (
        <pre
          style={{
            width: '100%',
            maxWidth: '100%',
            // overflowWrap: 'anywhere',
            wordBreak: 'break-all',
            // fontSize: '10px',
          }}
        >
          {JSON.stringify(appSetting, null, 2)}
        </pre>
      ) : (
        <Typography>Loading</Typography>
      )}
    </Box>
  );
};

const BuilderView = (): JSX.Element => {
  const { permission } = useLocalContext();
  const { data: appData } = hooks.useAppData();
  const { mutate: postAppData } = mutations.usePostAppData();
  const { mutate: patchAppData } = mutations.usePatchAppData();
  const { mutate: deleteAppData } = mutations.useDeleteAppData();
  const { mutate: postAppSetting } = mutations.usePostAppSetting();

  return (
    <div>
      <Typography>Builder as {permission}</Typography>
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
            onClick={() =>
              postAppSetting({ data: { content: 'hello' }, name: 'setting' })
            }
          >
            Post new App Setting
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              const data = appData?.at(-1);
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
            onClick={() => deleteAppData({ id: appData?.at(-1)?.id || '' })}
          >
            Delete last App Data
          </Button>
        </Stack>
        <Box p={2} overflow="hidden">
          <Typography>App Data</Typography>
          <pre
            style={{
              width: '100%',
              maxWidth: '100%',
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              fontSize: '10px',
            }}
          >
            {JSON.stringify(appData, null, 2)}
          </pre>
        </Box>
        <AppSettingsDisplay />
      </Stack>
    </div>
  );
};
export default BuilderView;
