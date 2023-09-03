import { Box, Button, Stack, Typography } from '@mui/material';

import { hooks, mutations } from '@/config/queryClient';
import { ANALYTICS_VIEW_CY } from '@/config/selectors';
import { useLocalContext } from '@/query-client';

const AnalyticsView = (): JSX.Element => {
  const { permission } = useLocalContext();
  const { data: appAction, refetch } = hooks.useAppActions();
  const { mutate: postAppAction } = mutations.usePostAppAction();
  return (
    <div data-cy={ANALYTICS_VIEW_CY}>
      Analytics as {permission}
      <Stack direction="column" spacing={2}>
        <Stack direction="row" justifyContent="center" spacing={1}>
          <Button variant="outlined" onClick={() => refetch()}>
            Refetch App Action
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              postAppAction({
                data: { content: 'i am a spy' },
                type: 'test-action',
              })
            }
          >
            Post new App Action
          </Button>
        </Stack>
        <Box p={2}>
          <Typography>App Actions</Typography>
          <pre>{JSON.stringify(appAction?.toJS(), null, 2)}</pre>
        </Box>
      </Stack>
    </div>
  );
};
export default AnalyticsView;
