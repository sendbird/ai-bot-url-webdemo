import { DEMO_CONSTANTS } from "./const";
import { useGetHashedKey } from "./hooks/useGetHashedKey";

import { Chat, ChatAiWidget } from "@sendbird/chat-ai-widget";
import "@sendbird/chat-ai-widget/dist/style.css";

function App() {
  const [hashedKey, isWidget]: [string, boolean|null] = useGetHashedKey(); // show loading if not there.
  // if (!isHashedKeyGiven) hashedKey = TEST_HASHED_KEY;
  // -------------------------------
  // @fixme -> initialState si DEMO_CONSTANTS.webDemo when isWidget is null
  // this is unexpected behavior. should be fixed.

  if (isWidget === null) return null;


  return isWidget
    ? (<ChatAiWidget
        applicationId={DEMO_CONSTANTS.widgetDemo.appId}
        botId={hashedKey}
        botNickName={ DEMO_CONSTANTS.widgetDemo.botNickName}
        suggestedMessageContent={DEMO_CONSTANTS.widgetDemo.suggestedMessageContent}
        createGroupChannelParams={DEMO_CONSTANTS.widgetDemo.createGroupChannelParams}
        startingPageContent={DEMO_CONSTANTS.widgetDemo.startingPageContent}
        replacementTextList={DEMO_CONSTANTS.widgetDemo.replacementTextList}
        messageBottomContent={DEMO_CONSTANTS.widgetDemo.messageBottomContent}
        customBetaMarkText="BETA"
      />
    )
    : (<Chat
        applicationId={DEMO_CONSTANTS.webDemo.appId}
        botId={hashedKey}
        botNickName={DEMO_CONSTANTS.webDemo.botNickName}
        suggestedMessageContent={DEMO_CONSTANTS.webDemo.suggestedMessageContent}
        createGroupChannelParams={DEMO_CONSTANTS.webDemo.createGroupChannelParams}
        startingPageContent={DEMO_CONSTANTS.webDemo.startingPageContent}
        replacementTextList={DEMO_CONSTANTS.webDemo.replacementTextList}
        messageBottomContent={DEMO_CONSTANTS.webDemo.messageBottomContent}
        customBetaMarkText="DEMO"
        instantConnect={true}
      />
    );
}

export default App;
