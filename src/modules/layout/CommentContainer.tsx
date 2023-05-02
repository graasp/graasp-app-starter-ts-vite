import { styled } from '@mui/material';

import { BIG_BORDER_RADIUS } from '../../config/layout';

const CommentContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  border: 'solid silver 1px',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  borderRadius: BIG_BORDER_RADIUS,
}));
export default CommentContainer;
