import { AppData } from '@graasp/apps-query-client';

import { List } from 'immutable';

export const buildCodeRowKey = (
  line: { content: string }[],
  index: number,
): string => `row #${index} ${line.map((l) => l.content).join(' ')}`;

export const sortAppDataFromNewest = <T extends AppData>(
  appData: List<T>,
): List<T> =>
  appData.sort((a, b) =>
    Date.parse(a.updatedAt) < Date.parse(b.updatedAt) ? 1 : -1,
  );
