import {uuid} from './utils';

export const USER_ID = uuid();
export const NICKNAME = "Jake Sully";
// get your app_id -> https://dashboard.sendbird.com/auth/signin
export const APP_ID = import.meta.env.VITE_APP_ID;
export const CUSTOM_API_HOST = `https://api-${APP_ID}.sendbird.com`;
export const CUSTOM_WEBSOCKET_HOST = `wss://ws-${APP_ID}.sendbird.com`;

export const HASHED_KEY_QUERY_PARAMETER_NAME = 'hashed_key';
export const TEST_HASHED_KEY = '90ecefd7558b7698bc430394300676ca33f7b00afb05c63129520ecde6785e52';

export interface SuggestedReply {
  title: string;
  text: string;
  buttonText: string;
  link: string;
}

export const SUGGESTED_REPLIES: SuggestedReply[] = [
  {
    title: 'Problem solved! 👍',
    text: 'Thank you for your feedback! You can also build your own AI chatbot in Sendbird.',
    buttonText: 'Try free trial',
    link: 'https://dashboard.sendbird.com/auth/signup',
  },
  {
    title: 'Nope, still lost 💬',
    text: 'I\'m sorry, we couldn\'t help you. Let us know how we can improve by talking to one of our teammates',
    buttonText: 'Talk to an expert',
    link: 'https://sendbird.com/contact-sales',
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
};

export const LOCAL_MESSAGE_CUSTOM_TYPE = {
  linkSuggestion: 'linkSuggestion',
  confirmation: 'confirmation',
};

export const FIRST_MESSAGE_TEXT = 'Hey, this is Clark from Sendbird. How can I help you today?';