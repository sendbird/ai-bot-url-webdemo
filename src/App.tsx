import {APP_ID, CUSTOM_API_HOST, CUSTOM_WEBSOCKET_HOST, NICKNAME, TEST_HASHED_KEY, USER_ID} from "./const";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
import '@sendbird/uikit-react/dist/index.css';
import './css/index.css';
import CustomChannel from "./components/CustomChannel";
import {useGetHashedKey} from "./hooks/useGetHashedKey";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const hashedKey: string = useGetHashedKey(); // show loading if not there.
  const isHashedKeyGiven = !!hashedKey;
  // if (!isHashedKeyGiven) hashedKey = TEST_HASHED_KEY;
  console.log('## isHashedKeyGiven: ', isHashedKeyGiven);
  console.log('## used hashedKey: ', hashedKey);
  if (!hashedKey) return <LoadingScreen/>;

  return <SBProvider
    appId={APP_ID}
    userId={USER_ID}
    nickname={NICKNAME}
    customApiHost={CUSTOM_API_HOST}
    customWebSocketHost={CUSTOM_WEBSOCKET_HOST}
  >
    <CustomChannel hashedKey={hashedKey}/>
    <div id={'sb_chat_root_for_z_index'}/>
  </SBProvider>;
}

export default App;
