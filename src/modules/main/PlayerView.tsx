import { Box, Typography } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';

import { hooks } from '@/config/queryClient';
import { PLAYER_VIEW_CY } from '@/config/selectors';

const PlayerView = (): JSX.Element => {
  const { permission } = useLocalContext();
  const { data: appContext } = hooks.useAppContext();
  const members = appContext?.members;

  return (
    <div data-cy={PLAYER_VIEW_CY}>
      Player as {permission}
      <Box p={2}>
        <Typography>Members</Typography>
        <pre>{JSON.stringify(members, null, 2)}</pre>
      </Box>
    </div>
  );
};
export default PlayerView;
