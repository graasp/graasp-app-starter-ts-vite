import { Box, Button, Stack, Typography } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';

import { BUILDER_VIEW_CY } from '@/config/selectors';

import { hooks, mutations } from '../../config/queryClient';

const AppSettingsDisplay = (): JSX.Element => {
  const { data: appSettings } = hooks.useAppSettings();
  return (
    <Box p={2}>
      <Typography>App Setting</Typography>
      {appSettings ? (
        <pre>{JSON.stringify(appSettings, null, 2)}</pre>
      ) : (
        <Typography>Loading</Typography>
      )}
    </Box>
  );
};

const AppActionsDisplay = (): JSX.Element => {
  const { data: appActions } = hooks.useAppActions();
  return (
    <Box p={2}>
      <Typography>App Actions</Typography>
      {appActions ? (
        <pre>{JSON.stringify(appActions, null, 2)}</pre>
      ) : (
        <Typography>Loading</Typography>
      )}
    </Box>
  );
};

const BuilderView = (): JSX.Element => {
  const { permission } = useLocalContext();
  const { data: appDatas } = hooks.useAppData();
  const { mutate: postAppData } = mutations.usePostAppData();
  const { mutate: postAppAction } = mutations.usePostAppAction();
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
              postAppAction({ data: { content: 'hello' }, type: 'an-action' })
            }
          >
            Post new App Action
          </Button>
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
              const data = appDatas?.at(-1);
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
            onClick={() => deleteAppData({ id: appDatas?.at(-1)?.id || '' })}
          >
            Delete last App Data
          </Button>
        </Stack>
        <Box p={2}>
          <Typography>App Data</Typography>
          <pre>{JSON.stringify(appDatas, null, 2)}</pre>
        </Box>
        <AppSettingsDisplay />
        <AppActionsDisplay />
      </Stack>
    </div>
  );
};
export default BuilderView;
