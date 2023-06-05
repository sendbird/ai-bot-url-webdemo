import styled from "styled-components";
import { ReactComponent as InfoIcon } from '../icons/info-icon.svg';

const Text = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

const TheRealRoot = styled.div`
  position: relative;
  width: 100%;
`;

const Root = styled.div`
  //border-radius: 0 0 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 0;
`;

const Delimiter = styled.div`
  position: absolute;
  width: calc(100% + 24px);
  transform: translateX(-12px);
  border-top: 1px solid rgba(0, 0, 0, 0.12);
`;

const Wrapper = styled.div`
  display: flex;
`;

export interface Source {
  title: string;
  link: string;
}

export default function BotMessageBottom() {
  return <TheRealRoot>
    <Delimiter/>
    <Root>
      <Wrapper>
        <Text>AI-generated answer</Text>
      </Wrapper>
      <InfoIcon height={'28px'} width={'28px'}/>
    </Root>
  </TheRealRoot>
}