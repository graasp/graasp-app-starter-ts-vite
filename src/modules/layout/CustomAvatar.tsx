import React, { FC } from 'react';

import { Avatar } from '@mui/material';

import { Member } from '@graasp/apps-query-client';

import { ANONYMOUS_USER } from '@/config/constants';

// generate a background color for avatars from userName
const stringToColor = (name: string): string => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

type Props = {
  member?: Member;
  imgSrc?: string;
};

const CustomAvatar: FC<Props> = ({ member, imgSrc }) => {
  const userName = member?.name || ANONYMOUS_USER;
  const initials = 'Y';
  return (
    <Avatar
      alt={initials}
      src={imgSrc}
      sx={{ bgcolor: stringToColor(userName) }}
    >
      {initials}
    </Avatar>
  );
};

export default CustomAvatar;
