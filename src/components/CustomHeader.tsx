import styled from "styled-components";
import RefreshIcon from '../icons/refresh-icon.svg';
import {GroupChannel} from "@sendbird/chat/groupChannel";
import ChannelHeaderImage from '../icons/channel-header-image.svg';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'SF Pro Text';
  font-style: normal;
  height: 100px;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.2px;
  color: rgba(0, 0, 0, 0.88);
`;

const TypingIndicator = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.38);
`;

type Props = {
  channel: GroupChannel;
  isTyping: boolean;
}

export default function CustomHeader(props: Props) {
  const { channel, isTyping } = props;

  return <Root>
    <SubContainer>
      <ChannelHeaderImage/>
      <div>
        <Title>{channel.name}</Title>
        <TypingIndicator>{ isTyping ? 'Thinking...' : 'AI Chatbot' }</TypingIndicator>
      </div>
    </SubContainer>
    <RefreshIcon/>
  </Root>;
}