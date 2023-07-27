import {uuid} from './utils';

import { ReactComponent as SendbirdLogo } from './icons/sendbird-logo-starting-page.svg';
import { ReactComponent as StartingPageBackground } from './icons/starting-page-bg-image-svg.svg';


export const USER_ID = uuid();
export const NICKNAME = "Jake Sully";
// get your app_id -> https://dashboard.sendbird.com/auth/signin
export const WEB_DEMO_APP_ID = import.meta.env.VITE_WEB_DEMO_APP_ID;
export const WIDGET_DEMO_APP_ID = import.meta.env.VITE_WIDGET_DEMO_APP_ID;

export const HASHED_KEY_QUERY_PARAMETER_NAME = 'hashed_key'; // bot userId
export const IS_WIDGET_PARAMETER_NAME = 'is_widget';

export interface SuggestedReply {
  title: string;
  text: string;
  buttonText: string;
  link: string;
}

interface SuggestedMessageContent {
  replyContents: SuggestedReply[];
  messageFilterList: string[];
}
export interface DemoConstant {
  name: string;
  appId: string;
  apiHost: string;
  wsHost: string;
  suggestedMessageContent: SuggestedMessageContent;
  createGroupChannelParams: CreateGroupChannelParams;
  startingPageContent: StartingPageContent;
  botNickName: string;
  replacementTextList: string[][];
  messageBottomContent: {
    text: string;
    infoIconText: string;
  }
}

const commonConstants = {
  suggestedMessageContent: {
    replyContents: [
      {
        title: 'Yes, it was helpful! 👍',
        text: 'Thanks for your feedback! You can also build your own AI chatbot in Sendbird.',
        buttonText: 'Try free trial',
        link: 'https://dashboard.sendbird.com/auth/signup',
      },
      {
        title: 'No, I need more help. 💬',
        text: "I'm sorry, we couldn't help you. Let us know how we can improve by talking to one of our teammates.",
        buttonText: 'Talk to an expert',
        link: 'https://sendbird.com/contact-sales',
      },
    ],
    messageFilterList: [
      'Can you please clarify?',
      'How can I assist you',
      'Ask away',
      'How can I help you',
      'Can you clarify',
      "That's not a question I can answer unfortunately",
      'Try again',
      "I couldn't find the answer to your question",
      'Can you try again?',
      'I apologize for any confusion',
      "I'm sorry, I couldn't understand your question",
      "That's not a valid question",
      'Is there a specific question you have',
      "I'm here to help you with any questions you have",
    ],
  },
  messageBottomContent: {
    text: 'AI-generated response powered by OpenAI',
    infoIconText:
      'In this beta version, the AI-generated responses may lack complete accuracy.',
  },
}
export const DEMO_CONSTANTS = {
  webDemo: {
    name: 'webDemo',
    botNickName: 'SmartAssistant',
    appId: WEB_DEMO_APP_ID,
    apiHost: `https://api-${WEB_DEMO_APP_ID}.sendbird.com`,
    wsHost: `wss://ws-${WEB_DEMO_APP_ID}.sendbird.com`,
    createGroupChannelParams: {
      name: 'SmartAssistant',
      coverUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ix' +
        'lib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    startingPageContent: {
      headerContent: {
        headerOne: 'SmartAssistant',
        headerTwo: 'AI-powered knowledge chatbot',
      },
      messageContent: {
        header: '',
        body: '',
      },
      logoContent: {
        Component: SendbirdLogo,
        width: '100px',
      },
      backGroundContent: {
        Component: StartingPageBackground,
        height: '240px',
      },
    },
    replacementTextList: [['Clark', 'SmartAssistant']],
    customRefreshComponent: {
      style: {
        position: 'relative',
        right: 0,
      },
    },
    ...commonConstants,
  },
  widgetDemo: {
    name: 'widgetDemo',
    botNickName: 'Docs AI Assistan',
    appId: WIDGET_DEMO_APP_ID,
    apiHost: `https://api-${WIDGET_DEMO_APP_ID}.sendbird.com`,
    wsHost: `wss://ws-${WIDGET_DEMO_APP_ID}.sendbird.com`,
    createGroupChannelParams: {
      name: 'Docs AI Assistant',
      coverUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ix' +
        'lib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    startingPageContent: {
      headerContent: {
        headerOne: 'I\'m Docs AI Assistant',
        headerTwo: 'Ask us anything about Sendbird Docs!',
      },
      messageContent: {
        header: '',
        body: '',
      },
      logoContent: {
        Component: SendbirdLogo,
        width: '100px',
      },
      backGroundContent: {
        Component: StartingPageBackground,
        height: '240px',
      },
    },
    replacementTextList: [['the Text extracts', 'Sendbird documentation']],
    ...commonConstants,
  },
};

export interface CreateGroupChannelParams {
  name: string;
  coverUrl: string;
}

interface StartingPageContent {
  headerContent: StartingPageHeaderContent;
  messageContent: StartingMessageContent;
  logoContent: StringPageLogoContent;
  backGroundContent: BackGroundContent;
}

interface BackGroundContent {
  Component: React.FC;
  height: string;
}

interface StringPageLogoContent {
  Component: React.FC;
  width: string;
}

interface StartingPageHeaderContent {
  headerOne: string;
  headerTwo: string;
}

interface StartingMessageContent {
  header: string;
  body: string;
}

