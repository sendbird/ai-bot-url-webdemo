import {APP_ID, CUSTOM_API_HOST, CUSTOM_WEBSOCKET_HOST, NICKNAME, TEST_HASHED_KEY, USER_ID} from "./const";
import {useGetHashedKey} from "./hooks/useGetHashedKey";
import CustomChannel from "./components/CustomChannel";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";

function App() {
  const hashedKey: string = TEST_HASHED_KEY;

  return <SBProvider
    appId={APP_ID}
    userId={USER_ID}
    nickname={NICKNAME}
    customApiHost={CUSTOM_API_HOST}
    customWebSocketHost={CUSTOM_WEBSOCKET_HOST}
  >
    <CustomChannel hashedKey={hashedKey}/>
  </SBProvider>;
}

export default App;
