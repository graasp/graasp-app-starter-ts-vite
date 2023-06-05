import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Delete, Edit, Flag } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import { APP_ACTIONS_TYPES } from '@/config/appActionsTypes';
import { MUTATION_KEYS, useMutation } from '@/config/queryClient';

import { useAppDataContext } from '../context/AppDataContext';
import { useCommentContext } from '../context/CommentContext';
import { useReviewContext } from '../context/ReviewContext';

type Props = {
  open: boolean;
  menuAnchorEl: null | HTMLElement;
  onClose: () => void;
  onClickFlag?: () => void;
  showDelete?: boolean;
  showEdit?: boolean;
  showFlag?: boolean;
};

const CommentActions: FC<Props> = ({
  open,
  menuAnchorEl,
  onClose,
  onClickFlag,
  showDelete = true,
  showEdit = true,
  showFlag = true,
}) => {
  const { t } = useTranslation();
  const comment = useCommentContext();
  const { editComment } = useReviewContext();
  const { deleteAppData } = useAppDataContext();
  const { mutate: postAction } = useMutation<
    unknown,
    unknown,
    { data: unknown; type: string }
  >(MUTATION_KEYS.POST_APP_ACTION);

  return (
    <Menu
      MenuListProps={{ dense: true }}
      open={open}
      anchorEl={menuAnchorEl}
      // center the popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={() => onClose()}
    >
      {showEdit && (
        <MenuItem
          onClick={() => {
            editComment(comment.id);
            postAction({
              data: { comment },
              type: APP_ACTIONS_TYPES.EDIT_COMMENT,
            });
            onClose();
          }}
        >
          <ListItemIcon>
            <Edit color="primary" />
          </ListItemIcon>
          <ListItemText>{t('Edit')}</ListItemText>
        </MenuItem>
      )}
      {showDelete && (
        <MenuItem
          onClick={() => {
            deleteAppData({ id: comment.id });
            postAction({
              data: { comment },
              type: APP_ACTIONS_TYPES.DELETE_COMMENT,
            });
            onClose();
          }}
        >
          <ListItemIcon>
            <Delete color="error" />
          </ListItemIcon>
          <ListItemText>{t('Delete')}</ListItemText>
        </MenuItem>
      )}
      {showFlag && (
        <MenuItem
          onClick={() => {
            onClickFlag?.();
            postAction({
              data: { comment },
              type: APP_ACTIONS_TYPES.REPORT_COMMENT,
            });
            onClose();
          }}
        >
          <ListItemIcon>
            <Flag color="warning" />
          </ListItemIcon>
          <ListItemText>{t('Report')}</ListItemText>
        </MenuItem>
      )}
    </Menu>
  );
};

export default CommentActions;
