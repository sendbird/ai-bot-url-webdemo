import {User} from "@sendbird/chat";
import {useChannelContext} from "@sendbird/uikit-react/Channel/context";
import {SendingStatus} from "@sendbird/chat/message";
import {GroupChannel} from "@sendbird/chat/groupChannel";
import {ClientUserMessage} from "SendbirdUIKitGlobal";
import {useEffect, useState} from "react";
import {USER_ID} from "../const";
import {scrollUtil} from "../utils";
import LoadingScreen from "./LoadingScreen";
import ChannelUI from "@sendbird/uikit-react/Channel/components/ChannelUI";
import CustomChannelHeader from "./CustomChannelHeader";
import SuggestedRepliesPanel from "./SuggestedRepliesPanel";
import CustomMessageInput from "./CustomMessageInput";
import ChatBottom from "./ChatBottom";
import CustomMessage from "./CustomMessage";
import styled from "styled-components";
import {StartingPage} from "./StartingPage";

const Root = styled.div`
  height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

type CustomChannelComponentProps = {
  botUser: User;
  createGroupChannel: () => void;
}

export function CustomChannelComponent(props: CustomChannelComponentProps) {
  const {botUser, createGroupChannel} = props;
  // const store = useSendbirdStateContext();
  // const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;
  const {allMessages, currentGroupChannel} = useChannelContext();
  const channel: GroupChannel | undefined = currentGroupChannel;
  const lastMessage: ClientUserMessage = allMessages?.[allMessages?.length - 1] as ClientUserMessage;
  // console.log('#### allMessages: ', allMessages);
  const [activeSpinnerId, setActiveSpinnerId] = useState(-1);
  /**
   * If the updated last message is sent by the current user, activate spinner for the sent message.
   * If the updated last message is pending or failed by the current user or sent by the bot, deactivate spinner.
   */
  useEffect(() => {
    if (lastMessage
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
    <StartingPage isStartingPage={allMessages.length === 1}/>
    <ChannelUI
      renderChannelHeader={() => {
        return <CustomChannelHeader channel={channel} isTyping={activeSpinnerId > -1}
                                    createGroupChannel={createGroupChannel}/>;
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
      renderMessage={({message}) => {
        return <CustomMessage
          message={message}
          activeSpinnerId={activeSpinnerId}
          botUser={botUser}
        />
      }}
      renderTypingIndicator={() => <></>}
    />
  </Root>;
}