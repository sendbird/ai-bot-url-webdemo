import { DEMO_CONSTANTS, DemoConstant } from "./const";
import {useGetHashedKey} from "./hooks/useGetHashedKey";

import { Chat as ChatAiWidget } from "@sendbird/chat-ai-widget";
import "@sendbird/chat-ai-widget/dist/style.css";

function App() {
  const [hashedKey, isWidget]: [string, boolean|null] = useGetHashedKey(); // show loading if not there.
  // if (!isHashedKeyGiven) hashedKey = TEST_HASHED_KEY;
  // -------------------------------
  // @fixme -> initialState si DEMO_CONSTANTS.webDemo when isWidget is null
  // this is unexpected behavior. should be fixed.
  const initialState: DemoConstant = (isWidget) ? DEMO_CONSTANTS.widgetDemo : DEMO_CONSTANTS.webDemo;

  if (isWidget === null) return null;

  return (
    <ChatAiWidget
      applicationId={initialState.appId}
      botId={hashedKey}
      botNickName={initialState.botNickName}
      suggestedMessageContent={initialState.suggestedMessageContent}
      createGroupChannelParams={initialState.createGroupChannelParams}
      startingPageContent={initialState.startingPageContent}
      replacementTextList={initialState.replacementTextList}
      messageBottomContent={initialState.messageBottomContent}
      customBetaMarkText={isWidget ? 'BETA' : 'DEMO'}
      instantConnect={true}
      showChatBottom={false}
    />
  );
}

export default App;
