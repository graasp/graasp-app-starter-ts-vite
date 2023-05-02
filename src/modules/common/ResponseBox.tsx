import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, styled } from '@mui/material';

import { COMMENT_RESPONSE_BOX_CY } from '@/config/selectors';

import ResponseContainer from '../layout/ResponseContainer';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& input': {
    padding: theme.spacing(1),
  },
}));

type Props = {
  commentId: string;
  dataCy?: string;
  onClick: (id: string) => void;
};

const ResponseBox: FC<Props> = ({ onClick, commentId, dataCy }) => {
  const { t } = useTranslation();
  return (
    <ResponseContainer>
      <StyledTextField
        data-cy={dataCy || COMMENT_RESPONSE_BOX_CY}
        fullWidth
        placeholder={t('Respond to this comment')}
        onClick={() => onClick(commentId)}
      />
    </ResponseContainer>
  );
};
export default ResponseBox;
