import ChannelUI from '@sendbird/uikit-react/Channel/components/ChannelUI';
import {GroupChannel, SendbirdGroupChat} from "@sendbird/chat/groupChannel";
import {useCreateGroupChannel} from "../hooks/useCreateGroupChannel";
import {ChannelType, User} from "@sendbird/chat";
import {useGetBotUser} from "../hooks/useGetBotUser";
import LoadingScreen from "./LoadingScreen";
import {useEffect, useState} from "react";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import SuggestedRepliesPanel from "./SuggestedRepliesPanel";
import MessageInput from "@sendbird/uikit-react/Channel/components/MessageInput";
import CustomMessage from "./CustomMessage";
import BottomTextContainer from "./BottomTextContainer";
import CustomHeader from "./CustomHeader";
import styled from "styled-components";
import {ChannelProvider, useChannelContext} from "@sendbird/uikit-react/Channel/context";
import {ClientUserMessage} from "SendbirdUIKitGlobal";
import {SuggestedReply, USER_ID} from "../const";
import {MessageType, SendingStatus, UserMessage} from "@sendbird/chat/message";
import {scrollUtil} from "../utils";
import BotMessageWithBodyInput from "./BotMessageWithBodyInput";
import SuggestedReplyMessageBody from "./SuggestedReplyMessageBody";
import {useSendLocalMessage} from "../hooks/useSendLocalMessage";

const Root = styled.div`
  height: 100vh;
  font-family: "Roboto", sans-serif;
`;

type CustomChannelUIProps = {
  botUser: User;
}

function CustomChannelUI(props: CustomChannelUIProps) {
  const { botUser } = props;
  const store = useSendbirdStateContext();
  const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;
  const { allMessages, currentGroupChannel } = useChannelContext();
  const channel: GroupChannel | undefined = currentGroupChannel;
  const lastMessage: ClientUserMessage = allMessages?.[allMessages?.length - 1] as ClientUserMessage;
  console.log('#### allMessages: ', allMessages);

  const [activeSpinnerId, setActiveSpinnerId] = useState(-1);
  // TODO: when count is 10, show suggested replies.
  const [totalReceivedMessagesCount, setTotalReceivedMessagesCount] = useState(0);
  /**
   * If the updated last message is sent by the current user, activate spinner for the sent message.
   * If the updated last message is pending or failed by the current user or sent by the bot, deactivate spinner.
   */
  useEffect(() => {
    if(lastMessage
      && lastMessage.sender?.userId === USER_ID
      && lastMessage.sendingStatus === SendingStatus.SUCCEEDED
    ) {
      setActiveSpinnerId(lastMessage.messageId);
      scrollUtil();
    } else {
      setActiveSpinnerId(-1);
    }
  }, [lastMessage?.messageId]);

  if (!channel) return <LoadingScreen/>;
  return <Root>
    <ChannelUI
      renderChannelHeader={() => {
        return <CustomHeader channel={channel} isTyping={activeSpinnerId > -1}/>;
      }}
      renderMessageInput={() => {
        return <div>
          <SuggestedRepliesPanel botUser={botUser}/>
          <MessageInput
            renderVoiceMessageIcon={() => <></>}
            renderFileUploadIcon={() => <></>}
            renderSendMessageIcon={() => <></>}
          />
          <BottomTextContainer/>
        </div>
      }}
      renderMessage={({ message }) => {
        return <CustomMessage
          message={message}
          activeSpinnerId={activeSpinnerId}
        />
      }}
      renderTypingIndicator={() => <></>}
    />
  </Root>;
}

type CustomChannelProps = {
  hashedKey: string;
}

export default function CustomChannel(props: CustomChannelProps) {
  const { hashedKey } = props;
  const store = useSendbirdStateContext();
  const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;
  const botUser: User = useGetBotUser(sb.currentUser, hashedKey);
  const channel: GroupChannel | null = useCreateGroupChannel(sb.currentUser, botUser);
  
  console.log('## currentUser: ', sb.currentUser);
  console.log('## botUser: ', botUser);
  console.log('## channel: ', channel);
  if (!channel) return <LoadingScreen/>;
  return (
    <ChannelProvider channelUrl={channel?.url}>
      <CustomChannelUI {...props} botUser={botUser} />
    </ChannelProvider>
  )
}
