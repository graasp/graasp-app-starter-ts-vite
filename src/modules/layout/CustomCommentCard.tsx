import { Card, CardProps, styled } from '@mui/material';

import { BIG_BORDER_RADIUS } from '../../config/layout';

const CustomCommentCard = styled(Card)<CardProps>({
  borderRadius: BIG_BORDER_RADIUS,
});
export default CustomCommentCard;
