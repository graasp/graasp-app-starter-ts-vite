import { Unity, useUnityContext } from 'react-unity-webgl';

import { Box, Typography } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';

import { hooks } from '@/config/queryClient';
import { PLAYER_VIEW_CY } from '@/config/selectors';

const PlayerView = (): JSX.Element => {
  const { permission } = useLocalContext();
  const { data: appContext } = hooks.useAppContext();
  const members = appContext?.members;

  const { unityProvider } = useUnityContext({
    loaderUrl: './build/CoupledOscillations.loader.js',
    dataUrl: './build/CoupledOscillations.data',
    frameworkUrl: './build/CoupledOscillations.framework.js',
    codeUrl: './build/CoupledOscillations.wasm',
  });

  return (
    <div data-cy={PLAYER_VIEW_CY}>
      Player as {permission}
      <Box p={2}>
        <Typography>Members</Typography>
        <pre>{JSON.stringify(members, null, 2)}</pre>
      </Box>
      <Unity
        unityProvider={unityProvider}
        style={{ width: 800, height: 600 }}
      />
    </div>
  );
};
export default PlayerView;
