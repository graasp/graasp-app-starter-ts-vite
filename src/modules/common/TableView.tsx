import { FC, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Close } from '@mui/icons-material';
import InputIcon from '@mui/icons-material/Input';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { List } from 'immutable';

import { COMMENT_APP_DATA_TYPES } from '@/config/appDataTypes';
import { ANONYMOUS_USER, NB_COL_TABLE_VIEW_TABLE } from '@/config/constants';
import {
  TABLE_NO_COMMENTS_CYPRESS,
  TABLE_VIEW_BODY_USERS_CYPRESS,
  TABLE_VIEW_NB_COMMENTS_CELL_CYPRESS,
  TABLE_VIEW_OPEN_REVIEW_BUTTON_CYPRESS,
  TABLE_VIEW_REVIEW_DIALOG_CLOSE_BUTTON_CYPRESS,
  TABLE_VIEW_TABLE_CYPRESS,
  TABLE_VIEW_USERNAME_CELL_CYPRESS,
  TABLE_VIEW_USER_REVIEW_DIALOG_CYPRESS,
  TABLE_VIEW_VIEW_COMMENTS_CELL_CYPRESS,
  tableRowUserCypress,
} from '@/config/selectors';
import { CommentType } from '@/interfaces/comment';
import {
  AppDataProvider,
  useAppDataContext,
} from '@/modules/context/AppDataContext';
import { useMembersContext } from '@/modules/context/MembersContext';
import CustomDialog from '@/modules/layout/CustomDialog';
import PlayerView from '@/modules/main/PlayerView';
import { getOrphans } from '@/utils/comments';

import DownloadActions from '../settings/DownloadActions';
import DownloadData from '../settings/DownloadData';
import OrphanComments from '../settings/OrphanComments';

const DEFAULT_CURRENT_USER = {
  name: ANONYMOUS_USER,
  id: '',
};

const TableView: FC = () => {
  const { t } = useTranslation();
  const [openCommentView, setOpenCommentView] = useState(false);
  const [currentUser, setCurrentUser] = useState(DEFAULT_CURRENT_USER);
  const members = useMembersContext();
  const { appData } = useAppDataContext();

  const comments = appData?.filter((res) =>
    COMMENT_APP_DATA_TYPES.includes(res.type),
  ) as List<CommentType>;

  const renderTableBody = (): ReactElement[] | ReactElement | null => {
    const orphansId = getOrphans(comments).map((c) => c.id);
    const nonOrphanComments = comments?.filter(
      (c) => !orphansId.includes(c.id),
    );
    // nonOrphanComments is undefined or, is an empty list -> there are not resources to display
    if (!nonOrphanComments || nonOrphanComments.isEmpty()) {
      // show that there are no comments available
      return (
        <TableRow>
          <TableCell
            colSpan={NB_COL_TABLE_VIEW_TABLE}
            data-cy={TABLE_NO_COMMENTS_CYPRESS}
          >
            {t('No Comments')}
          </TableCell>
        </TableRow>
      );
    }
    const commentsByUsers = nonOrphanComments
      .groupBy(({ memberId }) => memberId)
      .toArray();
    return commentsByUsers.map(([userId, userComments]) => {
      const userName =
        members.find(({ id }) => id === userId)?.name || ANONYMOUS_USER;
      return (
        <TableRow key={userId} data-cy={tableRowUserCypress(userId)}>
          <TableCell data-cy={TABLE_VIEW_USERNAME_CELL_CYPRESS}>
            {userName}
          </TableCell>
          <TableCell data-cy={TABLE_VIEW_NB_COMMENTS_CELL_CYPRESS}>
            <div>{userComments.count()}</div>
          </TableCell>
          <TableCell data-cy={TABLE_VIEW_VIEW_COMMENTS_CELL_CYPRESS}>
            <IconButton
              data-cy={TABLE_VIEW_OPEN_REVIEW_BUTTON_CYPRESS}
              onClick={() => {
                setCurrentUser({
                  name: userName,
                  id: userId,
                });
                setOpenCommentView(true);
              }}
            >
              <InputIcon color="primary" />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  const onCloseDialog = (): void => {
    setCurrentUser(DEFAULT_CURRENT_USER);
    setOpenCommentView(false);
  };

  // todo: filter app data
  const renderDialogContent = (): ReactElement => (
    <>
      <AppDataProvider>
        <PlayerView />
      </AppDataProvider>
      <IconButton
        data-cy={TABLE_VIEW_REVIEW_DIALOG_CLOSE_BUTTON_CYPRESS}
        onClick={onCloseDialog}
        sx={{ position: 'absolute', top: 0, right: 0, m: 1 }}
      >
        <Close />
      </IconButton>
    </>
  );

  return (
    <>
      <DownloadActions />
      <DownloadData />
      <OrphanComments comments={comments} />
      <TableContainer data-cy={TABLE_VIEW_TABLE_CYPRESS}>
        <Table aria-label="student table">
          <TableHead>
            <TableRow>
              <TableCell>{t('Name')}</TableCell>
              <TableCell>{t('Total Number of Messages')}</TableCell>
              <TableCell>{t('View Chat')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-cy={TABLE_VIEW_BODY_USERS_CYPRESS}>
            {renderTableBody()}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomDialog
        dataCy={TABLE_VIEW_USER_REVIEW_DIALOG_CYPRESS}
        open={openCommentView}
        maxWidth="lg"
        title={t('Viewing comments from', { user: currentUser.name })}
        content={renderDialogContent()}
        onClose={onCloseDialog}
      />
    </>
  );
};

export default TableView;
