import {APP_ID, CUSTOM_API_HOST, CUSTOM_WEBSOCKET_HOST, NICKNAME, TEST_HASHED_KEY, USER_ID} from "./const";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
import '@sendbird/uikit-react/dist/index.css';
import './css/index.css';
import {DUMMIES} from "./dummy";
import {MessageTextParser, Token, TokenType} from "./utils";
import {CodeBlock} from "react-code-blocks";
import CustomChannel from "./components/CustomChannel";
import {useGetHashedKey} from "./hooks/useGetHashedKey";

function App() {
  // const hashedKey: string = useGetHashedKey(); // show loading if not there.
  const hashedKey: string = TEST_HASHED_KEY;

  return <SBProvider
    appId={APP_ID}
    userId={USER_ID}
    nickname={NICKNAME}
    customApiHost={CUSTOM_API_HOST}
    customWebSocketHost={CUSTOM_WEBSOCKET_HOST}
  >
    <CustomChannel hashedKey={hashedKey}/>
    {/*{*/}
    {/*  DUMMIES.map((dummy) => {*/}
    {/*    const tokens: Token[] = MessageTextParser(dummy);*/}
    {/*    console.warn('#### tokens: ', tokens);*/}
    {/*    return (<p style={{ border: '1px solid red '}}>*/}
    {/*      <p style={{ border: '1px solid blue '}}>{dummy}</p>*/}
    {/*     {*/}
    {/*        tokens.map((token) => {*/}
    {/*          if (token.type === TokenType.codeSnippet) {*/}
    {/*            return <CodeBlock*/}
    {/*              text={token.value}*/}
    {/*              showLineNumbers*/}
    {/*              startingLineNumber*/}
    {/*            />*/}
    {/*          }*/}
    {/*          return <>{token.value}</>*/}
    {/*        })*/}
    {/*     }*/}
    {/*    </p>)*/}
    {/*  })*/}
    {/*}*/}
  </SBProvider>;
}

export default App;
