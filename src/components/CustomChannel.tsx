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
import ChatBottom from "./ChatBottom";
import CustomChannelHeader from "./CustomChannelHeader";
import styled from "styled-components";
import {ChannelProvider, useChannelContext} from "@sendbird/uikit-react/Channel/context";
import {ClientUserMessage} from "SendbirdUIKitGlobal";
import {SuggestedReply, USER_ID} from "../const";
import {MessageType, SendingStatus, UserMessage} from "@sendbird/chat/message";
import {scrollUtil} from "../utils";
import BotMessageWithBodyInput from "./BotMessageWithBodyInput";
import SuggestedReplyMessageBody from "./SuggestedReplyMessageBody";
import {useSendLocalMessage} from "../hooks/useSendLocalMessage";
import CustomMessageInput from "./CustomMessageInput";
import PendingMessage from "./PendingMessage";

const Root = styled.div`
  height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

type CustomChannelUIProps = {
  botUser: User;
  createGroupChannel: () => void;
}

function CustomChannelUI(props: CustomChannelUIProps) {
  const { botUser, createGroupChannel } = props;
  const store = useSendbirdStateContext();
  // const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;
  const { allMessages, currentGroupChannel } = useChannelContext();
  const firstMessage: UserMessage = allMessages[0] as UserMessage;

  const channel: GroupChannel | undefined = currentGroupChannel;
  const lastMessage: ClientUserMessage = allMessages?.[allMessages?.length - 1] as ClientUserMessage;
  // console.log('#### allMessages: ', allMessages);
  const [activeSpinnerId, setActiveSpinnerId] = useState(-1);
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
        return <CustomChannelHeader channel={channel} isTyping={activeSpinnerId > -1} createGroupChannel={createGroupChannel}/>;
      }}
      renderMessageInput={() => {
        return <div>
          {
            allMessages
            && allMessages.length > 2
            && lastMessage.sender.userId === botUser.userId
            && <SuggestedRepliesPanel botUser={botUser}/>
          }
          <CustomMessageInput/>
          <ChatBottom/>
        </div>
      }}
      renderMessage={({ message }) => {
        return <CustomMessage
          message={message}
          activeSpinnerId={activeSpinnerId}
          botUser={botUser}
          firstMessageId={firstMessage?.messageId ?? -1}
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
  const [channel, createGroupChannel]: [GroupChannel | null, () => void] = useCreateGroupChannel(sb.currentUser, botUser);

  // console.log('## currentUser: ', sb.currentUser);
  // console.log('## botUser: ', botUser);
  // console.log('## channel: ', channel);
  if (!channel) return <LoadingScreen/>;
  return (
    <ChannelProvider channelUrl={channel?.url}>
      <CustomChannelUI {...props} botUser={botUser} createGroupChannel={createGroupChannel} />
    </ChannelProvider>
  )
}
