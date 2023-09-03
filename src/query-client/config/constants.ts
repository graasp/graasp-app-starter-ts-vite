import { PermissionLevel, ThumbnailSize } from '@graasp/sdk';

// -- React Query Configs --
// time during which cache entry is never refetch
export const STALE_TIME_MILLISECONDS = 1000 * 30; // default is 0 to always refetch, can increase to trade load against consistency
// time during which to keep a query cache entry which has no observers
export const CACHE_TIME_MILLISECONDS = 1000 * 60 * 5; // default is 5 min

// defaults
export const DEFAULT_THUMBNAIL_SIZES = ThumbnailSize.Small;
export const DEFAULT_PERMISSION = PermissionLevel.Read;
export const DEFAULT_CONTEXT = 'standalone';
export const DEFAULT_LANG = 'en';
export const MOCK_TOKEN = 'mock-token';
