import {useState} from 'react';
import styled  from 'styled-components'
import {SUGGESTED_REPLIES, SuggestedReply} from "../const";

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

interface SuggestedRepliesPanelProps {
  addSuggestedReplyMessageToView: (suggestedReply: SuggestedReply) => void;
}

const SuggestedRepliesPanel = (props: SuggestedRepliesPanelProps) => {
  const {
    addSuggestedReplyMessageToView
  } = props;
  const [suggestedReplies, setSuggestedReplies] = useState<SuggestedReply[]>(SUGGESTED_REPLIES);

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