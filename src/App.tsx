import {APP_ID, CUSTOM_API_HOST, CUSTOM_WEBSOCKET_HOST, NICKNAME, TEST_HASHED_KEY, USER_ID} from "./const";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
import '@sendbird/uikit-react/dist/index.css';
import './css/index.css';
import CustomChannel from "./components/CustomChannel";
import {useGetHashedKey} from "./hooks/useGetHashedKey";

function App() {
  const hashedKey: string = useGetHashedKey(); // show loading if not there.
  // const hashedKey: string = TEST_HASHED_KEY;
  console.log('## hashedKey: ', hashedKey);

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
