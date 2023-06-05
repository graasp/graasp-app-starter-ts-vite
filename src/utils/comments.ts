import { AppData, UUID } from '@graasp/apps-query-client';

import { List } from 'immutable';

import { CommentType } from '@/interfaces/comment';

const findCommentWithId = (
  comments: List<CommentType>,
  commentId: UUID,
): AppData | undefined => comments.find((c) => c.id === commentId);

const findCommentWithParentId = (
  comments: List<CommentType>,
  commentId: UUID,
): AppData | undefined => comments.find((c) => c.data?.parent === commentId);

const findChild = (
  comments: List<CommentType>,
  parentId: UUID,
): CommentType | undefined => comments.find((c) => c.data.parent === parentId);

const getThreadIdsFromLastCommentId = (
  allComments: List<CommentType>,
  lastCommentId: UUID,
): UUID[] => {
  // this method goes bottom up to find comment ids in the thread
  const thread = [];
  let parentId = lastCommentId;
  let parent = null;
  do {
    parent = findCommentWithId(allComments, parentId);
    if (parent) {
      thread.push(parentId);
      parentId = parent.data?.parent as UUID;
    }
  } while (parent);
  return thread;
};

const getThreadIdsFromFirstCommentId = (
  allComments: List<CommentType>,
  firstId: UUID,
): UUID[] => {
  // this method goes from top to bottom
  let parentId = firstId;
  const thread = [firstId];
  let children = null;
  // find children to the comment
  do {
    children = findCommentWithParentId(allComments, parentId);
    if (children) {
      thread.push(children.id);
      parentId = children.id;
    }
  } while (children);
  return thread;
};

const getOrphans = (allComments: List<CommentType>): List<CommentType> => {
  // orphans are comments which parent does not exist
  let orphans: List<CommentType> = List();
  allComments.forEach((c) => {
    const parentId = c.data?.parent as UUID;
    const parent = findCommentWithId(allComments, parentId);
    // comment is not on thread start but his parent is not found
    if (parentId && !parent) {
      orphans = orphans.push(c);
    }
  });
  return orphans;
};

const buildThread = (
  parentComment: CommentType,
  comments: List<CommentType>,
): List<CommentType> => {
  // build thread list
  let thread = List([parentComment]);
  let parentId = parentComment.id;
  let nextChild = null;
  do {
    nextChild = findChild(comments, parentId);
    if (nextChild) {
      thread = thread.push(nextChild);
      parentId = nextChild.id;
    }
  } while (nextChild);

  return thread;
};

export {
  buildThread,
  findChild,
  findCommentWithId,
  findCommentWithParentId,
  getThreadIdsFromLastCommentId,
  getThreadIdsFromFirstCommentId,
  getOrphans,
};
