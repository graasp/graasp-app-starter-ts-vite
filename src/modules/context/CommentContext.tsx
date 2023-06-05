import React, { FC, ReactElement, createContext } from 'react';

import { CommentType } from '@/interfaces/comment';

const defaultContextValue = {};
const CommentContext = createContext<CommentType>(
  defaultContextValue as CommentType,
);

type Prop = {
  value: CommentType;
  children: ReactElement;
};

export const CommentProvider: FC<Prop> = ({ children, value }) => (
  <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
);

export const useCommentContext = (): CommentType =>
  React.useContext<CommentType>(CommentContext);
