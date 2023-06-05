import Channel from '@sendbird/uikit-react/Channel';
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
import {useChannelContext} from "@sendbird/uikit-react/Channel/context";
import {ClientUserMessage} from "SendbirdUIKitGlobal";
import {SuggestedReply, USER_ID} from "../const";
import {MessageType, SendingStatus, UserMessage} from "@sendbird/chat/message";
import {scrollUtil} from "../utils";
import BotMessageWithBodyInput from "./BotMessageWithBodyInput";
import SuggestedReplyMessageBody from "./SuggestedReplyMessageBody";

const Root = styled.div`
  height: 100vh;
  font-family: "Roboto", sans-serif;
`;

type Props = {
  hashedKey: string;
}

export default function CustomChannel(props: Props) {
  const { hashedKey } = props;
  const store = useSendbirdStateContext();
  const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;
  const botUser: User = useGetBotUser(sb.currentUser, hashedKey);
  const channel: GroupChannel | null = useCreateGroupChannel(sb.currentUser, botUser);
  // const channelContext = useChannelContext();
  // console.log('## channelContext: ', channelContext); // this is undefined
  // const lastMessage: ClientUserMessage = channelContext.allMessages?.[channelContext.allMessages?.length - 1] as ClientUserMessage;

  const [activeSpinnerId, setActiveSpinnerId] = useState(-1);
  // TODO: when count is 10, show suggested replies.
  const [totalReceivedMessagesCount, setTotalReceivedMessagesCount] = useState(0);

  console.log('## currentUser: ', sb.currentUser);
  console.log('## botUser: ', botUser);
  console.log('## channel: ', channel);

  /**
   * If the updated last message is sent by the current user, activate spinner for the sent message.
   * If the updated last message is pending or failed by the current user or sent by the bot, deactivate spinner.
   */
  // useEffect(() => {
  //   if(lastMessage
  //     && lastMessage.sender?.userId === USER_ID
  //     && lastMessage.sendingStatus === SendingStatus.SUCCEEDED
  //   ) {
  //     setActiveSpinnerId(lastMessage.messageId);
  //     scrollUtil();
  //   } else {
  //     setActiveSpinnerId(-1);
  //   }
  // }, [lastMessage?.messageId]);

  function addSuggestedReplyMessageToView(suggestedReply: SuggestedReply): void {
    // TODO:
    // 1. Create a sent suggested reply user message and then add it to the message list.
    const createdAt: number = Date.now();
    const newMessage: UserMessage = sb.message.buildMessageFromSerializedData({
      channelUrl: channel?.url,
      channelType: ChannelType.GROUP,
      createdAt, // FIXME: ms? or seconds? sorted by this or id?
      sender: botUser.serialize(),
      sendingStatus: SendingStatus.SUCCEEDED,
      messageType: MessageType.USER,
      message: suggestedReply.text,
    }) as UserMessage;
    // 2. Then create a suggested reply message component and then add it to the view.
    const newMessageComponent = <BotMessageWithBodyInput
      bodyComponent={<SuggestedReplyMessageBody suggestedReply={suggestedReply}/>}
      createdAt={createdAt}
      senderName={botUser.nickname}
    />;
  }

  if (!channel) return <LoadingScreen/>;
  return <Root>
    <Channel
      channelUrl={channel.url}
      renderChannelHeader={() => {
        return <CustomHeader channel={channel} isTyping={activeSpinnerId > -1}/>;
      }}
      renderMessageInput={() => {
        return <div>
          <SuggestedRepliesPanel addSuggestedReplyMessageToView={addSuggestedReplyMessageToView}/>
          <MessageInput
            renderVoiceMessageIcon={() => <></>}
            renderFileUploadIcon={() => <></>}
            renderSendMessageIcon={() => <></>}
          />
          <BottomTextContainer/>
        </div>
      }}
      renderMessage={(message) => {
        // TODO: Custom message for bot message should parse bot message body and should be BotMessageWithBodyInput.
        return <CustomMessage
          message={message}
          activeSpinnerId={activeSpinnerId}
        />
      }}
      renderTypingIndicator={() => <></>}
    />
  </Root>;
}