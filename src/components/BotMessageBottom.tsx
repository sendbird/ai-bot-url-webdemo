import styled from "styled-components";
import { ReactComponent as ChatGptIcon } from '../icons/chat-gpt-icon.svg';
import { ReactComponent as InfoIcon } from '../icons/info-icon.svg';

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