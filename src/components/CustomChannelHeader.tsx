import styled from "styled-components";
import { ReactComponent as RefreshIcon } from '../icons/refresh-icon.svg';
import {GroupChannel} from "@sendbird/chat/groupChannel";
import channelHeaderImage from '../icons/bot-message-image.png';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-style: normal;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding: 16px 24px;
`;

const SubContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.2px;
  color: rgba(0, 0, 0, 0.88);
  margin-bottom: 4px;
`;

const TypingIndicator = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.38);
`;

const RenewButton = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: 14px;
  line-height: 12px;
  color: #6210CC;
  cursor: pointer;
`;

type Props = {
  channel: GroupChannel;
  isTyping: boolean;
  createGroupChannel: () => void;
}

export default function CustomChannelHeader(props: Props) {
  const { channel, isTyping, createGroupChannel } = props;

  function onClickRenewButton() {
    createGroupChannel();
  }

  return <Root>
    <SubContainer>
      <img src={channelHeaderImage} alt="channelHeaderImage" style={{
        height: "36px"
      }}/>
      <div>
        <Title>{channel.name}</Title>
        <TypingIndicator>{ isTyping ? 'Thinking...' : 'AI Chatbot' }</TypingIndicator>
      </div>
    </SubContainer>
    <RenewButton onClick={onClickRenewButton}>
      <div>Renew</div>
      <RefreshIcon height='18px' width='18px'/>
    </RenewButton>
  </Root>;
}