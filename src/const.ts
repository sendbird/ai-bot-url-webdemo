import {uuid} from './utils';

export const USER_ID = uuid();
export const NICKNAME = "Jake Sully";
// get your app_id -> https://dashboard.sendbird.com/auth/signin
export const APP_ID = import.meta.env.VITE_APP_ID;
export const CUSTOM_API_HOST = `https://api-${APP_ID}.sendbird.com`;
export const CUSTOM_WEBSOCKET_HOST = `wss://ws-${APP_ID}.sendbird.com`;
export const HIGHLIGHT = "highlight";

export default {
  USER_ID,
  NICKNAME,
  HIGHLIGHT
};

export const PINNED_MESSAGE_DISPLAY_DURATION = 10000;
export const MAX_MESSAGE_SEND_COUNT = 10;

export const PINNED_MESSAGE = `You can only send up to ${MAX_MESSAGE_SEND_COUNT} messages per channel in 
this demo. If you liked it, feel free to refresh and re-run the demo.`;

export interface SuggestedReply {
  key: string;
  value: string;
  type?: string;
}

export type SuggestedReplyMap = { [key: string]: SuggestedReply[] };

// export const SUGGESTED_REPLIES: SuggestedReplyMap = [
//   {
//     key: 'Expenses',
//     value: 'How much did I spend in December?'
//   },
//   {
//     key: 'Biggest Expense',
//     value: 'What was the biggest expense?'
//   },
// ];

export interface ChannelInfo {
  url: string;
  name: string;
  creatorName: string;
}