import { AppData } from '@graasp/apps-query-client';

interface ReportedCommentAppData {
  data: {
    reason: string;
    commentId: string;
  };
}
export type ReportedCommentType = AppData & ReportedCommentAppData;
