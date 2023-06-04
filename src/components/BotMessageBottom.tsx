import styled from "styled-components";
import ChatGptIcon from '../icons/chat-gpt-icon.svg';
import InfoIcon from '../icons/info-icon.svg';

const Text = styled.div`
  color: rgba(0, 0, 0, 0.5);
`;

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
`;

const Wrapper = styled.div`
  display: flex;
`;

export interface Source {
  title: string;
  link: string;
}

export default function BotMessageBottom() {
  return <Root>
    <Wrapper>
      <ChatGptIcon/>
      <Text>From Chat GPT</Text>
    </Wrapper>
    <InfoIcon/>
  </Root>
}