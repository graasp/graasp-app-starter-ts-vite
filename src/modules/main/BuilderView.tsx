import React, { FC } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import { hooks } from '@/config/queryClient';

import Loader from '../common/Loader';
import AdminView from './AdminView';
import PlayerView from './PlayerView';

const BuilderView: FC = () => {
  const context = useLocalContext();
  const generalAppSettings = hooks.useAppSettings();

  if (!generalAppSettings) {
    return <Loader />;
  }

  switch (context?.get('permission')) {
    // show "teacher view"
    case PermissionLevel.Admin:
      return <AdminView />;
    case PermissionLevel.Read:
    default:
      return <PlayerView />;
  }
};

export default BuilderView;
