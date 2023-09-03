import {
  AppAction,
  AppData,
  AppDataVisibility,
  AppSetting,
  PermissionLevel,
  PermissionLevelCompare,
} from '@graasp/sdk';

import { RestHandler, rest } from 'msw';
import { v4 } from 'uuid';

import { API_ROUTES } from '../api/routes';
import {
  Database,
  LocalContext,
  MockAppAction,
  MockAppData,
  MockAppSetting,
} from '../types';
import { AppMocks } from './msw-db';

const {
  buildGetAppDataRoute,
  buildGetContextRoute,
  buildPostAppDataRoute,
  buildPatchAppDataRoute,
  buildDeleteAppDataRoute,
  buildDeleteAppSettingRoute,
  buildGetAppActionsRoute,
  buildGetAppSettingsRoute,
  buildPatchAppSettingRoute,
  buildPostAppActionRoute,
  buildPostAppSettingRoute,
} = API_ROUTES;

const getMemberIdFromToken = (bearer: string | null): string => {
  if (!bearer) {
    throw new Error('no bearer token');
  }
  const memberId = bearer.split(' ').at(-1);
  if (!memberId) {
    throw new Error('Unable to extract memberId from token');
  }
  return memberId;
};

export const buildMSWMocks = (
  { apiHost }: LocalContext,
  database?: Database,
): { handlers: RestHandler[]; db: AppMocks } => {
  const db = new AppMocks();

  const getPermissionForMember = async (
    memberId: string,
  ): Promise<PermissionLevel> => {
    const localContextForMember = await db.appContext
      .where('memberId')
      .equals(memberId)
      .first();
    if (!localContextForMember) {
      throw new Error('Member was not found in localContext database');
    }
    const { permission } = localContextForMember;
    return permission;
  };

  const handlers = [
    // *************************
    //       App Data
    // *************************

    // GET /app-items/:itemId/app-data
    rest.get(
      `${apiHost}/${buildGetAppDataRoute(':itemId')}`,
      async (req, res, ctx) => {
        const reqItemId = req.params.itemId;

        const memberId = getMemberIdFromToken(req.headers.get('Authorization'));
        const permission = await getPermissionForMember(memberId);
        let value;
        if (permission === PermissionLevel.Admin) {
          // return all app data
          value = await db.appData.toArray();
        } else {
          // return only app data created by the user
          // todo: also query the app data that were set for another user using the `memberId`
          value = await db.appData
            .where({ creatorId: memberId, itemId: reqItemId })
            .toArray();
        }

        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // POST /app-items/:itemId/app-data
    rest.post(
      `${apiHost}/${buildPostAppDataRoute({ itemId: ':itemId' })}`,
      async (req, res, ctx) => {
        const reqItemId = req.params.itemId;
        const memberId = getMemberIdFromToken(req.headers.get('Authorization'));

        const body: Pick<AppData, 'data' | 'type'> & {
          visibility?: AppData['visibility'];
        } = await req.json();

        const appData: MockAppData = {
          id: v4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          itemId: reqItemId as string,
          creatorId: memberId,
          memberId,
          visibility: AppDataVisibility.Member,
          ...body,
        };
        const value = await db.appData.add(appData);

        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // PATCH /app-items/:itemId/app-data/:id
    rest.patch(
      `${apiHost}/${buildPatchAppDataRoute({ itemId: ':itemId', id: ':id' })}`,
      async (req, res, ctx) => {
        const { id } = req.params;

        const body: Pick<AppData, 'data' | 'id'> & {
          visibility?: AppData['visibility'];
        } = await req.json();

        const appData: Partial<MockAppData> = {
          updatedAt: new Date(),
          ...body,
        };
        const value = await db.appData.update(id as string, appData);

        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // DELETE /app-items/:itemId/app-data/:id
    rest.delete(
      `${apiHost}/${buildDeleteAppDataRoute({ itemId: ':itemId', id: ':id' })}`,
      async (req, res, ctx) => {
        const { id } = req.params;

        const value = await db.appData.get(id as string);
        await db.appData.delete(id as string);

        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // *************************
    //       App Settings
    // *************************

    // GET /app-items/:itemId/app-settings
    rest.get(
      `${apiHost}/${buildGetAppSettingsRoute(':itemId')}`,
      async (req, res, ctx) => {
        const reqItemId = req.params.itemId;

        const value = await db.appSetting
          .where('itemId')
          .equals(reqItemId)
          .toArray();
        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // POST /app-items/:itemId/app-settings
    rest.post(
      `${apiHost}/${buildPostAppSettingRoute({ itemId: ':itemId' })}`,
      async (req, res, ctx) => {
        const reqItemId = req.params.itemId;
        const memberId = getMemberIdFromToken(req.headers.get('Authorization'));
        const permission = await getPermissionForMember(memberId);
        if (PermissionLevelCompare.lte(PermissionLevel.Write, permission)) {
          return res(
            ctx.status(403),
            ctx.json({ message: 'member can not admin' }),
          );
        }

        const body: Pick<AppSetting, 'data' | 'name'> = await req.json();
        const appSetting: MockAppSetting = {
          id: v4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          itemId: reqItemId as string,
          creatorId: memberId,
          ...body,
        };
        const value = await db.appSetting.add(appSetting);

        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // PATCH /app-items/:itemId/app-settings/:id
    rest.patch(
      `${apiHost}/${buildPatchAppSettingRoute({
        itemId: ':itemId',
        id: ':id',
      })}`,
      async (req, res, ctx) => {
        const { id } = req.params;

        const body: Pick<AppSetting, 'data' | 'id'> = await req.json();
        const appSetting: Partial<MockAppSetting> = {
          updatedAt: new Date(),
          ...body,
        };
        const value = await db.appSetting.update(id as string, appSetting);

        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // DELETE /app-items/:itemId/app-setting/:id
    rest.delete(
      `${apiHost}/${buildDeleteAppSettingRoute({
        itemId: ':itemId',
        id: ':id',
      })}`,
      async (req, res, ctx) => {
        const { id } = req.params;

        const value = await db.appSetting.get(id as string);
        await db.appSetting.delete(id as string);

        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // *************************
    //       App Action
    // *************************

    // GET /app-items/:itemId/app-action
    rest.get(
      `${apiHost}/${buildGetAppActionsRoute(':itemId')}`,
      async (req, res, ctx) => {
        const memberId = getMemberIdFromToken(req.headers.get('Authorization'));
        const permission = await getPermissionForMember(memberId);
        let value;
        switch (permission) {
          case PermissionLevel.Admin:
            // get all actions when admin
            value = await db.appAction.toArray();
            break;
          case PermissionLevel.Write:
          case PermissionLevel.Read:
          default:
            // get only own actions
            value = await db.appAction
              .where('memberId')
              .equals(memberId)
              .toArray();
            break;
        }
        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // POST /app-items/:itemId/app-action
    rest.post(
      `${apiHost}/${buildPostAppActionRoute({ itemId: ':itemId' })}`,
      async (req, res, ctx) => {
        const reqItemId = req.params.itemId;
        const memberId = getMemberIdFromToken(req.headers.get('Authorization'));

        const body: Pick<AppAction, 'data' | 'type'> = await req.json();
        const appAction: MockAppAction = {
          id: v4(),
          createdAt: new Date(),
          itemId: reqItemId as string,
          memberId,
          ...body,
        };
        const value = await db.appAction.add(appAction);

        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // *************************
    //       App Context
    // *************************
    // /app-items/:itemId/context
    rest.get(
      `${apiHost}/${buildGetContextRoute(':itemId')}`,
      async (req, res, ctx) => {
        const { itemId: reqItemId } = req.params;
        const value = {
          members: await db.member.toArray(),
          ...(await db.item.get(reqItemId as string)),
        };

        return res(ctx.status(200), ctx.json(value));
      },
    ),

    // plumbing
    rest.delete('/__mocks/reset', (req, res, ctx) => {
      db.resetDB(database);
      return res(ctx.status(200));
    }),
    rest.post('/__mocks/context', async (req, res, ctx) => {
      const memberId = getMemberIdFromToken(req.headers.get('Authorization'));
      const body: Partial<LocalContext> = await req.json();
      // eslint-disable-next-line no-console
      console.log(body);

      const value = await db.appContext
        .where('memberId')
        .equals(memberId)
        .first();
      return res(ctx.status(200), ctx.json(value));
    }),
  ];

  return { handlers, db };
};
