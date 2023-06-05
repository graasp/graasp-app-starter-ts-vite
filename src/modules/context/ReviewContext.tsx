import React, {
  FC,
  ReactElement,
  createContext,
  useMemo,
  useState,
} from 'react';

export const NO_COMMENT_OPENED = -1;
const NO_COMMENT_EDITED = '';

export type ReviewContextType = {
  addResponse: (commentId: string) => void;
  editComment: (commentId: string) => void;
  currentEditedCommentId: string;
  currentRepliedCommentId: string;
  closeComment: () => void;
  closeEditingComment: () => void;
};

const defaultContextValue = {
  addResponse: (commentId: string) =>
    // eslint-disable-next-line no-console
    console.log(`response added to ${commentId}`),
  editComment: (commentId: string) =>
    // eslint-disable-next-line no-console
    console.log(`comment with id ${commentId} is edited`),
  currentEditedCommentId: NO_COMMENT_EDITED,
  currentRepliedCommentId: NO_COMMENT_EDITED,
  // eslint-disable-next-line no-console
  closeComment: () => console.log(`comment closed`),
  // eslint-disable-next-line no-console
  closeEditingComment: () => console.log(`comment finished editing`),
};

const ReviewContext = createContext<ReviewContextType>(defaultContextValue);

type Prop = {
  children: ReactElement | ReactElement[];
};

export const ReviewProvider: FC<Prop> = ({ children }) => {
  const [currentEditedCommentId, setCurrentEditedCommentId] =
    useState<string>(NO_COMMENT_EDITED);
  const [currentRepliedCommentId, setCurrentRepliedCommentId] =
    useState<string>(NO_COMMENT_EDITED);
  const contextValue = useMemo(
    () => ({
      addResponse: (commentId: string) => {
        setCurrentRepliedCommentId(commentId);
      },
      editComment: (commentId: string) => setCurrentEditedCommentId(commentId),
      currentEditedCommentId,
      currentRepliedCommentId,
      closeComment: () => {
        setCurrentRepliedCommentId(NO_COMMENT_EDITED);
      },
      closeEditingComment: () => setCurrentEditedCommentId(NO_COMMENT_EDITED),
    }),
    [currentEditedCommentId, currentRepliedCommentId],
  );

  return (
    <ReviewContext.Provider value={contextValue}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = (): ReviewContextType =>
  React.useContext<ReviewContextType>(ReviewContext);
