import {uuid} from './utils';

export const USER_ID = uuid();
export const NICKNAME = "Jake Sully";
// get your app_id -> https://dashboard.sendbird.com/auth/signin
export const APP_ID = import.meta.env.VITE_APP_ID;
export const CUSTOM_API_HOST = `https://api-${APP_ID}.sendbird.com`;
export const CUSTOM_WEBSOCKET_HOST = `wss://ws-${APP_ID}.sendbird.com`;

export const HASHED_KEY_QUERY_PARAMETER_NAME = 'hashedKey';
export const TEST_HASHED_KEY = '90ecefd7558b7698bc430394300676ca33f7b00afb05c63129520ecde6785e52';

export interface SuggestedReply {
  title: string;
  text: string;
  buttonText: string;
  link: string;
}

export const SUGGESTED_REPLIES: SuggestedReply[] = [
  {
    title: 'That helped 👍',
    text: 'Thank you for your feedback! You can also build your own chatbot through the Sendbird dashboard.',
    buttonText: 'Try free trial',
    link: '',
  },
  {
    title: 'Get more help 💬',
    text: 'It sounds like you may need to speak with one of my teammates to solve your issue.',
    buttonText: 'Talk to an expert',
    link: '',
  },
];

export const CREATE_GROUP_CHANNEL_PARAMS = {
  name: 'AI Assistant',
  coverUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ix' +
    'lib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
};

export const TYPE_FACE = {
  avenir: "'Avenir Next', 'Helvetica Neue', helvetica, Arial, sans-serif",
  robotoMono:
    "'Roboto Mono', 'Andale Mono', Consolas, Monaco, 'Ubuntu Mono', monospace",
  gellix:
    "Gellix, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
};

export const SOURCE = {
  title: 'Conversations chat API Group& direct messaging Sendbird',
  link: '',
}