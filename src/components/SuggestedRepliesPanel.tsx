import {useState} from 'react';
import '../css/suggested-replies-panel.css';
import {GroupChannel} from '@sendbird/chat/groupChannel';
import sendBirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import { useChannelContext } from "@sendbird/uikit-react/Channel/context";
import styled  from 'styled-components'
import {SUGGESTED_REPLIES, SuggestedReply} from "../const";

interface SuggestedReplyItemProps {
  isActive: boolean;
}
const SuggestedReplyItem = styled.div<SuggestedReplyItemProps>`
  white-space: nowrap;
  height: calc(100% - 2px);
  padding: 0 14px;
  display: flex;
  align-items: center;
  color: ${(props: SuggestedReplyItemProps) => (props.isActive ? '#6C32D5' : '#EEEEEE')};
  border: ${(props: SuggestedReplyItemProps) => (props.isActive ? '1px solid #6C32D5' : '1px solid #EEEEEE')};
  border-radius: 24px;
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

interface SuggestedRepliesPanelProps {
  isMessageSendDisabled: boolean;
}

const SuggestedRepliesPanel = (props: SuggestedRepliesPanelProps) => {
  const {
    isMessageSendDisabled
  } = props;
  const [suggestedReplies, setSuggestedReplies] = useState<SuggestedReply[]>(SUGGESTED_REPLIES);

  const store = useSendbirdStateContext();
  const sendUserMessage = sendBirdSelectors.getSendUserMessage(store);
  const sendFileMessage = sendBirdSelectors.getSendFileMessage(store);
  const channelStore = useChannelContext();
  const channel: GroupChannel | undefined = channelStore?.currentGroupChannel;

  const onClickSuggestedReply = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const item: HTMLDivElement = event.currentTarget;
    const indexToRemove = Number(item.id);
    const oldSuggestedReplies: SuggestedReply[] = [...suggestedReplies];
    const copied: SuggestedReply[] = [...oldSuggestedReplies];
    const removedReply: SuggestedReply = copied.splice(indexToRemove, 1)[0];
    addSuggestedReplyMessageToView(removedReply);
    setSuggestedReplies(copied);
  };

  const getSuggestedReplyMessageBody = (suggestedReply: SuggestedReply) => {

  }

  return suggestedReplies && suggestedReplies.length > 0
    ? <div className="suggested-replies-container">
      <div className="suggested-replies-panel">
        {
          suggestedReplies.map((suggestedReply: SuggestedReply, i: number) => {
            return <SuggestedReplyItem
              id={i + ''}
              key={i}
              onClick={!isMessageSendDisabled ? onClickSuggestedReply : undefined}
              isActive={!isMessageSendDisabled}
            >{
              suggestedReply.title
            }</SuggestedReplyItem>
          })
        }
      </div>
    </div>
    : null;
}

export default SuggestedRepliesPanel;