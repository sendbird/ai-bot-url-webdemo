import {uuid} from './utils';

export const USER_ID = uuid();
export const NICKNAME = "Jake Sully";
// get your app_id -> https://dashboard.sendbird.com/auth/signin
export const APP_ID = import.meta.env.VITE_APP_ID;
export const CUSTOM_API_HOST = `https://api-${APP_ID}.sendbird.com`;
export const CUSTOM_WEBSOCKET_HOST = `wss://ws-${APP_ID}.sendbird.com`;

export const HASHED_KEY_QUERY_PARAMETER_NAME = 'hashedKey';

export interface SuggestedReply {
  key: string;
  value: string;
  type?: string;
}

export const SUGGESTED_REPLIES: SuggestedReply[] = [
  {
    key: 'That helped 👍',
    value: ''
  },
  {
    key: 'Get more help 💬',
    value: ''
  },
];

