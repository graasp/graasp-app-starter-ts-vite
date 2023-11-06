import { Box, Button, Stack, Typography } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';

import { BUILDER_VIEW_CY } from '@/config/selectors';

import { hooks, mutations } from '../../config/queryClient';

const AppSettingsDisplay = (): JSX.Element => {
  const { data: appSetting } = hooks.useAppSettings();
  return (
    <Box p={2}>
      <Typography>App Setting</Typography>
      {appSetting ? (
        <pre>{JSON.stringify(appSetting.toJS(), null, 2)}</pre>
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
            onClick={() =>
              postAppSetting({ data: { content: 'hello' }, name: 'setting' })
            }
          >
            Post new App Setting
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              const data = appData?.last();
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
            onClick={() => deleteAppData({ id: appData?.last()?.id || '' })}
          >
            Delete last App Data
          </Button>
        </Stack>
        <Box p={2}>
          <Typography>App Data</Typography>
          <pre>{JSON.stringify(appData?.toJS(), null, 2)}</pre>
        </Box>
        <AppSettingsDisplay />
      </Stack>
    </div>
  );
};
export default BuilderView;
