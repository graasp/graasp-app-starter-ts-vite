import { DiscriminatedItem, Member } from '@graasp/sdk';

import Dexie from 'dexie';

import {
  Database,
  LocalContext,
  MockAppAction,
  MockAppData,
  MockAppSetting,
} from '../types';

type OptionalIndexed<T extends { id: string }, P extends keyof T = 'id'> = {
  [Key in keyof T as Key extends P ? Key : never]?: T[Key];
} & {
  [Key in keyof T as Key extends P ? never : Key]: T[Key];
};

export type IMockAppData = OptionalIndexed<MockAppData>;
export type IMockAppSetting = OptionalIndexed<MockAppSetting>;
export type IMockAppAction = OptionalIndexed<MockAppAction>;

export class AppMocks extends Dexie {
  item!: Dexie.Table<DiscriminatedItem, string>;

  member!: Dexie.Table<Member, string>;

  appContext!: Dexie.Table<LocalContext, string>;

  appData!: Dexie.Table<MockAppData, string>;

  appSetting!: Dexie.Table<MockAppSetting, string>;

  appAction!: Dexie.Table<MockAppAction, string>;

  constructor() {
    super('graasp-app-mocks');

    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      item: 'id',
      member: 'id',
      appContext: 'memberId',
      appData: 'id, [itemId+creatorId], type, visibility',
      appSetting: 'id, itemId, name',
      appAction: 'id, memberId',
    });
  }

  seed(data: Database): void {
    // pre-load the IndexDB with data
    this.item.bulkAdd(data.items);
    this.member.bulkAdd(data.members);
    this.appContext.add(data.appContext, data.appContext.memberId);
    this.appData.bulkAdd(data.appData);
    this.appSetting.bulkAdd(data.appSettings);
    this.appAction.bulkAdd(data.appActions);
  }

  resetDB(data?: Database): void {
    // eslint-disable-next-line no-console
    console.log('Resetting DB');
    this.tables.map((table) => table.clear());

    if (data) {
      // eslint-disable-next-line no-console
      console.log('Seeding DB with initial data');
      this.seed(data);
    }
  }
}
