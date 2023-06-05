import {useEffect, useState} from 'react';
import styled  from 'styled-components'
import {LOCAL_MESSAGE_CUSTOM_TYPE, SUGGESTED_REPLIES, SuggestedReply} from "../const";
import {MessageType, SendingStatus, UserMessage} from "@sendbird/chat/message";
import {ChannelType, User} from "@sendbird/chat";
import {useSendLocalMessage} from "../hooks/useSendLocalMessage";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import {GroupChannel, SendbirdGroupChat} from "@sendbird/chat/groupChannel";
import {useChannelContext} from "@sendbird/uikit-react/Channel/context";

interface SuggestedReplyItemProps {
  isActive: boolean;
}
const SuggestedReplyItem = styled.div<SuggestedReplyItemProps>`
  white-space: nowrap;
  height: calc(100% - 8px);
  padding: 3px 14px;
  display: flex;
  align-items: center;
  color: ${(props: SuggestedReplyItemProps) => (props.isActive ? '#6C32D5' : '#EEEEEE')};
  border: ${(props: SuggestedReplyItemProps) => (props.isActive ? '1px solid #6C32D5' : '1px solid #EEEEEE')};
  border-radius: 18px;
  background-color: #FFFFFF;
  cursor: ${(props: SuggestedReplyItemProps) => (props.isActive ? 'pointer' : 'not-allowed')};
  &:hover {
    ${(props: SuggestedReplyItemProps) => {
      if (props.isActive) {
        return 'background-color: #E6E0FF;';
      }
    }};
  }
  &:active {
    ${(props: SuggestedReplyItemProps) => {
      if (props.isActive) {
        return 'background-color: #6C32D5; color: #FFFFFF;';
      }
    }};
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 2px 24px 12px;
  font-size: 15px;
`;

const Panel = styled.div`
  z-index: 5;
  display: flex;
  height: 37px;
  width: calc(100% - 48px);
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 8px;
  margin-top: 8px;
`;

interface Props {
  botUser: User;
}

const SuggestedRepliesPanel = (props: Props) => {

  const { botUser } = props;
  const [suggestedReplies, setSuggestedReplies] = useState<SuggestedReply[]>(SUGGESTED_REPLIES);
  const store = useSendbirdStateContext();
  const sb: SendbirdGroupChat = store.stores.sdkStore.sdk as SendbirdGroupChat;
  const { currentGroupChannel } = useChannelContext();
  const channel: GroupChannel | undefined = currentGroupChannel;
  const sendLocalMessage = useSendLocalMessage();

  useEffect(() => {
    setSuggestedReplies(SUGGESTED_REPLIES);
  }, [channel]);

  const onClickSuggestedReply = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const item: HTMLDivElement = event.currentTarget;
    const indexToRemove = Number(item.id);
    const oldSuggestedReplies: SuggestedReply[] = [...suggestedReplies];
    const copied: SuggestedReply[] = [...oldSuggestedReplies];
    const removedReply: SuggestedReply = copied.splice(indexToRemove, 1)[0];

    // TODO:
    // 1. Create a sent suggested reply user message and then add it to the message list.
    const createdAt: number = Date.now();
    const localMessage: UserMessage = sb.message.buildMessageFromSerializedData({
      messageId: createdAt,
      channelUrl: channel?.url,
      channelType: ChannelType.GROUP,
      createdAt, // FIXME: ms? or seconds? sorted by this or id?
      sender: botUser.serialize(),
      sendingStatus: SendingStatus.SUCCEEDED,
      messageType: MessageType.USER,
      message: removedReply.text,
      customType: LOCAL_MESSAGE_CUSTOM_TYPE.linkSuggestion,
      reactions: [],
      plugins: [],
      data: JSON.stringify(removedReply),
    }) as UserMessage;

    sendLocalMessage(localMessage);
    setSuggestedReplies(copied);
  };

  return suggestedReplies && suggestedReplies.length > 0
    ? <Root>
      <Panel>
        {
          suggestedReplies.map((suggestedReply: SuggestedReply, i: number) => {
            return <SuggestedReplyItem
              id={i + ''}
              key={i}
              onClick={onClickSuggestedReply}
              isActive={true}
            >{
              suggestedReply.title
            }</SuggestedReplyItem>
          })
        }
      </Panel>
    </Root>
    : null;
}

export default SuggestedRepliesPanel;