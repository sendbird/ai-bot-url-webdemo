import Channel from '@sendbird/uikit-react/Channel';
import {GroupChannel, SendbirdGroupChat} from "@sendbird/chat/groupChannel";
import {useCreateGroupChannel} from "../hooks/useCreateGroupChannel";
import {User} from "@sendbird/chat";
import {useGetBotUser} from "../hooks/useGetBotUser";
import LoadingScreen from "./LoadingScreen";
import ChannelHeader from "@sendbird/uikit-react/Channel/components/ChannelHeader";
import {useState} from "react";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import SuggestedRepliesPanel from "./SuggestedRepliesPanel";
import MessageInput from "@sendbird/uikit-react/Channel/components/MessageInput";
import CustomMessage from "./CustomMessage";
import CustomSpinner from "./CustomSpinner";
import BottomTextContainer from "./BottomTextContainer";

type Props = {
  hashedKey: string;
}

export default function CustomChannel(props: Props) {
  const { hashedKey } = props;
  const store = useSendbirdStateContext();
  const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;
  const botUser: User = useGetBotUser(sb.currentUser, hashedKey);
  const channel: GroupChannel = useCreateGroupChannel(sb.currentUser, botUser);

  const [isMessageSent, setIsMessageSent] = useState(false);
  const [activeSpinnerId, setActiveSpinnerId] = useState(-1);

  console.log('## currentUser: ', sb.currentUser);
  console.log('## botUser: ', botUser);
  console.log('## channel: ', channel);

  if (!channel) return <LoadingScreen/>;
  return <Channel
    channelUrl={channel.url}
    renderChannelHeader={() => {
      // return <div style={{ position: 'relative' }}>
      //   <CustomSpinner
      //     setActiveSpinnerId={setActiveSpinnerId}
      //     isMessageSent={isMessageSent}
      //   />
      //   <ChannelHeader/>
      // </div>
      return <ChannelHeader/>;
    }}
    renderMessageInput={() => {
      // return <div>
      //   <SuggestedRepliesPanel
      //     setIsMessageSent={setIsMessageSent}
      //   />
      //   <>
      //     <MessageInput
      //       renderVoiceMessageIcon={() => <></>}
      //       renderFileUploadIcon={() => <></>}
      //     />
      //     <BottomTextContainer/>
      //   </>
      // </div>
      return <MessageInput
        renderVoiceMessageIcon={() => <></>}
        renderFileUploadIcon={() => <></>}
      />;
    }}
    renderMessage={(message) => {
      return <CustomMessage
        message={message}
        activeSpinnerId={activeSpinnerId}
      />
    }}
    renderTypingIndicator={() => <></>}
  />;
}